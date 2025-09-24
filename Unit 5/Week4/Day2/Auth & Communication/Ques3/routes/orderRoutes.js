const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const auth = require('../middleware/auth');
const roles = require('../middleware/roles');

router.post('/', auth, roles('user'), orderController.createOrder);
router.get('/me', auth, roles('user'), orderController.getOrdersForUser);
router.patch('/:orderId/status', auth, roles('chef', 'admin'), orderController.updateOrderStatus);

module.exports = router;
