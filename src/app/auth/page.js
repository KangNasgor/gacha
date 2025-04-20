'use client'
import { useEffect, useState } from "react";


export default function Auth(){
    const [otp, setOtp] = useState("");
    const [email, setEmail] = useState('');

    useEffect(() => {
        const storedEmail = localStorage.getItem('user-email');
        setEmail(storedEmail);
    }, []);

    async function sendEmail(){
        await fetch('/api/send-auth', {
            method: 'POST',
            headers: { 'Content-Type' : 'application/json' },
            body: JSON.stringify({ email }),
        })
    }

    async function validate(e){
        e.preventDefault();
        try{
            const res = await fetch('/api/send-auth/validation', {
                method: 'POST',
                headers: { 'Content-Type' : 'application/json' },
                body : JSON.stringify({ email, otp}),
            })
            const data = await res.json();
            if(data.success === true){
                localStorage.removeItem('user-email')
                window.location.href = '/'
            }
            else{
                console.log(data)
            }
        }
        catch(err){
            console.log(err)
        }
    }

    return(
        <div className="bg-texture-1 h-screen flex justify-center items-center">
            <div className="flex-col gap-3">
                <form onSubmit={validate}>
                    <div className="flex flex-col gap-3 items-center">
                        <h1 className="font-fun text-white text-4xl">Konfirmasi kode OTP</h1>
                        <h3 className="font-fun text-white text-lg">Kode telah dikirim ke email anda</h3>
                        <input className="py-5 w-50 rounded-md bg-white text-black font-fun text-3xl text-center" minLength={6} maxLength={6} type="text" value={otp} onChange={(e) => setOtp(e.target.value)}></input>
                    </div>
                    <div className="flex mt-5 gap-5 justify-center">
                        <button onClick={sendEmail} className="bg-red-400 px-4 py-2 rounded-lg font-fun cursor-pointer">Resend email</button>
                        <button className="bg-red-400 px-4 py-2 rounded-lg font-fun cursor-pointer" type="submit">Confirm</button>
                    </div>
                </form>
            </div>
        </div>
    );
}