import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import pool from "../mysql/route";

export async function POST(req){
    const cookie = cookies();
    const body = await req.json();
    const { waifu, type } = body;
    const user_id = (await cookie).get('user_id')?.value;
    const [sameWaifu] = await pool.execute('SELECT * FROM user_waifus WHERE user_id = ? AND waifu_id = ? AND type = ?', [user_id, waifu, type]);
    if(sameWaifu.length > 0){
        return NextResponse.json({
            success : false,
            message : 'Waifu sudah ada di inventory!'
        });
    }
    try{
        pool.execute('INSERT INTO user_waifus (user_id, type, waifu_id) VALUES (?, ?, ?)', 
            [user_id, type, waifu]);
        return NextResponse.json({
            success : true,
            message : 'Berhasil menyimpan waifu!'
        });
    }
    catch(err){
        return NextResponse.json({
            success : false,
            message : 'Gagal menyimpan waifu!'
        });
    }
}