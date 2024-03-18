import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

interface User {
    email: string,
    password: string,
}

const prisma = new PrismaClient(); 

export async function POST(request: NextRequest) {
  
    try {
      const reqBody: User = await request.json() as User;
      const { email, password } = reqBody;
      

      
      const user  = await prisma.user.findUnique({ where: { email } });
      console.log("user-",user)
      if (user === null) {
        return NextResponse.json({ error: "User does not exist" }, { status: 400 });
      }
      
      
      const validPassword = await bcryptjs.compare(password, user.password);
      if (!validPassword) {
        return NextResponse.json({ error: "Invalid password" }, { status: 400 });
      }

      
      const tokenData = {
        id: user.id,
        username: user.username,
        email: user.email,
      };

      // Create token
      const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "10d" });

      const response = NextResponse.json({
        message: "Login successful",
        success: true,
      });
      response.cookies.set("token", token, {
        httpOnly: true,
      });
      return response;
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
