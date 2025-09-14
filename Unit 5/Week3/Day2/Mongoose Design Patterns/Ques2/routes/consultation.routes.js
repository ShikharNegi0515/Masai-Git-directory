const express = require("express");
const { addConsultation, getRecentConsultations } = require("../controllers/consultation.controller");

const router = express.Router();

router.post("/", addConsultation);
router.get("/recent", getRecentConsultations);

module.exports = router;
