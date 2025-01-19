const express = require('express');
const Subscription = require('../models/Subscription');

const router = express.Router();

router.get('/', async (req, res) => {
  const subscriptions = await Subscription.find();
  res.json(subscriptions);
});

router.post('/', async (req, res) => {
  const { name, cost, billingFrequency, renewalDate, category, notes } = req.body;

  const subscription = new Subscription({
    name,
    cost,
    billingFrequency,
    renewalDate,
    category,
    notes,
  });

  await subscription.save();
  res.status(201).json(subscription);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  const subscription = await Subscription.findByIdAndUpdate(id, updatedData, { new: true });
  res.json(subscription);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  await Subscription.findByIdAndDelete(id);
  res.status(204).send();
});

module.exports = router;