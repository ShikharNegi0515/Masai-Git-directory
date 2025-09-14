require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const doctorRoutes = require("./routes/doctor.routes");
const patientRoutes = require("./routes/patient.routes");
const consultationRoutes = require("./routes/consultation.routes");

const app = express();
app.use(express.json());

// Routes
app.use("/doctors", doctorRoutes);
app.use("/patients", patientRoutes);
app.use("/consultations", consultationRoutes);

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
