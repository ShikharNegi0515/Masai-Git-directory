import express from "express";
import {
    createCourse,
    getCourses,
    getCourseById,
    deleteCourse,
    enrollStudent,
} from "../controllers/courseController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/", protect, authorizeRoles("Instructor"), createCourse);

router.get("/", protect, getCourses);

router.get("/:id", protect, getCourseById);

router.delete("/:id", protect, authorizeRoles("Instructor"), deleteCourse);

router.post("/:id/enroll", protect, authorizeRoles("Student"), enrollStudent);

export default router;
