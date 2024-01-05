import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { mailTemplate } from './template';
dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: process.env.HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
});

export async function sendVerifyMail(adress: string, name: string, token: string) {
  transporter.sendMail({
    from: 'LinksMusic',
    to: adress,
    subject: 'Verify your email',
    html: mailTemplate(name, token)
  });
}