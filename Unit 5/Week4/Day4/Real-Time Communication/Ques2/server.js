// server.js
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cron = require("node-cron");

// Optional imports for Redis & Mongo (comment/uncomment if you want to use)
const Redis = require("ioredis");
const { MongoClient } = require("mongodb");

// --------- CONFIG ----------
const PORT = process.env.PORT || 3000;
const USE_REDIS = false;   // set true if you configure redis
const USE_MONGO = false;   // set true if you configure mongo
const REDIS_URL = process.env.REDIS_URL || "redis://127.0.0.1:6379";
const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017";
const MONGO_DB = "chat_app";
const CHAT_COLLECTION = "messages";
const REDIS_CHAT_KEY = "chat:recent";
// Admin username (simple approach)
const ADMIN_NAME = "admin";

// --------- IN-MEMORY STORAGE ----------
let messages = []; // each: {id, username, text, time, room}
let onlineUsers = {}; // socketId -> {username, room, isAdmin}
let userCountByName = {}; // name -> count (to persist duplicates)

// --------- OPTIONAL REDIS/MONGO SETUP ----------
let redisClient = null;
let mongoClient = null;
let mongoCollection = null;

if (USE_REDIS) {
    redisClient = new Redis(REDIS_URL);
    redisClient.on("error", (e) => console.error("Redis error:", e));
}
if (USE_MONGO) {
    mongoClient = new MongoClient(MONGO_URL);
    mongoClient.connect()
        .then(() => {
            const db = mongoClient.db(MONGO_DB);
            mongoCollection = db.collection(CHAT_COLLECTION);
            console.log("Mongo connected");
        })
        .catch(err => console.error("Mongo connect error:", err));
}

// --------- APP & SOCKET SETUP ----------
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static frontend
app.use(express.static("public"));

// Helper to persist to redis (if enabled)
async function pushToRedis(message) {
    if (!redisClient) return;
    try {
        await redisClient.lpush(REDIS_CHAT_KEY, JSON.stringify(message));
        // keep only last 200 messages
        await redisClient.ltrim(REDIS_CHAT_KEY, 0, 199);
    } catch (e) {
        console.error("Redis push error:", e);
    }
}

// Helper to backup from redis to mongo periodically
async function backupRedisToMongo() {
    if (!redisClient || !mongoCollection) return;
    try {
        const items = await redisClient.lrange(REDIS_CHAT_KEY, 0, -1);
        if (items.length === 0) return;
        const docs = items.map(it => JSON.parse(it));
        // Insert many (could also upsert or dedupe)
        await mongoCollection.insertMany(docs);
        console.log(`Backed up ${docs.length} messages to MongoDB`);
        // Optionally clear redis after backup
        // await redisClient.del(REDIS_CHAT_KEY);
    } catch (e) {
        console.error("Backup error:", e);
    }
}

// Schedule cron job to backup every 5 minutes (adjust as needed)
cron.schedule("*/5 * * * *", () => {
    console.log("Running backup cron job...");
    backupRedisToMongo().catch(console.error);
});

// On socket connection
io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    // Register user
    socket.on("register", async ({ username, room }) => {
        if (!username || username.trim().length === 0) {
            socket.emit("registrationError", "Invalid username");
            return;
        }
        username = username.trim();

        // Simple rule: only registered users can join; admin recognized by name
        const isAdmin = username.toLowerCase() === ADMIN_NAME.toLowerCase();

        // Track online
        onlineUsers[socket.id] = { username, room: room || "main", isAdmin };

        // increment name count
        userCountByName[username] = (userCountByName[username] || 0) + 1;

        socket.join(onlineUsers[socket.id].room);

        // Send ack + recent chat history
        // If Redis is enabled, fetch recent from redis otherwise from memory
        let recent = [];
        if (redisClient) {
            const items = await redisClient.lrange(REDIS_CHAT_KEY, 0, 199);
            recent = items.reverse().map(it => JSON.parse(it));
        } else {
            // return last 200 messages filtered by room
            recent = messages.filter(m => m.room === (room || "main")).slice(-200);
        }

        socket.emit("registered", { username, isAdmin, recent });

        // notify everyone about user list update
        io.emit("onlineUsers", getPublicOnlineUsers());

        // broadcast join notice to room
        io.to(onlineUsers[socket.id].room).emit("systemMessage", {
            text: `${username} joined ${onlineUsers[socket.id].room}`,
            time: Date.now()
        });
    });

    // Receive chat message
    socket.on("sendMessage", async (payload) => {
        // payload: { text, room }
        const meta = onlineUsers[socket.id];
        if (!meta) {
            socket.emit("errorMessage", "You are not registered");
            return;
        }

        const room = payload.room || meta.room || "main";
        const msg = {
            id: generateId(),
            username: meta.username,
            text: String(payload.text || ""),
            time: Date.now(),
            room
        };
        // store in memory
        messages.push(msg);
        // push to redis if enabled
        if (redisClient) await pushToRedis(msg);

        // broadcast to room
        io.to(room).emit("newMessage", msg);
    });

    // Admin broadcast (announcement)
    socket.on("adminBroadcast", async ({ text }) => {
        const meta = onlineUsers[socket.id];
        if (!meta || !meta.isAdmin) {
            socket.emit("errorMessage", "Not authorized as admin");
            return;
        }
        const msg = {
            id: generateId(),
            username: meta.username,
            text: `[ADMIN] ${text}`,
            time: Date.now(),
            room: "main",
            admin: true
        };
        messages.push(msg);
        if (redisClient) await pushToRedis(msg);
        // broadcast to all sockets (global announcement)
        io.emit("adminAnnouncement", msg);
    });

    // Rooms: join another room
    socket.on("joinRoom", (roomName) => {
        const meta = onlineUsers[socket.id];
        if (!meta) {
            socket.emit("errorMessage", "Register first");
            return;
        }
        const prev = meta.room;
        socket.leave(prev);
        meta.room = roomName || "main";
        socket.join(meta.room);

        socket.emit("systemMessage", { text: `You joined ${meta.room}`, time: Date.now() });
        io.emit("onlineUsers", getPublicOnlineUsers());
    });

    // manual disconnect request
    socket.on("manualDisconnect", () => {
        socket.disconnect(true);
    });

    // handle disconnect
    socket.on("disconnect", (reason) => {
        const meta = onlineUsers[socket.id];
        if (meta) {
            // broadcast leave
            io.to(meta.room).emit("systemMessage", { text: `${meta.username} left`, time: Date.now() });
            userCountByName[meta.username] = Math.max(0, (userCountByName[meta.username] || 1) - 1);
            delete onlineUsers[socket.id];
            io.emit("onlineUsers", getPublicOnlineUsers());
        }
        console.log("Socket disconnected:", socket.id, "reason:", reason);
    });
});

// Utility helpers
function getPublicOnlineUsers() {
    // returns distinct list of users with counts & rooms (simple)
    const byName = {};
    Object.values(onlineUsers).forEach(u => {
        if (!byName[u.username]) byName[u.username] = { username: u.username, rooms: new Set(), count: 0, isAdmin: u.isAdmin };
        byName[u.username].rooms.add(u.room);
        byName[u.username].count++;
    });
    return Object.values(byName).map(u => ({ username: u.username, rooms: Array.from(u.rooms), count: u.count, isAdmin: u.isAdmin }));
}

function generateId() {
    return Math.random().toString(36).slice(2, 9);
}

// Start server
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
