import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req){
    const token = req.cookies.get('token');
    if(!token){
        return NextResponse.json({
            loggedIn : false,
        });
    }

    return NextResponse.json({
        loggedIn : true,
    });
}