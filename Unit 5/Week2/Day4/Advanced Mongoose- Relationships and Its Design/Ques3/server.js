import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import libraryRoutes from "./routes/library.routes.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use("/", libraryRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB connected"))
    .catch(err => console.error("❌ DB error:", err));

app.listen(process.env.PORT, () => {
    console.log(`🚀 Server running on port ${process.env.PORT}`);
});
