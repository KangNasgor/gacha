import { NextResponse } from "next/server";

export async function GET(req){
    const cookie = req.headers.get('cookie') || '';
    return NextResponse.json({
        id : cookie
    });
}