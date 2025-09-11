import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/user.routes.js";
import profileRoutes from "./routes/profile.routes.js";

dotenv.config()
const app = express()

app.use(express.json())

app.use("/users", userRoutes)
app.use("/profiles", profileRoutes)

connectDB();
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))
