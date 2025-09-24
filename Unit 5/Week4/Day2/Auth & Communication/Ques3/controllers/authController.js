const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');
const sendEmail = require('../config/email');

const makeToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '1d' });

exports.signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        if (!email || !password) return res.status(400).json({ message: 'Email and password required' });

        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ message: 'Email already in use' });

        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashed, role });
        res.status(201).json({ message: 'User created', userId: user._id });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ message: 'Email and password required' });

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const ok = await bcrypt.compare(password, user.password);
        if (!ok) return res.status(400).json({ message: 'Invalid credentials' });

        const token = makeToken(user._id);
        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ message: 'Email required' });

        const user = await User.findOne({ email });

        // Always respond success to avoid enumeration
        if (!user) return res.json({ message: 'If an account exists, a reset link was sent' });

        // Generate a secure random token (store hashed in DB)
        const resetToken = crypto.randomBytes(32).toString('hex');
        const hashed = crypto.createHash('sha256').update(resetToken).digest('hex');

        user.resetToken = hashed;
        user.resetTokenExpires = Date.now() + (Number(process.env.RESET_TOKEN_EXPIRES_MIN || 30) * 60 * 1000);
        await user.save();

        const resetLink = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}&email=${encodeURIComponent(user.email)}`;

        await sendEmail({
            to: user.email,
            subject: 'Password Reset',
            text: `Reset your password using this link: ${resetLink}`,
            html: `<p>Click <a href="${resetLink}">here</a> to reset your password. Link expires in ${process.env.RESET_TOKEN_EXPIRES_MIN || 30} minutes.</p>`
        });

        res.json({ message: 'If an account exists, a reset link was sent' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        // token from header OR body OR params — support headers here
        const token = req.headers['x-reset-token'] || req.body.token || req.params.token;
        const { password } = req.body;

        if (!token || !password) return res.status(400).json({ message: 'Token and new password required' });

        const hashed = crypto.createHash('sha256').update(token).digest('hex');

        const user = await User.findOne({ resetToken: hashed, resetTokenExpires: { $gt: Date.now() } });
        if (!user) return res.status(400).json({ message: 'Invalid or expired token' });

        user.password = await bcrypt.hash(password, 10);
        user.resetToken = undefined;
        user.resetTokenExpires = undefined;
        await user.save();

        res.json({ message: 'Password reset successful' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
