const express = require("express");
const { addDoctor, getDoctorPatients, getDoctorConsultationCount, deleteDoctor } = require("../controllers/doctor.controller");

const router = express.Router();

router.post("/", addDoctor);
router.get("/:id/patients", getDoctorPatients);
router.get("/:id/consultations/count", getDoctorConsultationCount);
router.delete("/:id", deleteDoctor);

module.exports = router;
