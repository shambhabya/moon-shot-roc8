import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest) {

  interface JwtPayload {
    id: number;
    username: string,
    email: string
}
  
    try {

        const token = req.cookies.get("token")?.value || '';
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!) as JwtPayload;
        const email = decodedToken.email;


      return NextResponse.json(email);

    } catch (error) {
      console.error(error);
      return NextResponse.json({ error }, { status: 500 });
    }
  }

