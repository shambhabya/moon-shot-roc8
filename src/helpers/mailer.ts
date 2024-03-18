import { PrismaClient } from '@prisma/client';
import nodemailer from 'nodemailer';
import crypto from 'crypto'; 

const prisma = new PrismaClient();

interface SendEmailProps {
  email: string;
  userId: number; 
}

export const sendEmail = async ({ email, userId }: SendEmailProps) => {
  try {
    const otp = crypto.randomBytes(4).toString('hex').toUpperCase();

    
    await prisma.$transaction(async tx => {
      const user = await tx.user.update({
        where: { id: userId },
        data: { verifyOtp: otp },
      });

      if (!user) {
        throw new Error('User not found');
      }
    });

    
    const transport = nodemailer.createTransport({
      service: "gmail",
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.MAIL_USER,
      to: email,
      subject: "Enter this OTP to proceed with your action",
      html: `
        <p>Your OTP is: <strong>${otp}</strong>. Enter this OTP to proceed with your action.</p>
        <p>This OTP will expire in 1 hour.</p>
      `,
    };

    await transport.sendMail(mailOptions);

    return 'OTP email sent successfully';
  } catch (error) {
    if (typeof error === 'string') {
      console.error("String error:", error); // Handle string errors
    }  else {
      console.error("Unexpected error:", error); // Handle other errors generically
    }
  }
};
