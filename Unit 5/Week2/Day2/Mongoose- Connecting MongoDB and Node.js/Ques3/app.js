require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const libraryRoutes = require("./routes/library.routes");

const app = express();
app.use(express.json());

connectDB();

app.use("/library", libraryRoutes);

app.use((req, res) => {
    res.status(404).json({ error: "404 Not Found" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
