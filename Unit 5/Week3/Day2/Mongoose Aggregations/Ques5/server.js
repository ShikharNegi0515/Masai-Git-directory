const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const movieRoutes = require("./routes/movie.routes");
const userRoutes = require("./routes/user.routes");
const bookingRoutes = require("./routes/booking.routes");
const analyticsRoutes = require("./routes/analytics.routes");

const app = express();
app.use(express.json());

// Routes
app.use("/movies", movieRoutes);
app.use("/users", userRoutes);
app.use("/bookings", bookingRoutes);
app.use("/analytics", analyticsRoutes);

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("✅ MongoDB Connected");
        app.listen(3000, () => console.log("🚀 Server running on port 3000"));
    })
    .catch(err => console.error("❌ DB Error:", err));
