import { PrismaClient } from '@prisma/client';
import nodemailer from 'nodemailer'
import bcryptjs from "bcryptjs"
import crypto from 'crypto'; // For generating random OTP

const prisma = new PrismaClient();

export const sendEmail = async ({ email, userId }: any) => {
  try {
    
    const otp = crypto.randomBytes(4).toString('hex').toUpperCase(); 
    
    
      await prisma.user.update({
        where: { id: userId },
        data: {
          verifyOtp: otp,
        }
      });
    

    // Configure email transport (replace with your actual configuration)
    var transport = nodemailer.createTransport({
      service: "gmail",
      host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    }
    });

    const mailOptions = {
      from: process.env.MAIL_USER, 
      to: email,
      subject: "Enter this OTP to proceed with your action",
      html: `
        <p>Your OTP is: <strong>${otp}</strong>. Enter this OTP to proceed with your action.</p>
        <p>This OTP will expire in 1 hour.</p>
      `
    };

    await transport.sendMail(mailOptions);

    return 'OTP email sent successfully';
  } catch (error: any) {
    throw new Error(error.message);
  }
};
