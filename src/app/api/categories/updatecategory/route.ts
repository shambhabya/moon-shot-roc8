import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';
import { getDataFromToken} from "~/helpers/getDataFromToken";

const prisma = new PrismaClient();

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const userId = getDataFromToken(request); 

    const reqBody = await request.json();
    const { id }: { id: number  } = reqBody; 

    const existingCategory = await prisma.categoriesOnUsers.findUnique({
      where: { userId_categoryId: { userId, categoryId: id } },
    });

    let row: { categoryId: number , userId: number};

    if (existingCategory === null) {
      row = await prisma.categoriesOnUsers.create({
        data: {
          user: { connect: { id: userId } }, // Use connect to link existing user
          category: { connect: { id } }, // Use connect to link existing category
          assignedBy: 'YOUR_ASSIGNED_BY_VALUE', // Replace with appropriate value
        },
      });
    } else {
      row = await prisma.categoriesOnUsers.delete({
        where: { userId_categoryId: { userId, categoryId: id } },
      });
    }

    return NextResponse.json({
      message: existingCategory ? "Category unassigned" : "Category assigned",
      Row: row,
    });
  } catch (error) {
    console.error("Error handling category association:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
