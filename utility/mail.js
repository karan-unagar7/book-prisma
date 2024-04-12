import nodemailer from "nodemailer";
import { EMAIL, PASSWORD } from "../config/config.js";

const smtpConfig = {
  EMAIL: EMAIL,
  PASSWORD: PASSWORD,
  HOST: "smtp.gmail.com",
  PORT: 587,
  FROM_EMAIL: EMAIL,
};

export const transporter = nodemailer.createTransport(
  {
    host: smtpConfig.HOST,
    port: smtpConfig.PORT,
    secure: false,
    auth: {
      user: smtpConfig.EMAIL,
      pass: smtpConfig.PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  },
  { sendmail: true }
);

export async function sendEmail(mailOptions) {
  await transporter.verify(async (error) => {
    if (error) {
      return { error: error.message };
    }
  });
  await transporter.sendMail(mailOptions);
  return { result: "Email sent successfully" };
}


