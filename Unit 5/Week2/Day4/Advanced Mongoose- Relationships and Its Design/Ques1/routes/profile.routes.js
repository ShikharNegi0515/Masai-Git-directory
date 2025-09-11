import express from "express";
import Profile from "../models/profile.model.js";
import User from "../models/user.model.js";

const router = express.Router();

// Add Profile
router.post("/add-profile", async (req, res) => {
    try {
        const { bio, socialMediaLinks, user } = req.body;

        const existingUser = await User.findById(user);
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const existingProfile = await Profile.findOne({ user });
        if (existingProfile) {
            return res.status(400).json({ message: "Profile already exists for this user" });
        }

        const profile = new Profile({ bio, socialMediaLinks, user });
        await profile.save();
        res.status(201).json(profile);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get("/profiles", async (req, res) => {
    try {
        const profiles = await Profile.find().populate("user", "name email");
        res.json(profiles);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
