const express = require("express");
const morgan = require("morgan");
const connectDB = require("./config/db");
const userRoutes = require("./routes/user.routes");
const errorHandler = require("./middleware/errorHandler");

const app = express();
app.use(express.json());
app.use(morgan("dev"));

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/user_profiles";
connectDB(MONGO_URI).catch(err => {
    console.error("DB connection error:", err);
    process.exit(1);
});

app.use("/api", userRoutes);

app.use((req, res) => res.status(404).json({ message: "Not Found" }));

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
