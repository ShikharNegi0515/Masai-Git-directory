const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    _id: String, 
    userId: { type: String, required: true },
    movieId: { type: String, required: true },
    bookingDate: { type: Date, default: Date.now },
    seats: { type: Number, required: true },
    status: { type: String, enum: ["Booked", "Cancelled"], default: "Booked" },
});

module.exports = mongoose.model("Booking", bookingSchema);
