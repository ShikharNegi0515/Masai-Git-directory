const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    _id: String, 
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    joinedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
