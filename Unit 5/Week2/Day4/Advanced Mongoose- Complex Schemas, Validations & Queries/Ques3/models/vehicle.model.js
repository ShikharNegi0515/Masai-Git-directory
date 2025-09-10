const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
    startLocation: {
        type: String,
        required: [true, "Start location is required"],
        trim: true
    },
    endLocation: {
        type: String,
        required: [true, "End location is required"],
        trim: true
    },
    distance: {
        type: Number,
        required: [true, "Distance is required"],
        min: [1, "Distance must be greater than 0"]
    },
    startTime: {
        type: Date,
        required: [true, "Start time is required"]
    },
    endTime: {
        type: Date,
        required: [true, "End time is required"]
    }
}, { timestamps: true });

const vehicleSchema = new mongoose.Schema({
    registrationNumber: {
        type: String,
        required: [true, "Registration number is required"],
        unique: true,
        trim: true
    },
    type: {
        type: String,
        enum: ["car", "truck", "bike"],
        required: [true, "Vehicle type is required"]
    },
    model: {
        type: String,
        required: [true, "Vehicle model is required"],
        trim: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    trips: [tripSchema]
}, { timestamps: true });

vehicleSchema.index({ registrationNumber: 1 }, { unique: true });

module.exports = mongoose.model("Vehicle", vehicleSchema);
