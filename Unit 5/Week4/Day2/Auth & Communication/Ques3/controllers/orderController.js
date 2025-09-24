const Order = require('../models/Order');
const Dish = require('../models/Dish');
const User = require('../models/User');

exports.createOrder = async (req, res) => {
    try {
        const { items } = req.body; // items: [{ dish: dishId, qty }]
        if (!items || !items.length) return res.status(400).json({ message: 'No items provided' });

        // compute total
        let total = 0;
        for (const it of items) {
            const dish = await Dish.findById(it.dish);
            if (!dish) return res.status(400).json({ message: 'Invalid dish in items' });
            total += dish.price * (it.qty || 1);
        }

        // pick a random chef
        const chefs = await User.find({ role: 'chef' });
        if (!chefs.length) return res.status(500).json({ message: 'No chefs available' });
        const randomChef = chefs[Math.floor(Math.random() * chefs.length)];

        const order = await Order.create({
            user: req.user._id,
            items,
            total,
            assignedChef: randomChef._id,
            status: 'Order Received'
        });

        // Optionally notify the chef via email (left as exercise)
        res.status(201).json(order);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};

exports.getOrdersForUser = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).populate('items.dish').populate('assignedChef', 'name email');
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        const allowed = ['Preparing', 'Out for Delivery', 'Delivered', 'Order Received'];
        if (!allowed.includes(status)) return res.status(400).json({ message: 'Invalid status' });

        const order = await Order.findById(orderId);
        if (!order) return res.status(404).json({ message: 'Order not found' });

        // Chef can only update their assigned orders
        if (req.user.role === 'chef' && order.assignedChef?.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        order.status = status;
        await order.save();
        res.json(order);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
