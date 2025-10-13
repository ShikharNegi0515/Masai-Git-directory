import Comment from "../models/Comment.js";
import Lesson from "../models/Lesson.js";
import Activity from "../models/Activity.js";

export const addComment = async (req, res) => {
    try {
        const { message, parentId } = req.body;
        const { lessonId } = req.params;

        const comment = await Comment.create({
            user: req.user._id,
            lesson: lessonId,
            message,
            parentId: parentId || null,
            timestamp: new Date(),
        });

        await Activity.create({
            action: "New comment added",
            actor: req.user.name,
            timestamp: new Date(),
        });

        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.commentId).populate("lesson");
        if (!comment) return res.status(404).json({ message: "Comment not found" });

        const courseInstructor = comment.lesson.instructor?.toString();

        if (
            req.user._id.toString() !== comment.user.toString() &&
            req.user._id.toString() !== courseInstructor
        ) {
            return res.status(403).json({ message: "Not authorized" });
        }

        await comment.deleteOne();

        await Activity.create({
            action: "Comment deleted",
            actor: req.user.name,
            timestamp: new Date(),
        });

        res.json({ message: "Comment deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getComments = async (req, res) => {
    try {
        const comments = await Comment.find({ lesson: req.params.lessonId })
            .populate("user", "name role")
            .sort({ timestamp: 1 });

        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
