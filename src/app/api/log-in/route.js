import { connectDB } from "@/app/mysql/route";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"

export async function POST(req){
    const connection = await connectDB();

    const body = await req.json();
    const {username, password} = body;

    const [rows] = await connection.execute(
        'SELECT * FROM users WHERE username = ?',
        [username]
    );

    if(!rows.length){
        return NextResponse.json({
            success : false,
            message : 'Akun tidak ditemukan!'
        });
    }
    const passwordCompare = await bcrypt.compare(password, rows[0].password);
    if(!passwordCompare){
        return NextResponse.json({
            success : false,
            message : 'Password Salah!'
        });
    }

    return NextResponse.json({
        success : true,
        message : 'Berhasil login!'
    })
}