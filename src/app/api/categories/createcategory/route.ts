
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';
import { getDataFromToken } from "~/helpers/getDataFromToken";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    
    
    const userId : any = await getDataFromToken(request);

    const reqBody = await request.json();
    const { id  } : any  = reqBody;

    const category = await prisma.categoriesOnUsers.findUnique({
      where: { userId_categoryId: { userId, categoryId: id } }, 
    });

    let Row;

    if(category === null){

     Row = await prisma.categoriesOnUsers.create({
      data: {
        user: { connect: { id: userId } }, // Use connect to link to existing user
        category: { connect: { id: id } }, // Use connect to link to existing category
        assignedBy: 'YOUR_ASSIGNED_BY_VALUE', // Assign a value for assignedBy
      },
    });
  } else{
     Row = await prisma.categoriesOnUsers.delete({
      where: { userId_categoryId: { userId, categoryId: id } },
    });
  }
      
    

    return NextResponse.json({
      message: "Categories found",
      Row
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  } 
}
