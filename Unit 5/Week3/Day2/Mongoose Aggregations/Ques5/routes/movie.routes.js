const express = require("express");
const Movie = require("../models/movie.model");
const router = express.Router();

// POST /movies → Create a movie
router.post("/", async (req, res) => {
    try {
        const movie = new Movie(req.body);
        await movie.save();
        res.status(200).json(movie);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
