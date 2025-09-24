const express = require("express");
const Redis = require("ioredis");

const app = express();
const redis = new Redis();

app.use(express.json());

let items = [
    { id: 1, name: "Apple" },
    { id: 2, name: "Banana" }
];

const CACHE_KEY = "items:all";


app.get("/items", async (req, res) => {
    try {
        const cached = await redis.get(CACHE_KEY);
        if (cached) {
            console.log("🔵 Cache hit");
            return res.json(JSON.parse(cached));
        }

        console.log("🟢 Cache miss → fetching from DB");
        const data = items;

        await redis.set(CACHE_KEY, JSON.stringify(data), "EX", 60);

        res.json(data);
    } catch (err) {
        console.error("Error fetching items:", err);
        res.status(500).json({ message: "Server error" });
    }
});

app.post("/items", async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) return res.status(400).json({ message: "Name required" });

        const newItem = { id: items.length + 1, name };
        items.push(newItem);

        await redis.del(CACHE_KEY);
        console.log("🗑️ Cache invalidated after POST");

        res.status(201).json(newItem);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

app.put("/items/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const idx = items.findIndex(i => i.id == id);
        if (idx === -1) return res.status(404).json({ message: "Item not found" });

        items[idx].name = name || items[idx].name;

        await redis.del(CACHE_KEY);
        console.log("🗑️ Cache invalidated after PUT");

        res.json(items[idx]);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

app.delete("/items/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const idx = items.findIndex(i => i.id == id);
        if (idx === -1) return res.status(404).json({ message: "Item not found" });

        const deleted = items.splice(idx, 1);

        await redis.del(CACHE_KEY);
        console.log("🗑️ Cache invalidated after DELETE");

        res.json({ message: "Item deleted", deleted });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// ========== Start Server ==========
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
