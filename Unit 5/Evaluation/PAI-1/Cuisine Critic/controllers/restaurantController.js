const Restaurant = require("../models/restaurantModel");

// Create Restaurant
exports.createRestaurant = async (req, res) => {
    try {
        const restaurant = await Restaurant.create(req.body);
        res.status(201).json(restaurant);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Get all Restaurants with optional cuisine filter
exports.getRestaurants = async (req, res) => {
    const filter = {};
    if (req.query.cuisine) filter.cuisine = req.query.cuisine;
    const restaurants = await Restaurant.find(filter);
    res.json(restaurants);
};

// Get single Restaurant
exports.getRestaurant = async (req, res) => {
    const restaurant = await Restaurant.findById(req.params.restaurantId);
    if (!restaurant) return res.status(404).json({ message: "Restaurant not found" });
    res.json(restaurant);
};

// Update Restaurant
exports.updateRestaurant = async (req, res) => {
    const restaurant = await Restaurant.findByIdAndUpdate(req.params.restaurantId, req.body, { new: true });
    if (!restaurant) return res.status(404).json({ message: "Restaurant not found" });
    res.json(restaurant);
};
