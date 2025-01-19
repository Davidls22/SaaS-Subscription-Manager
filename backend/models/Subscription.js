const mongoose = require('mongoose');

const SubscriptionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  cost: { type: Number, required: true },
  billingFrequency: { type: String, enum: ['monthly', 'annual'], required: true },
  renewalDate: { type: Date, required: true },
  category: { type: String, required: true },
  notes: String,
});

module.exports = mongoose.model('Subscription', SubscriptionSchema);