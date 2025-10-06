import Board from "../models/Board.js";
import Task from "../models/Task.js";

// Create a new task under a specific column
export const createTask = async (req, res) => {
    const { boardId, columnId, title, description, assignedTo, dueDate } = req.body;

    try {
        const board = await Board.findById(boardId);
        if (!board) return res.status(404).json({ message: "Board not found" });

        if (!board.members.includes(assignedTo)) {
            return res.status(400).json({ message: "User is not a member of the board" });
        }

        const task = await Task.create({
            title,
            description,
            assignedTo,
            dueDate,
            createdBy: req.user._id,
        });

        // Add task to column
        const column = board.columns.id(columnId);
        if (!column) return res.status(404).json({ message: "Column not found" });

        column.tasks.push(task._id);
        await board.save();

        res.status(201).json({ message: "Task created successfully", task });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update a task's details
export const updateTask = async (req, res) => {
    const { taskId } = req.params;
    const { title, description, assignedTo, dueDate } = req.body;

    try {
        const task = await Task.findById(taskId);
        if (!task) return res.status(404).json({ message: "Task not found" });

        if (assignedTo) task.assignedTo = assignedTo;
        if (title) task.title = title;
        if (description) task.description = description;
        if (dueDate) task.dueDate = dueDate;

        await task.save();
        res.json({ message: "Task updated successfully", task });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const moveTask = async (req, res) => {
    const { boardId, taskId, fromColumnId, toColumnId } = req.body;

    try {
        const board = await Board.findById(boardId);
        if (!board) return res.status(404).json({ message: "Board not found" });

        const fromColumn = board.columns.id(fromColumnId);
        const toColumn = board.columns.id(toColumnId);

        if (!fromColumn || !toColumn)
            return res.status(404).json({ message: "Column not found" });

        fromColumn.tasks.pull(taskId);
        toColumn.tasks.push(taskId);

        await board.save();
        res.json({ message: "Task moved successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete a task
export const deleteTask = async (req, res) => {
    const { boardId, columnId, taskId } = req.body;

    try {
        const board = await Board.findById(boardId);
        if (!board) return res.status(404).json({ message: "Board not found" });

        const column = board.columns.id(columnId);
        if (!column) return res.status(404).json({ message: "Column not found" });

        column.tasks.pull(taskId);
        await board.save();

        await Task.findByIdAndDelete(taskId);
        res.json({ message: "Task deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get all tasks for a column
export const getTasksByColumn = async (req, res) => {
    const { boardId, columnId } = req.params;

    try {
        const board = await Board.findById(boardId).populate({
            path: "columns.tasks",
            populate: { path: "assignedTo createdBy", select: "username email" },
        });
        if (!board) return res.status(404).json({ message: "Board not found" });

        const column = board.columns.id(columnId);
        if (!column) return res.status(404).json({ message: "Column not found" });

        res.json({ tasks: column.tasks });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
