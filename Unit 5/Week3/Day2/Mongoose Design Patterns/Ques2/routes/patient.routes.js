const express = require("express");
const { addPatient, getPatientDoctors, getMalePatients, deletePatient } = require("../controllers/patient.controller");

const router = express.Router();

router.post("/", addPatient);
router.get("/:id/doctors", getPatientDoctors);
router.get("/", getMalePatients);  // /patients?gender=Male
router.delete("/:id", deletePatient);

module.exports = router;
