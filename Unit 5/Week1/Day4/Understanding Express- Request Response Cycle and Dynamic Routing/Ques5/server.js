const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());

const dbPath = path.join(__dirname, "db.json");

// Helper: read db.json
const readData = () => {
    if (!fs.existsSync(dbPath)) {
        fs.writeFileSync(dbPath, JSON.stringify({ students: [] }, null, 2));
    }
    const data = fs.readFileSync(dbPath);
    return JSON.parse(data);
};

// Helper: write db.json
const writeData = (data) => {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

// ================= CRUD ROUTES =================

// POST /students → Add new student
app.post("/students", (req, res) => {
    try {
        const { name, course, batch } = req.body;
        if (!name || !course || !batch) {
            return res.status(400).json({ error: "All fields (name, course, batch) are required" });
        }

        const data = readData();
        const newStudent = {
            id: data.students.length ? data.students[data.students.length - 1].id + 1 : 1,
            name,
            course,
            batch,
        };

        data.students.push(newStudent);
        writeData(data);

        res.status(201).json(newStudent);
    } catch {
        res.status(500).json({ error: "Failed to add student" });
    }
});

// GET /students → Fetch all students
app.get("/students", (req, res) => {
    try {
        const data = readData();
        res.status(200).json(data.students);
    } catch {
        res.status(500).json({ error: "Failed to fetch students" });
    }
});

// GET /students/:id → Fetch student by ID
app.get("/students/:id", (req, res) => {
    try {
        const data = readData();
        const student = data.students.find((s) => s.id === parseInt(req.params.id));
        if (!student) return res.status(404).json({ error: "Student not found" });
        res.status(200).json(student);
    } catch {
        res.status(500).json({ error: "Failed to fetch student" });
    }
});

// PUT /students/:id → Update student
app.put("/students/:id", (req, res) => {
    try {
        const { name, course, batch } = req.body;
        const data = readData();
        const index = data.students.findIndex((s) => s.id === parseInt(req.params.id));

        if (index === -1) return res.status(404).json({ error: "Student not found" });

        data.students[index] = {
            ...data.students[index],
            name: name || data.students[index].name,
            course: course || data.students[index].course,
            batch: batch || data.students[index].batch,
        };

        writeData(data);
        res.status(200).json(data.students[index]);
    } catch {
        res.status(500).json({ error: "Failed to update student" });
    }
});

// DELETE /students/:id → Delete student
app.delete("/students/:id", (req, res) => {
    try {
        const data = readData();
        const newStudents = data.students.filter((s) => s.id !== parseInt(req.params.id));

        if (newStudents.length === data.students.length) {
            return res.status(404).json({ error: "Student not found" });
        }

        data.students = newStudents;
        writeData(data);
        res.status(200).json({ message: "Student deleted successfully" });
    } catch {
        res.status(500).json({ error: "Failed to delete student" });
    }
});

// GET /students/search?course=<course> → Filter students by course
app.get("/students/search", (req, res) => {
    try {
        const { course } = req.query;
        if (!course) return res.status(400).json({ error: "Course query parameter is required" });

        const data = readData();
        const results = data.students.filter((s) =>
            s.course.toLowerCase().includes(course.toLowerCase())
        );

        if (!results.length) return res.status(404).json({ message: "No students found" });

        res.status(200).json(results);
    } catch {
        res.status(500).json({ error: "Search failed" });
    }
});

app.use((req, res) => {
    res.status(404).json({ error: "404 Not Found" });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
