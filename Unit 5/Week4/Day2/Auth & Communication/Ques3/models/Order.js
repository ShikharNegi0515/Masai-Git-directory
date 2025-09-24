const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{ dish: { type: mongoose.Schema.Types.ObjectId, ref: 'Dish' }, qty: Number }],
    status: { type: String, enum: ['Order Received', 'Preparing', 'Out for Delivery', 'Delivered'], default: 'Order Received' },
    assignedChef: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    total: Number
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
