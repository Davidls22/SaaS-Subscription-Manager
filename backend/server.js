const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const scheduleRenewalReminders = require('./cronJobs/renewalReminders');
const authRoutes = require('./routes/auth');

dotenv.config();
const app = express();

const allowedOrigins = [
  "https://saas-subscription-manager-1.onrender.com",
  "https://saas-subscription-manager.onrender.com"
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, 
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], 
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
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
