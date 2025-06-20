import { NextResponse } from "next/server";
import pool from "@/app/api/mysql/route";
import { cookies } from "next/headers";

export async function GET(){
    const user_id = (await cookies()).get('user_id')?.value;
    try{
        const [waifus] = await pool.execute('SELECT * FROM user_waifus WHERE user_id = ?', [user_id]);
        const totalWaifu = waifus.length;

        return NextResponse.json({
            success : true,
            total : totalWaifu
        });
    }
    catch(err){
        return NextResponse.json({
            success : false,
            message : 'Error : ' + err
        });
    }
}