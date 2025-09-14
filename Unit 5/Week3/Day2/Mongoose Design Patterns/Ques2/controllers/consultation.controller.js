const Consultation = require("../models/consultation.model");
const Doctor = require("../models/doctor.model");
const Patient = require("../models/patient.model");

exports.addConsultation = async (req, res) => {
    try {
        const { doctorId, patientId, notes } = req.body;

        const doctor = await Doctor.findById(doctorId);
        const patient = await Patient.findById(patientId);

        if (!doctor || !doctor.isActive) return res.status(400).json({ message: "Doctor not available" });
        if (!patient || !patient.isActive) return res.status(400).json({ message: "Patient not available" });

        const consultation = await Consultation.create({ doctorId, patientId, notes });
        res.status(201).json(consultation);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getRecentConsultations = async (req, res) => {
    try {
        const consultations = await Consultation.find({ isActive: true })
            .sort({ consultedAt: -1 })
            .limit(5)
            .populate("doctorId", "name specialization")
            .populate("patientId", "name age gender");

        res.json(consultations);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
