import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        lesson: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Lesson",
            required: true,
        },
        message: {
            type: String,
            required: true,
            trim: true,
        },
        parentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment",
            default: null,
        },
        timestamp: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Comment", commentSchema);
