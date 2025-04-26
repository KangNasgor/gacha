'use client'
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye, faUser, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";


export default function Signup(){
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPW, setShowPW] = useState(false);
    const [showPWConf, setShowPWConf] = useState(false);

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
            <div className="bg-red-300 rounded-lg flex gap-5 px-5 pt-3 pb-5 items-center w-9/12">
                <div className="bg-yae-miko rounded-md h-full w-6/12">
                </div>
                <form onSubmit={submitForm} className="flex flex-col items-center gap-5">
                    <div className="grid grid-cols-2 gap-5">
                        <div>
                            <h1 className="font-fun text-xl inline-block">Username</h1>
                            <div className="bg-white font-fun text-black px-3 py-1 w-fit rounded-md flex items-center gap-2">
                                <input placeholder="John Kennedy" className="focus:outline-0" value={username} onChange={(e) => setUsername(e.target.value)} required/>
                                <FontAwesomeIcon icon={faUser}/>
                            </div>
                        </div>
                        <div>
                            <h1 className="font-fun text-xl inline-block">Email</h1>
                            <div className="bg-white font-fun text-black px-3 py-1 w-fit rounded-md flex items-center gap-2">
                                <input placeholder="John@gmail.com" className="focus:outline-0" value={email} type="email" onChange={(e) => setEmail(e.target.value)} required/>
                                <FontAwesomeIcon icon={faEnvelope}/>
                            </div>
                        </div>
                        <div>
                            <h1 className="font-fun text-xl inline-block">Password</h1>
                            <div className="bg-white font-fun text-black px-3 py-1 w-fit rounded-md flex items-center gap-2">
                                <input placeholder="Password" className=" focus:outline-0" type={showPW === false ? 'password' : 'text'} value={password} onChange={(e) => setPassword(e.target.value)} required/>
                                <FontAwesomeIcon icon={showPW === false ? faEye : faEyeSlash} onClick={() => setShowPW(!showPW)} className="cursor-pointer w-5"/>
                            </div>
                        </div>
                        <div>
                            <h1 className="font-fun text-xl inline-block">Confirm Password</h1>
                            <div className="bg-white font-fun text-black px-3 py-1 w-fit rounded-md flex items-center gap-2">
                                <input placeholder="Confirm password" className="focus:outline-0" type={showPWConf === false ? 'password' : 'text'} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required/>
                                <FontAwesomeIcon icon={showPWConf === false ? faEye : faEyeSlash} onClick={() => setShowPWConf(!showPWConf)} className="cursor-pointer w-5"/>
                            </div>
                        </div>
                    </div>
                    {error && (
                        <div className="bg-red-600/50 font-fun border-2 w-50 border-red-600 rounded-md px-3 py-2 flex justify-center items-center">
                            <h1>{error}</h1>
                        </div>
                    )}
                    <button type="submit" className="bg-red-600 font-fun cursor-pointer text-xl rounded-md px-4 py-2">
                        Daftar!
                    </button>
                </form>
            </div>
        </div>
    );
}