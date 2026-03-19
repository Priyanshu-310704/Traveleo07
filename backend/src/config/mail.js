import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  },
  connectionTimeout: 10000,  // 10 seconds
  greetingTimeout: 10000,    // 10 seconds
});

export default transporter;
