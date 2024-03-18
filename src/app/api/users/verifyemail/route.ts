import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "../../../../helpers/getDataFromToken"

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  
    try {
      const reqBody = await req.json();
      
      const  otp  = reqBody.o_t_p;
      
      

      const userId = await getDataFromToken(req);
      


      // 2. Find user by ID
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      

      if (!user) {
        return NextResponse.json({ error: 'Invalid user' }, { status: 400 });
      }

      // 3. Verify OTP
      if (!user.verifyOtp && !user.isVerified) {
        
        return NextResponse.json({ error: 'verify otp is null' }, { status: 500 });
        
      }

      if(otp!=user.verifyOtp){
        return NextResponse.json({ error: 'otp is not correct' }, { status: 500 });
        }
      
      await prisma.user.update({
        where: { id: user.id },
        data: {
          isVerified: true,
          verifyOtp: null, 
        },
      });

      return NextResponse.json({
        message: 'Email and OTP verified successfully',
        success: true,
      });
    

      
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

