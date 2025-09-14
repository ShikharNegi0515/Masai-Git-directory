const express = require("express");
const User = require("../models/user.model");
const router = express.Router();

// POST /users → Register a user
router.post("/", async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
