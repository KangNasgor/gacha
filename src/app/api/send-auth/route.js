import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req){
    const { email } = await req.json();
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        }
    });

    const info = await transporter.sendMail({
        from: `'Waifu Gacha Official', <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Verification",
        text: "Verification",
        html: "<h1>Verification</h1>"
    });

    return NextResponse.json({success : true});
}