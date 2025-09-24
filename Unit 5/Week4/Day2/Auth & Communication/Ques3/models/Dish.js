const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } 
}, { timestamps: true });

module.exports = mongoose.model('Dish', dishSchema);
