import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export default async function middleware(req){
    const { pathname } = req.nextUrl;
    
    if(pathname === '/') {
        
    }
    if(pathname === '/gacha') {
        const cookie = await cookies();
        const token = cookie.get('token')?.value;
        if (!token){
            return NextResponse.redirect(new URL('/', req.url));
        }
        try{
            const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.SECRET_KEY));
            return NextResponse.next();
        }
        catch(err){
            return NextResponse.json({
                success : false,
                message : err.message,
            });
        }
    }
}

export const config = {
    matcher : ['/gacha/:path*', '/'],
}