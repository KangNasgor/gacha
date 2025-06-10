'use client'
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye, faUser, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";


export default function Login(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPW, setShowPW] = useState(false);

    const [error, setError] = useState("");

    const submitForm = async (e) => {
        e.preventDefault();
        setError('');

        try{
            const res = await fetch('/api/log-in', {
                method : 'POST',
                headers : { 'Content-Type' : 'application/json' },
                body : JSON.stringify({
                    password : password,
                    username : username,
                }),
            });

            const data = await res.json();
            if(data.success === false){
                return setError('Error : ' + data.message);
            }

            window.location.href = "/";
        }
        catch(err){
            setError('Error : ' + err);
        }
    }
    return(
        <div className="bg-texture-1 min-h-screen h-fit flex flex-col gap-4 justify-center items-center">
            <h1 className="text-5xl font-fun">Log In</h1>
            <div className="bg-red-300 rounded-lg flex flex-col md:flex-row p-4 gap-8 items-center justify-start w-9/12 lg:w-7/12 xl:w-6/12">
                <div className="relative w-full h-64">
                    <Image src='/assets/malenia.jpg' fill={true} sizes="(max-width : 768px) 100vw, 50vw" alt="Malenia, Blade of Miquella" className="object-cover object-right rounded-md "/>
                </div>
                <form onSubmit={submitForm} className="flex flex-col justify-center items-center gap-5 w-fit">
                    <div className="flex flex-col gap-3">
                        <div>
                            <h1 className="font-fun text-xl inline-block">Username</h1>
                            <div className="bg-white font-fun text-black px-3 py-1 w-fit rounded-md flex items-center gap-2">
                                <input placeholder="John Kennedy" className="focus:outline-0" value={username} onChange={(e) => setUsername(e.target.value)} required/>
                                <FontAwesomeIcon icon={faUser} className="w-5"/>
                            </div>
                        </div>
                        <div>
                            <h1 className="font-fun text-xl inline-block">Password</h1>
                            <div className="bg-white font-fun text-black px-3 py-1 w-fit rounded-md flex items-center gap-2">
                                <input placeholder="Password" className=" focus:outline-0" type={showPW === false ? 'password' : 'text'} value={password} onChange={(e) => setPassword(e.target.value)} required/>
                                <FontAwesomeIcon icon={showPW === false ? faEye : faEyeSlash} onClick={() => setShowPW(!showPW)} className="cursor-pointer w-5"/>
                            </div>
                        </div>
                    </div>
                    {error && (
                        <div className="bg-red-600/50 font-fun border-2 w-50 border-red-600 rounded-md px-3 py-2 flex justify-center items-center">
                            <h1>{error}</h1>
                        </div>
                    )}
                    <button type="submit" className="bg-red-600 font-fun cursor-pointer text-xl rounded-md px-4 py-2">
                        Login!
                    </button>
                </form>
            </div>
        </div>
    );
}