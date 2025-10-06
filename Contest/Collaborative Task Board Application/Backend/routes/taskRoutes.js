import express from "express";
import {
    createTask,
    updateTask,
    deleteTask,
    moveTask,
    getTasksByColumn
} from "../controller/taskcontroller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a task
router.post("/", protect, createTask);

// Update task details
router.patch("/:taskId", protect, updateTask);

// Delete a task
router.delete("/", protect, deleteTask);

// Move task between columns
router.patch("/move", protect, moveTask);

// Get all tasks for a column
router.get("/:boardId/:columnId", protect, getTasksByColumn);

export default router;
