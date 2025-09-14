const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    _id: String, 
    title: { type: String, required: true },
    genre: { type: String, required: true },
    releaseYear: Number,
    durationMins: Number,
});

module.exports = mongoose.model("Movie", movieSchema);
