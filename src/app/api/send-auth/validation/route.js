import { NextResponse } from "next/server";
import { validateOTP } from "../otp";
import pool from "../mysql/route";

export async function POST(req){
    const { email, otp } =  await req.json();
    const [rows] = await pool.execute(
        'SELECT * FROM otp_codes WHERE email = ?',
        [email]
    );
    if(!email || !otp){
        return NextResponse.json({ success : false, message : 'Data not found' });
    }
    if(rows.length > 0){
        const storedOTP = rows[0].otp;
        if(storedOTP !== otp){
            return NextResponse.json({ success : false, message : 'OTP salah' });
        }
        const validation = await validateOTP(email, otp);
        if(validation === false){
            return NextResponse.json({ success : false, message : 'OTP kadaluwarsa' });
        }
        await pool.execute(
            'UPDATE users SET verified = true WHERE email = ?',
            [email] 
        );
        await pool.execute(
            'DELETE FROM otp_codes WHERE email = ?',
            [email]
        );

        return NextResponse.json({ success : true, message : 'Account verified' });
    }

    return NextResponse.json({ success : false, message : 'Data not found' });
}