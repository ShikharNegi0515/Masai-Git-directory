const express = require("express");
const { createStudent, deleteStudent, getStudentCourses } = require("../controllers/student.controller");

const router = express.Router();

router.post("/", createStudent);
router.delete("/:id", deleteStudent);
router.get("/:id/courses", getStudentCourses);

module.exports = router;
