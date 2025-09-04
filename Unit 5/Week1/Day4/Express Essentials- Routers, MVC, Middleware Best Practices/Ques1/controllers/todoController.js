const { readData, writeData } = require("../models/todoModel");

// GET all todos
const getTodos = (req, res) => {
    try {
        const data = readData();
        res.status(200).json(data.todos);
    } catch {
        res.status(500).json({ error: "Failed to fetch todos" });
    }
};

// POST add new todo
const addTodo = (req, res) => {
    try {
        const { title, completed = false } = req.body;
        if (!title) return res.status(400).json({ error: "Title is required" });

        const data = readData();
        const newTodo = {
            id: data.todos.length ? data.todos[data.todos.length - 1].id + 1 : 1,
            title,
            completed,
        };

        data.todos.push(newTodo);
        writeData(data);

        res.status(201).json(newTodo);
    } catch {
        res.status(500).json({ error: "Failed to add todo" });
    }
};

// GET search todos by title (partial match)
const searchTodos = (req, res) => {
    try {
        const { q } = req.query;
        if (!q) return res.status(400).json({ error: "Query parameter q is required" });

        const data = readData();
        const results = data.todos.filter((todo) =>
            todo.title.toLowerCase().includes(q.toLowerCase())
        );

        if (!results.length) return res.status(404).json({ message: "No todos found" });

        res.status(200).json(results);
    } catch {
        res.status(500).json({ error: "Search failed" });
    }
};

// PUT update todo by ID
const updateTodo = (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { title, completed } = req.body;

        const data = readData();
        const index = data.todos.findIndex((todo) => todo.id === id);

        if (index === -1) return res.status(404).json({ error: "Todo not found" });

        data.todos[index] = {
            ...data.todos[index],
            title: title || data.todos[index].title,
            completed: completed !== undefined ? completed : data.todos[index].completed,
        };

        writeData(data);
        res.status(200).json(data.todos[index]);
    } catch {
        res.status(500).json({ error: "Failed to update todo" });
    }
};

// DELETE todo by ID
const deleteTodo = (req, res) => {
    try {
        const id = parseInt(req.params.id);

        const data = readData();
        const newTodos = data.todos.filter((todo) => todo.id !== id);

        if (newTodos.length === data.todos.length) {
            return res.status(404).json({ error: "Todo not found" });
        }

        data.todos = newTodos;
        writeData(data);

        res.status(200).json({ message: "Todo deleted successfully" });
    } catch {
        res.status(500).json({ error: "Failed to delete todo" });
    }
};

module.exports = { getTodos, addTodo, searchTodos, updateTodo, deleteTodo };
