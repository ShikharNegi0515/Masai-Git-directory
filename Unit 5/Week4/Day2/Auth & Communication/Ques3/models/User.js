const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, required: true, unique: true, match: /^\S+@\S+\.\S+$/ },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user', 'chef'], default: 'user' },
    resetToken: String,
    resetTokenExpires: Date
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
