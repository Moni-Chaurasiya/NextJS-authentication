import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const path= request.nextUrl.pathname
    const isPublicPath = path === '/login'|| path==='/signup'|| path==='/verifyemail';
    const token =request.cookies.get("token")?.value || '';
    if(isPublicPath && token ){
        return NextResponse.redirect(new URL('/', request.url))

    }
    if(!isPublicPath && !token ){
        return NextResponse.redirect(new URL('/login', request.url))

    }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/login',
    '/signup',
    '/profile',
    '/verifyemail'
  ]
}


/**
 * 
Purpose: The middleware enforces authentication and redirects users based on whether they have a valid token.
Public Paths: /login, /signup, /verifyemail (accessible without a token).
Protected Paths: /profile, / (require a token).
Redirects:
Authenticated users on public paths → /.
Unauthenticated users on protected paths → /login.
 * 
 */