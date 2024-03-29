
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';
import { getDataFromToken } from "~/helpers/getDataFromToken";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    
    const userId = getDataFromToken(request);

    const categories= await prisma.category.findMany();
    

    return NextResponse.json({
      message: "Categories found",
      categories,
      userId
    });
  } catch (error) {
    return NextResponse.json({ error}, { status: 400 });
  } 
}
