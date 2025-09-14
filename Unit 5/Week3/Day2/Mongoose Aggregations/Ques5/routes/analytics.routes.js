const express = require("express");
const Booking = require("../models/booking.model");
const router = express.Router();

// Route 1: /analytics/movie-bookings
router.get("/movie-bookings", async (req, res) => {
    try {
        const data = await Booking.aggregate([
            {
                $group: {
                    _id: "$movieId",
                    totalBookings: { $sum: 1 },
                    totalSeats: { $sum: "$seats" },
                },
            },
        ]);
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Route 2: /analytics/user-bookings
router.get("/user-bookings", async (req, res) => {
    try {
        const data = await Booking.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "user",
                },
            },
            { $unwind: "$user" },
            {
                $lookup: {
                    from: "movies",
                    localField: "movieId",
                    foreignField: "_id",
                    as: "movie",
                },
            },
            { $unwind: "$movie" },
            {
                $group: {
                    _id: "$user._id",
                    userName: { $first: "$user.name" },
                    bookings: { $push: { movie: "$movie.title", seats: "$seats", status: "$status" } },
                },
            },
        ]);
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Route 3: /analytics/top-users
router.get("/top-users", async (req, res) => {
    try {
        const data = await Booking.aggregate([
            { $group: { _id: "$userId", bookingCount: { $sum: 1 } } },
            { $match: { bookingCount: { $gt: 2 } } },
        ]);
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Route 4: /analytics/genre-wise-bookings
router.get("/genre-wise-bookings", async (req, res) => {
    try {
        const data = await Booking.aggregate([
            {
                $lookup: {
                    from: "movies",
                    localField: "movieId",
                    foreignField: "_id",
                    as: "movie",
                },
            },
            { $unwind: "$movie" },
            {
                $group: {
                    _id: "$movie.genre",
                    totalSeats: { $sum: "$seats" },
                },
            },
        ]);
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Route 5: /analytics/active-bookings
router.get("/active-bookings", async (req, res) => {
    try {
        const data = await Booking.aggregate([
            { $match: { status: "Booked" } },
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "user",
                },
            },
            { $unwind: "$user" },
            {
                $lookup: {
                    from: "movies",
                    localField: "movieId",
                    foreignField: "_id",
                    as: "movie",
                },
            },
            { $unwind: "$movie" },
            {
                $project: {
                    _id: 0,
                    user: "$user.name",
                    movie: "$movie.title",
                    seats: 1,
                    bookingDate: 1,
                },
            },
        ]);
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
