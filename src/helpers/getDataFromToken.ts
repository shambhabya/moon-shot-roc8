import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";


export const getDataFromToken = (request: NextRequest) => {

    interface JwtPayload {
        id: number;
        username: string,
        email: string
    }

    try {
        const token = request.cookies.get("token")?.value || '';
        
        const decodedToken= jwt.verify(token, process.env.TOKEN_SECRET) as JwtPayload;

        return decodedToken.id;
        
        
    } catch (error) { 
        throw new Error(error.message);
    }
}
