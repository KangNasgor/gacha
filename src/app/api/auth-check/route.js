import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req){
    const token = req.cookies.get('token')?.value;
    if(!token){
        return NextResponse.json({
            loggedIn : false,
        });
    }
    try{
        jwt.verify(token, process.env.SECRET_KEY);
        return NextResponse.json({
            loggedIn : true,
        });
    }
    catch(err){
        return NextResponse.json({
            loggedIn : false,
            error : err.message,
            message : "Auth token might be expired or invalid.",
        }, { status : 403 });
    }
}