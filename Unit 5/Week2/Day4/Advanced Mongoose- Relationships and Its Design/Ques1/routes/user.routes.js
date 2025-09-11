import express from "express";
import User from "../models/user.model.js";

const router = express.Router();

router.post("/add-user", async (req, res) => {
    try {
        const { name, email } = req.body;
        const user = new User({ name, email });
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

export default router;
