const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "This is a public endpoint!" });
});

router.get("/", (req, res) => {
  res.json({ message: "You have access to this limited endpoint!" });
});

module.exports = router;
