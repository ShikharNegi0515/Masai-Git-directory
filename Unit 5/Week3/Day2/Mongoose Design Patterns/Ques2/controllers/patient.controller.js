const Patient = require("../models/patient.model");
const Consultation = require("../models/consultation.model");

exports.addPatient = async (req, res) => {
  try {
    const patient = await Patient.create(req.body);
    res.status(201).json(patient);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getPatientDoctors = async (req, res) => {
  try {
    const doctors = await Consultation.find({ patientId: req.params.id, isActive: true })
      .populate("doctorId", "name specialization");
    res.json(doctors.map(c => c.doctorId));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMalePatients = async (req, res) => {
  try {
    const patients = await Patient.find({ gender: "Male", isActive: true });
    res.json(patients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
    if (!patient) return res.status(404).json({ message: "Patient not found" });

    await Consultation.updateMany({ patientId: req.params.id }, { isActive: false });

    res.json({ message: "Patient deactivated and consultations updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
