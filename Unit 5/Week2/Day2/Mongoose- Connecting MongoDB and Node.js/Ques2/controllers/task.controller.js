const Task = require("../models/task.model");

const createTask = async (req, res) => {
    try {
        const task = new Task(req.body);
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getTasks = async (req, res) => {
    try {
        const { priority, isCompleted } = req.query;
        let filter = {};
        if (priority) filter.priority = priority;
        if (isCompleted) filter.isCompleted = isCompleted === "true";

        const tasks = await Task.find(filter);
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateTask = async (req, res) => {
    try {
        const updates = req.body;

        if (updates.isCompleted === true) {
            updates.completionDate = new Date();
        }

        const task = await Task.findByIdAndUpdate(req.params.id, updates, { new: true });

        if (!task) return res.status(404).json({ error: "Task not found" });
        res.json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteTasks = async (req, res) => {
    try {
        const { priority } = req.query;
        if (!priority) return res.status(400).json({ error: "Priority filter is required" });

        const result = await Task.deleteMany({ priority });
        res.json({ message: `${result.deletedCount} tasks deleted` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createTask, getTasks, updateTask, deleteTasks };
