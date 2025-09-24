const Dish = require('../models/Dish');

exports.createDish = async (req, res) => {
    try {
        const { name, description, price } = req.body;
        const dish = await Dish.create({ name, description, price, createdBy: req.user._id });
        res.status(201).json(dish);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getDishes = async (req, res) => {
    try {
        const dishes = await Dish.find();
        res.json(dishes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateDish = async (req, res) => {
    try {
        const dish = await Dish.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!dish) return res.status(404).json({ message: 'Dish not found' });
        res.json(dish);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteDish = async (req, res) => {
    try {
        const dish = await Dish.findByIdAndDelete(req.params.id);
        if (!dish) return res.status(404).json({ message: 'Dish not found' });
        res.json({ message: 'Dish deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
