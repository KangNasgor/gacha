import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export default async function middleware(req){
    const cookie = await cookies();
    const token = cookie.get('token')?.value;
    if (!token){
        return NextResponse.redirect(new URL('/login', req.url));
    }
    try{
        const check = jwt.verify(token, process.env.SECRET_KEY);
        return NextResponse.next();
    }
    catch(err){
        return NextResponse.json({
            success : true,
            message : 'Token kadaluwarsa/invalid!',
        });
    }
}

export const config = {
    matcher : '/gacha/:path*',
}