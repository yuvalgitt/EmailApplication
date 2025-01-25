import nodemailer from "nodemailer";
import { setEnvPath } from "../utils/utils";

setEnvPath();

export const sendMail = async (
  fromEmail: string,
  toEmail: string,
  html: string,
  subject: string
) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "yuvalprojects232@gmail.com",
      pass: process.env.APP_CODE_SECRET,
    },
  });

  const info = await transporter.sendMail({
    from: fromEmail,
    to: toEmail,
    subject: subject,
    html: html,
  });
};
