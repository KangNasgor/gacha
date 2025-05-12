import { connectDB } from "@/app/api/mysql/route";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

    const token = jwt.sign({
        userId : rows[0].id,
        username : rows[0].username
    }, process.env.SECRET_KEY, {expiresIn : '2d'});

    (await cookies()).set('token', token, {
        httpOnly : true,
        secure : true,
        sameSite : 'strict',
        maxAge : 60 * 60 * 48
    });

    (await cookies()).set('user_id', rows[0].id, {
        httpOnly : true,
        secure : true,
        sameSite : 'strict',
        maxAge : 60 * 60 * 48,
    });

    return NextResponse.json({
        success : true,
        message : 'Berhasil login!',
    })
}