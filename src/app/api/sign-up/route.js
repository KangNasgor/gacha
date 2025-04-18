import { connectDB } from "@/app/mysql/route";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req){
    const body = await req.json();
    const {username, email, password} = body;
    const connection = await connectDB();
    try{
        const [rows] = await connection.execute(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
            [username, email, password]
        )

        await fetch(`http://localhost:3000/api/send-auth`,{
            method: 'POST',
            headers: { 'Content-Type' : 'application/json' },
            body: JSON.stringify({email})
        })
        await connection.end();

        return NextResponse.json({
            success: true,
            id: rows.insertId
        });
    }
    catch(err){
        return NextResponse.json({
            success: false,
            message: 'Signup failed :' + err,
        }, {status : 500});
    }
}