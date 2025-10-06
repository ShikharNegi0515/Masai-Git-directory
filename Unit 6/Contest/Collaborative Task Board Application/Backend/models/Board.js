import mongoose from "mongoose";

const columnSchema = mongoose.Schema({
    name: { type: String, required: true },
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }]
});

const boardSchema = mongoose.Schema({
    title: { type: String, required: true },
    columns: [columnSchema],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
}, { timestamps: true });

export default mongoose.model("Board", boardSchema);
