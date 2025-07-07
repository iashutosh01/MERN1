require('dotenv').config();
const Razorpay = require('razorpay');
const CREDIT_PACKS = require('../constants/paymentConstants'); // Make sure this exports an array/object of allowed credits
const crypto = require('crypto');
const Users = require('../model/Users');

console.log("RAZORPAY_KEY_ID:", process.env.RAZORPAY_KEY_ID);
console.log("RAZORPAY_KEY_SECRET:", process.env.RAZORPAY_KEY_SECRET);

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

const paymentController = {
  // Step #1: Create order when user initiates payment
  createOrder: async (req, res) => {
    try {
      const { credits } = req.body;

      // Validate credits pack
      if (!CREDIT_PACKS.includes(Number(credits))) {
        return res.status(400).json({ message: 'Invalid credit value' });
      }

      // Calculate amount in paise
      const amount = Number(credits) * 100; // Assuming credits represent amount directly, adjust if needed

      // Create Razorpay order
      const order = await razorpay.orders.create({
        amount,
        currency: 'INR',
        receipt: `receipt_${Date.now()}`
      });

      res.json({ order });
    } catch (error) {
      console.error('Create order error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Step #2: Verify payment and update user credits
  verifyOrder: async (req, res) => {
    try {
      const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        credits
      } = req.body;

      // Validate credits pack
      if (!CREDIT_PACKS.includes(Number(credits))) {
        return res.status(400).json({ message: 'Invalid credit value' });
      }

      const generatedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest('hex');

      if (generatedSignature !== razorpay_signature) {
        return res.status(400).json({ message: 'Signature verification failed' });
      }

      // Update user credits
      const user = await Users.findById(req.user.id); // Ensure req.user.id is set via authentication middleware
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      user.credits += Number(credits);
      await user.save();

      res.json({ user });
    } catch (error) {
      console.error('Verify order error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

module.exports = paymentController;
