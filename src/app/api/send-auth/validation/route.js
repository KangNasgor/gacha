import { NextResponse } from "next/server";
import { validateOTP, otpStorage } from "../otp";

export async function POST(req){
    const { email, otp } =  await req.json();
    if(!email || !otp){
        return NextResponse.json({message : 'Missing data'});
    }
    if(otpStorage[email].otp !== otp){
        return NextResponse.json({message : 'Invalid OTP'});
    }

    validateOTP(email, otp);

    localStorage.removeItem('user-email');
    otpStorage[email] = {};
}