
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';
import { getDataFromToken } from "~/helpers/getDataFromToken";

const prisma = new PrismaClient();

export async function POST(request: NextRequest,) {
  try {
    
    
    const userId = await getDataFromToken(request);

    const reqBody = await request.json();
    const { id  }  = reqBody;

    const row = await prisma.categoriesOnUsers.findUnique({
        where: { userId_categoryId: { userId, categoryId: id } }, 
      });
      
    

    return NextResponse.json({
      message: "Categories found",
      row
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  } 
}
