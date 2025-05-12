import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req){
    const cookie = cookies();
    cookie.set('token', '', {
        maxAge : new Date(0),
        httpOnly : true,
        path : '/'
    })
    return NextResponse.json({
        success : true,
        message : 'Berhasi Logout!',
    });
}