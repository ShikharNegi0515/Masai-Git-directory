const express = require("express");
const { enrollStudent } = require("../controllers/enrollment.controller");

const router = express.Router();

router.post("/", enrollStudent);

module.exports = router;
