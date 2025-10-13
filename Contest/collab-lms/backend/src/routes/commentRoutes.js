import express from "express";
import {
    addComment,
    getCommentsByLesson,
    deleteComment,
} from "../controllers/commentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router({ mergeParams: true });

router.post("/:lessonId", protect, addComment);

router.get("/:lessonId", protect, getCommentsByLesson);

router.delete("/:commentId", protect, deleteComment);

export default router;
