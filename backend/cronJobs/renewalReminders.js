const cron = require("node-cron");
const nodemailer = require("nodemailer");
const SubscriptionModel = require("../models/Subscription");
const UserModel = require("../models/User");
require("dotenv").config();

const sendEmailReminder = async (subscription) => {
  if (!subscription || !subscription.name || !subscription.user) {
    return;
  }

  const user = await UserModel.findById(subscription.user);
  if (!user || !user.email) {
    return;
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: `Renewal Reminder: ${subscription.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
          <h2 style="color: #007BFF; text-align: center;">Renewal Reminder</h2>
          <p style="text-align: center; font-size: 16px; color: #555;">
            Your subscription for <strong>${
              subscription.name || "Unknown"
            }</strong> is set to renew soon.
          </p>
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
              <tr>
                  <td style="font-weight: bold; padding: 8px; border-bottom: 1px solid #ddd;">Subscription Name:</td>
                  <td style="padding: 8px; border-bottom: 1px solid #ddd;">${
                    subscription.name || "Unknown"
                  }</td>
              </tr>
              <tr>
                  <td style="font-weight: bold; padding: 8px; border-bottom: 1px solid #ddd;">Renewal Date:</td>
                  <td style="padding: 8px; border-bottom: 1px solid #ddd;">${
                    new Date(subscription.renewalDate).toLocaleDateString() ||
                    "Unknown Date"
                  }</td>
              </tr>
              <tr>
                  <td style="font-weight: bold; padding: 8px; border-bottom: 1px solid #ddd;">Cost:</td>
                  <td style="padding: 8px; border-bottom: 1px solid #ddd;">£${
                    subscription.cost || "Unknown"
                  }</td>
              </tr>
              <tr>
                  <td style="font-weight: bold; padding: 8px; border-bottom: 1px solid #ddd;">Category:</td>
                  <td style="padding: 8px; border-bottom: 1px solid #ddd;">${
                    subscription.category || "Not Specified"
                  }</td>
              </tr>
          </table> 
      </div>
    `,
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.error("Error sending email:", error);
    }
  });
};

const scheduleRenewalReminders = () => {
  cron.schedule("* * * * *", async () => {
    try {
      const today = new Date();
      const nextWeek = new Date();
      nextWeek.setDate(today.getDate() + 7);

      const upcomingRenewals = await SubscriptionModel.find({
        renewalDate: { $gte: today, $lte: nextWeek },
      }).populate("user");

      if (upcomingRenewals.length > 0) {
        upcomingRenewals.forEach((subscription) => {
          sendEmailReminder(subscription);
        });
      }
    } catch (error) {
      console.error("Error in cron job:", error);
    }
  });
};

module.exports = scheduleRenewalReminders;