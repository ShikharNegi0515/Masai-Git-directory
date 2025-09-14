const Doctor = require("../models/doctor.model");
const Consultation = require("../models/consultation.model");

exports.addDoctor = async (req, res) => {
    try {
        const doctor = await Doctor.create(req.body);
        res.status(201).json(doctor);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getDoctorPatients = async (req, res) => {
    try {
        const patients = await Consultation.find({ doctorId: req.params.id, isActive: true })
            .populate("patientId", "name age gender")
            .sort({ consultedAt: -1 })
            .limit(10); // limit(n) (here n = 10 by default, you can parametrize it)

        res.json(patients.map(c => c.patientId));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getDoctorConsultationCount = async (req, res) => {
    try {
        const count = await Consultation.countDocuments({ doctorId: req.params.id, isActive: true });
        res.json({ doctorId: req.params.id, consultations: count });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteDoctor = async (req, res) => {
    try {
        const doctor = await Doctor.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
        if (!doctor) return res.status(404).json({ message: "Doctor not found" });

        await Consultation.updateMany({ doctorId: req.params.id }, { isActive: false });

        res.json({ message: "Doctor deactivated and consultations updated" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
