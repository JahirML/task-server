import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();
const config = () => {
  return {
    service: "gmail",
    auth: {
      user: process.env.MAILER_MAIL,
      pass: process.env.MAILER_SECRET_KEY,
    },
    tls: {
      rejectUnauthorized: false,
    },
  };
};
export const transporter = nodemailer.createTransport(config());
