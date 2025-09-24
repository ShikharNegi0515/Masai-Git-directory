const rateLimit = require('express-rate-limit');

const forgotLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5,
    message: { message: 'Too many password reset requests, try again later.' }
});

module.exports = { forgotLimiter };
