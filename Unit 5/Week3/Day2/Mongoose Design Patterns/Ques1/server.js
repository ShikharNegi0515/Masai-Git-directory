require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const studentRoutes = require("./routes/student.routes");
const courseRoutes = require("./routes/course.routes");
const enrollmentRoutes = require("./routes/enrollment.routes");

const app = express();
app.use(express.json());

// Routes
app.use("/students", studentRoutes);
app.use("/courses", courseRoutes);
app.use("/enroll", enrollmentRoutes);

// DB Connection
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
