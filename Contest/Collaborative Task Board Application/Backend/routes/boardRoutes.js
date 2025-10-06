import express from "express";
import { createBoard, inviteMember, getBoards, deleteBoard } from "../controller/boardController.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post("/", protect, adminOnly, createBoard);
router.post("/:boardId/invite", protect, adminOnly, inviteMember);
router.get("/", protect, getBoards);
router.delete("/:boardId", protect, adminOnly, deleteBoard);

export default router;
