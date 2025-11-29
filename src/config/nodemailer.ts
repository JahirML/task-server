import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();
const config = () => {
  return {
    host: process.env.SMTP_HOST,
    port: +process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    requireTLS: true,
    tls: {
      ciphers: "TLSv1.2",
      rejectUnauthorized: false,
    },
  };
};
export const transporter = nodemailer.createTransport(config());
