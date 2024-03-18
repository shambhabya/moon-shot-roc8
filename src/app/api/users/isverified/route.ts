import { getDataFromToken } from "../../../../helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true, 
        email: true,
        isVerified: true,
        
      },
    });

    return NextResponse.json({
      message: "User found",
      user,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  } 
}
