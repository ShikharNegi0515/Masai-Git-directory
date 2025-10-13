import express from "express";
import {
    createLesson,
    getLessonsByCourse,
    markLessonComplete,
    deleteLesson,
} from "../controllers/lessonController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router({ mergeParams: true });

router.post("/", protect, authorizeRoles("Instructor"), createLesson);

router.get("/:courseId", protect, getLessonsByCourse);

router.post("/:lessonId/complete", protect, authorizeRoles("Student"), markLessonComplete);

router.delete("/:lessonId", protect, authorizeRoles("Instructor"), deleteLesson);

export default router;
