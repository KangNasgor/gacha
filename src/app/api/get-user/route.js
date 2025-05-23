import { NextResponse } from "next/server";
import { connectDB } from "../mysql/route";
import { cookies } from "next/headers";

export async function GET(){
    const connecttion = await connectDB();
    const cookie = cookies();
    try{
        const user_id = (await cookie).get('user_id')?.value;
        const [user] = await connecttion.execute('SELECT * FROM users WHERE id = ?', [user_id]);
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