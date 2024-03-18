import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';
import bcryptjs from 'bcryptjs';
import { sendEmail } from "../../../../helpers/mailer";
import jwt from "jsonwebtoken"

const prisma = new PrismaClient();

export  async function POST(req: NextRequest, res: NextResponse) {
  
    try {
      const reqBody = await req.json();
      const { username, email, password } = reqBody;

      

      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });
      

      if (existingUser) {
        console.log("user already exists");
        return NextResponse.json({ error: 'User already exists' }, { status: 400 });
      }

      // Hash password using bcrypt
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(password, salt);

      // Create new user using Prisma
      const newUser = await prisma.user.create({
        data: {
          username :username,
          email: email,
          password: hashedPassword,
          verifyOtp: null,
        },
      });

      

      const tokenData = {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email
    }
      const token =  jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "10d"})

   
    
      await sendEmail({ email, userId: newUser.id }); 

      const response = NextResponse.json({
        message: 'User created successfully',
        success: true,
        savedUser: newUser, 
      });

      response.cookies.set("token", token, {
        httpOnly: true, 
    })

    return response;

    } catch (error: any) {
      
      console.error("this error is-",error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  } 

// route.ts

// export async function POST(req: NextRequest, res: NextResponse) {
//   // Handle signup logic here
//   return NextResponse.json({ message: 'User created successfully!' });
// }
