import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import pool from "../mysql/route";

export async function GET(){
    const cookie = cookies();
    try{
        const user_id = (await cookie).get('user_id')?.value;
        const [user] = await pool.execute('SELECT username, email, picture FROM users WHERE id = ?', [user_id]);
        return NextResponse.json({
            success : true,
            user : user,
        });
    }
    catch(err){
        return NextResponse.json({
            success : false,
            message : 'Error : ' + err,
        });
    }
}