import { connectDB } from "@/app/mysql/route";
import { NextResponse } from "next/server";

export async function POST(req){
    const body = await req.json();
    const {username, email, password} = body;
    const connection = await connectDB();
    try{
        const [rows] = await connection.execute(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
            [username, email, password]
        )

        await connection.end();

        return NextResponse.json({
            success: true,
            id: rows.insertId
        });
    }
    catch(err){
        return NextResponse.json({
            success: false,
            message: 'Signup failed'
        }, {status : 500});
    }
}