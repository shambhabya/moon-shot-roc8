import axios from "axios";
import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server'



export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    const isPublicPath = path === '/login' || path === '/signup' ;

    const token = request.cookies.get('token')?.value || '';

    if (!isPublicPath && !token) {
        // Redirect to login if the path requires authentication but the token is not present
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (isPublicPath && token ) {
        // Redirect to dashboard if the user is already verified and trying to access public paths
        return NextResponse.redirect(new URL('/', request.url));
    }

    


    // Allow access if the conditions are not met
    return NextResponse.next();
}

export const config = {
    // Corrected matcher paths
    matcher: [
        '/',
        '/login',
        '/signup',
        '/verifyemail'
    ]
}
