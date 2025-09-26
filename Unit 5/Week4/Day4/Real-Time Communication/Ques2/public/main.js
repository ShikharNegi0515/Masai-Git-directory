// public/main.js
const socket = io();

const loginDiv = document.getElementById("login");
const chatDiv = document.getElementById("chat");
const usernameInput = document.getElementById("username");
const roomInputLogin = document.getElementById("room");
const joinBtn = document.getElementById("join");
const meSpan = document.getElementById("me");
const messagesDiv = document.getElementById("messages");
const sendBtn = document.getElementById("sendBtn");
const msgInput = document.getElementById("msgInput");
const onlineList = document.getElementById("onlineList");
const disconnectBtn = document.getElementById("disconnectBtn");
const adminAnnBtn = document.getElementById("adminAnnBtn");
const joinRoomBtn = document.getElementById("joinRoomBtn");
const roomInput = document.getElementById("roomInput");

// Try to persist username in localStorage
const savedName = localStorage.getItem("chat_username");
if (savedName) usernameInput.value = savedName;

let myName = null;
let isAdmin = false;

// helpers to print
function printMessage(m) {
    const div = document.createElement("div");
    div.className = "msg";
    const time = new Date(m.time).toLocaleTimeString();
    if (m.admin) {
        div.innerHTML = `<span class="admin">[${time}] ${m.username}: ${m.text}</span>`;
    } else {
        div.innerHTML = `<strong>[${time}] ${m.username}:</strong> ${m.text}`;
    }
    messagesDiv.appendChild(div);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function printSystem(text) {
    const div = document.createElement("div");
    div.className = "system msg";
    div.textContent = text;
    messagesDiv.appendChild(div);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// Join event
joinBtn.addEventListener("click", () => {
    const username = usernameInput.value.trim();
    const room = roomInputLogin.value.trim();
    if (!username) return alert("Enter a username");
    localStorage.setItem("chat_username", username);
    socket.emit("register", { username, room });
});

// Registered ack
socket.on("registered", ({ username, isAdmin: ia, recent }) => {
    myName = username;
    isAdmin = ia;
    loginDiv.style.display = "none";
    chatDiv.style.display = "block";
    meSpan.textContent = username;
    if (isAdmin) adminAnnBtn.style.display = "inline-block";
    // show recent history
    messagesDiv.innerHTML = "";
    if (recent && recent.length) {
        recent.forEach(printMessage);
    }
    printSystem("Welcome to the chat!");
});

// online users update
socket.on("onlineUsers", (list) => {
    const strings = list.map(u => `${u.username}(${u.count})` + (u.isAdmin ? " [admin]" : "") + (u.rooms.length ? ` [${u.rooms.join(",")}]` : ""));
    onlineList.textContent = strings.join(", ");
});

// new message
socket.on("newMessage", (msg) => {
    printMessage(msg);
});

// admin announcement
socket.on("adminAnnouncement", (msg) => {
    printSystem(`[ADMIN ANNOUNCEMENT] ${msg.text}`);
    printMessage(msg);
});

// system messages
socket.on("systemMessage", (m) => {
    printSystem(m.text || JSON.stringify(m));
});

// errors
socket.on("registrationError", (err) => alert("Registration error: " + err));
socket.on("errorMessage", (err) => printSystem("Error: " + err));

// send message
sendBtn.addEventListener("click", () => {
    const text = msgInput.value.trim();
    const room = roomInput.value.trim();
    if (!text) return;
    socket.emit("sendMessage", { text, room });
    msgInput.value = "";
});

// admin announcement button
adminAnnBtn.addEventListener("click", () => {
    const text = prompt("Enter admin announcement:");
    if (!text) return;
    socket.emit("adminBroadcast", { text });
});

// manual disconnect
disconnectBtn.addEventListener("click", () => {
    socket.emit("manualDisconnect");
});

// Join room button
joinRoomBtn.addEventListener("click", () => {
    const r = roomInput.value.trim();
    if (!r) return alert("Enter room name");
    socket.emit("joinRoom", r);
    printSystem(`Requesting join to room: ${r}`);
});

// initial handlers (optional improvements)
socket.on("connect_error", (err) => {
    console.error("connect_error", err);
    printSystem("Connection error");
});
