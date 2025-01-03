// server.js
import express from 'express';
import nodemailer from 'nodemailer';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Set up nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS  // Your email password or app password if using 2FA
  }
});

// Endpoint to handle login
app.post('/api/login', (req, res) => {
  const { email, username } = req.body;

  // Logic to verify user credentials goes here (not shown for simplicity)
  // Assuming login is successful, send the notification email

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `Welcome back, ${username}!`,
    text: `Hello ${username},\n\nYou have successfully logged in to the French Language Learning Tool.\n\nHappy Learning!\n\nBest Regards,\nLanguage Learning Team`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ message: 'Error sending email notification' });
    } else {
      console.log('Email sent: ' + info.response);
      return res.status(200).json({ message: 'Login successful and email notification sent' });
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
