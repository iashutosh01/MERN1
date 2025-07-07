const express = require('express');
const router = express.Router();
const paymentController = require('../controller/paymentController');
const { isAuthenticated } = require('../middleware/auth');  // if you have auth middleware

// Routes
router.post('/create-order', isAuthenticated, paymentController.createOrder);
router.post('/verify-order', isAuthenticated, paymentController.verifyOrder);

module.exports = router;
