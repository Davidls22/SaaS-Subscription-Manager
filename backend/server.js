const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const scheduleRenewalReminders = require('./cronJobs/renewalReminders');
const authRoutes = require('./routes/auth');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

  app.get('/api', (req, res) => {
    res.status(200).json({ message: 'API is running successfully!' });
  });

app.use('/api', authRoutes);
app.use('/api/subscriptions', subscriptionRoutes);

scheduleRenewalReminders();

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));