import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: number;
  username: string;
  email: string;
}

export const getDataFromToken = (request: NextRequest): number => {
  try {
    const token = request.cookies.get("token")?.value;

    if (!token) {
      
      throw new Error("Missing token"); 
    }

    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!) as JwtPayload;

    return decodedToken.id;
  } catch (error) {
    console.error("Error verifying token:", error);
    
    throw new Error("Invalid token"); 
  }
};
