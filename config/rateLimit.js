const rateLimit = require('express-rate-limit');

module.exports = rateLimit({
  windowMs: process.env.RATE_LIMIT_WINDOW_MS,
  max: process.env.RATE_LIMIT_MAX,
  message: 'Too many requests, please try again later.'
});
