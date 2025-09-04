const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

const dbPath = path.join(__dirname, "tasks.json");

app.use(express.json());

function readDB() {
    if (!fs.existsSync(dbPath)) {
        fs.writeFileSync(dbPath, JSON.stringify({ tasks: [] }, null, 2));
    }
    return JSON.parse(fs.readFileSync(dbPath, "utf-8"));
}

function writeDB(data) {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), "utf-8");
}

// GET /tasks → get all tasks
app.get("/tasks", (req, res) => {
    const db = readDB();
    res.json(db.tasks);
});

// GET /tasks/filter?tag=frontend → filter by tag
app.get("/tasks/filter", (req, res) => {
    const tag = req.query.tag;
    const db = readDB();
    const filtered = db.tasks.filter(t => t.tag === tag);
    res.json(filtered);
});

// POST /tasks → add task
app.post("/tasks", (req, res) => {
    const { title, description, tag, priority, status } = req.body;
    if (!title || !description || !tag || !priority || !status) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const db = readDB();
    const id = db.tasks.length ? db.tasks[db.tasks.length - 1].id + 1 : 1;

    const newTask = { id, title, description, tag, priority, status };
    db.tasks.push(newTask);
    writeDB(db);

    res.status(201).json(newTask);
});

// PUT /tasks/:id → update task
app.put("/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { title, description, tag, priority, status } = req.body;

    const db = readDB();
    const idx = db.tasks.findIndex(t => t.id === id);
    if (idx === -1) return res.status(404).json({ error: "Task not found" });

    db.tasks[idx] = {
        ...db.tasks[idx],
        title: title ?? db.tasks[idx].title,
        description: description ?? db.tasks[idx].description,
        tag: tag ?? db.tasks[idx].tag,
        priority: priority ?? db.tasks[idx].priority,
        status: status ?? db.tasks[idx].status
    };

    writeDB(db);
    res.json(db.tasks[idx]);
});

// DELETE /tasks/:id → delete task
app.delete("/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const db = readDB();
    const before = db.tasks.length;
    db.tasks = db.tasks.filter(t => t.id !== id);

    if (db.tasks.length === before)
        return res.status(404).json({ error: "Task not found" });

    writeDB(db);
    res.json({ message: "Task deleted" });
});

app.use((req, res) => {
    res.status(404).json({ error: "404 Not Found" });
});

app.listen(PORT, () =>
    console.log(`✅ Task Tracker API running at http://localhost:${PORT}`)
);
