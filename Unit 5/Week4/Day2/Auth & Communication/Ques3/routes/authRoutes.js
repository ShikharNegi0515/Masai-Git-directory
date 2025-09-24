const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { forgotLimiter } = require('../middleware/rateLimit');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/forgot-password', forgotLimiter, authController.forgotPassword);
router.post('/reset-password/:token?', authController.resetPassword); // token optional (can use headers/body)

module.exports = router;
