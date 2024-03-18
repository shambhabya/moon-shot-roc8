import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest) {
  
    try {

        const token = req.cookies.get("token")?.value || '';
        const decodedToken:any = jwt.verify(token, process.env.TOKEN_SECRET!);
        const email = decodedToken.email;


      return NextResponse.json(email);

    } catch (error :any) {
      console.error(error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

