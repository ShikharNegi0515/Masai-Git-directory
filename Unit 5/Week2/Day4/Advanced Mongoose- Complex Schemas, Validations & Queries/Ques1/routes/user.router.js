const express = require("express");
const router = express.Router();
const User = require("../models/user.model");

// POST /users ➤ Create new user
router.post("/", async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// POST /users/:userId/address ➤ Add new address
router.post("/:userId/address", async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);

        if (!user) return res.status(404).json({ error: "User not found" });

        user.addresses.push(req.body); // push sub-doc
        await user.save();

        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// GET /users/summary ➤ Summary
router.get("/summary", async (req, res) => {
    try {
        const users = await User.find();
        const totalUsers = users.length;
        const totalAddresses = users.reduce((acc, u) => acc + u.addresses.length, 0);
        const userList = users.map(u => ({
            name: u.name,
            addressCount: u.addresses.length
        }));

        res.json({ totalUsers, totalAddresses, userList });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /users/:userId ➤ Full details
router.get("/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);

        if (!user) return res.status(404).json({ error: "User not found" });

        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
