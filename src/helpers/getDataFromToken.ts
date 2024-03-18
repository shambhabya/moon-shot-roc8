import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: number;
  username: string;
  email: string;
}

// Use a conditional return type to guarantee a number
export const getDataFromToken = (request: NextRequest): number => {
  try {
    const token = request.cookies.get("token")?.value;

    if (!token) {
      // Throw an error or handle missing token differently
      throw new Error("Missing token"); // Or handle it as needed
    }

    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!) as JwtPayload;

    return decodedToken.id;
  } catch (error) {
    console.error("Error verifying token:", error);
    // Throw or handle the error appropriately
    throw new Error("Invalid token"); // Or handle it as needed
  }
};
