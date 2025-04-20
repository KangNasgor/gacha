'use client'
import { useEffect, useState } from "react";

export default function Signup(){
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState("");

    const submitForm = async (e) => {
        e.preventDefault();
        setError("");
        const validations = [
            { check : username.length < 5, message: 'Username tidak boleh dibawah 5 karakter!' },
            { check : password.length < 8, message: 'Password tidak boleh dibawah 8 karakter!' },
            { check : confirmPassword !== password , message: 'Konfirmasi password salah!' },
        ]

        for(let rule of validations){
            if(rule.check){
                return setError(rule.message);
            }
        }
        try{
            const res = await fetch('/api/sign-up', {
                method: 'POST',
                headers: { 'Content-Type' : 'application/json'},
                body: JSON.stringify({
                    username : username,
                    email : email,
                    password : password,
                })
            });
            const data = await res.json();
            if(data.success === false){
                return setError(data.message);
            }
            localStorage.setItem('user-email', email)
            window.location.href = '/auth';
        }
        catch(err){
            console.log("Error :" + err)
        }
    }
    return(
        <div className="bg-texture-1 h-screen flex flex-col gap-4 justify-center items-center">
            <h1 className="text-5xl font-fun">Daftar dulu</h1>
            <form onSubmit={submitForm} className="bg-red-300 rounded-lg flex flex-col items-center gap-5 px-5 pt-3 pb-5">
                <div className="w-fit">
                    <h1 className="font-fun text-xl w-fit">Username</h1>
                    <input placeholder="John Kennedy" className="bg-white font-fun text-black px-3 py-1 rounded-md" value={username} onChange={(e) => setUsername(e.target.value)} required/>
                </div>
                <div className="w-fit">
                    <h1 className="font-fun text-xl w-fit">Email</h1>
                    <input placeholder="John@gmail.com" className="bg-white font-fun text-black px-3 py-1 rounded-md" value={email} type="email" onChange={(e) => setEmail(e.target.value)} required/>
                </div>
                <div className="w-fit">
                    <h1 className="font-fun text-xl w-fit">Password</h1>
                    <input placeholder="Password" className="bg-white font-fun text-black px-3 py-1 rounded-md" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                </div>
                <div className="w-fit">
                    <h1 className="font-fun text-xl w-fit">Confirm Password</h1>
                    <input placeholder="Confirm password" className="bg-white font-fun text-black px-3 py-1 rounded-md" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required/>
                </div>
                {error && (
                    <div className="bg-red-600/50 font-fun border-2 w-50 border-red-600 rounded-md px-3 py-2 flex justify-center items-center">
                        <h1>{error}</h1>
                    </div>
                )}
                <button type="submit" className="bg-red-600 font-fun text-xl rounded-md px-4 py-2">
                    Daftar!
                </button>
            </form>
        </div>
    );
}