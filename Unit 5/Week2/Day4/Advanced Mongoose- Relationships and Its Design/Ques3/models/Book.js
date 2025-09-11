import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true, minlength: 3 },
    author: { type: String, required: true },
    status: { type: String, enum: ["available", "borrowed"], default: "available" },
    borrowers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Member" }],
    createdAt: { type: Date, default: Date.now }
});

bookSchema.pre("save", function (next) {
    if (this.status === "borrowed" && this.borrowers.length === 0) {
        return next(new Error("Book cannot be marked as borrowed without a borrower."));
    }
    next();
});

bookSchema.post("save", function (doc) {
    if (doc.status === "available") {
        console.log(`📖 Book "${doc.title}" is now available again.`);
    }
});

export default mongoose.model("Book", bookSchema);
