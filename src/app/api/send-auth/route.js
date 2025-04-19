import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { generateOTP, storeOTP } from "./otp";

export async function POST(req){
    const { email } = await req.json();
    const otp = generateOTP();

    storeOTP(email, otp);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,   
        }
    });

    await transporter.sendMail({
        from: `'Waifu Gacha Official', <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Verification",
        text: "Verification",
        html: `<h1>Waifu Gacha Account Verification</h1> <br> <h1>Here's your OTP</h1> <br> <h1>${otp}</h1>`
    });

    return NextResponse.json({success : true});
}