import { NextResponse } from "next/server";
import { validateOTP } from "../otp";
import { connectDB } from "@/app/mysql/route";

export async function POST(req){
    const { email, otp } =  await req.json();
    const connection = await connectDB();
    const [rows] = await connection.execute(
        'SELECT * FROM otp_codes WHERE email = ?',
        [email]
    );
    if(!email || !otp){
        return NextResponse.json({ success : false, message : 'Data not found' });
    }
    if(rows.length > 0){
        const storedOTP = rows[0];
        if(storedOTP.otp !== otp){
            return NextResponse.json({ success : false, message :  'OTP salah'});
        }
        const validation = validateOTP(email, otp);
        if(validation === false){
            return NextResponse.json({ success : false, message : 'OTP salah atau OTP kadaluwarsa' });
        }
        await connection.execute(
            'UPDATE users SET verified = true WHERE email = ?',
            [email]
        );
        await connection.execute(
            'DELETE FROM otp_codes WHERE email = ?',
            [email]
        );
        await connection.end();

        return NextResponse.json({ success : true, message : 'Account verified' });
    }

    return NextResponse.json({ success : false, message : 'Data not found' });
}