const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// MongoDB User Model
const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    resetToken: String,
    resetTokenExpiry: Date
});
const User = mongoose.model("User", UserSchema);

// Nodemailer config (Ethereal for testing)
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// 1. Signup
app.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);

    try {
        const user = new User({ name, email, password: hashed });
        await user.save();
        res.json({ message: "User registered successfully" });
    } catch (err) {
        res.status(400).json({ error: "Email already exists" });
    }
});

// 2. Login
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, "SECRET_KEY", { expiresIn: "1h" });
    res.json({ token });
});

// 3. Forgot Password
app.post("/forgot-password", async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (user) {
        const resetToken = jwt.sign({ id: user._id }, "RESET_SECRET", { expiresIn: "15m" });
        user.resetToken = resetToken;
        user.resetTokenExpiry = Date.now() + 15 * 60 * 1000; // 15 mins
        await user.save();

        const resetLink = `http://localhost:3000/reset-password/${resetToken}`;

        await transporter.sendMail({
            from: '"Auth System" <noreply@example.com>',
            to: user.email,
            subject: "Password Reset",
            text: `Click here to reset your password: ${resetLink}`
        });
    }

    res.json({ message: "If an account exists, a reset link has been sent." });
});

// 4. Reset Password
app.post("/reset-password/:token", async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    try {
        const decoded = jwt.verify(token, "RESET_SECRET");
        const user = await User.findById(decoded.id);

        if (!user || user.resetToken !== token || user.resetTokenExpiry < Date.now()) {
            return res.status(400).json({ error: "Invalid or expired token" });
        }

        user.password = await bcrypt.hash(password, 10);
        user.resetToken = null;
        user.resetTokenExpiry = null;
        await user.save();

        res.json({ message: "Password reset successful" });
    } catch (err) {
        res.status(400).json({ error: "Invalid or expired token" });
    }
});

mongoose.connect("mongodb://127.0.0.1:27017/authdb").then(() => {
    app.listen(3000, () => console.log("Server running on http://localhost:3000"));
});
