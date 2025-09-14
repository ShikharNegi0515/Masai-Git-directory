const express = require("express");
const { createCourse, deleteCourse, getCourseStudents } = require("../controllers/course.controller");

const router = express.Router();

router.post("/", createCourse);
router.delete("/:id", deleteCourse);
router.get("/:id/students", getCourseStudents);

module.exports = router;
