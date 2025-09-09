const express = require("express");
const router = express.Router();
const { validateTask } = require("../middleware/task.middleware");
const { createTask, getTasks, updateTask, deleteTasks } = require("../controllers/task.controller");

// Routes
router.post("/", validateTask, createTask);       
router.get("/", getTasks);                         
router.patch("/:id", validateTask, updateTask);    
router.delete("/", deleteTasks);                   

module.exports = router;
