import nodemailer from "nodemailer";
import { configDotenv } from "dotenv";

// Load environment variables
configDotenv();

const sendEmail = async function (email, subject, message) {
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: process.env.SMTP_FROM_EMAIL,
    to: ["tanishqkhandelwal2020@gmail.com"], // You might want to use the 'email' parameter here
    subject: subject,
    html: message,
  });
};

export default sendEmail;
