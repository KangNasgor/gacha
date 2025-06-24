'use client'
import { useEffect, useState } from "react";
import Sidebar from "../lib/sidebar";
import Image from "next/image";

export default function Profile(){
    const [user, setUser] = useState({});
    const [pfp, setPfp] = useState(null);
    const [totalWaifu, setTotalWaifu] = useState(0);
    const [editMode, setEditMode] = useState(false);
    const [userEdit, setUserEdit] = useState({
        username : '',
        email : '',
    });

    useEffect(() => {
        const fetchUser = async () => {
            const res = await fetch('/api/get-user');
            const data = await res.json();
            setUser(data.user[0]);
        }

        const fetchInventory = async () => {
            const res = await fetch('/api/get-inventory/total');
            const data = await res.json();
            setTotalWaifu(data.total);
        }

        fetchUser();
        fetchInventory();
    }, []);

    useEffect(() => {
        if(user.username && user.email){
            setUserEdit({
                username : user.username,
                email : user.email,
            });
        }
    }, [user, editMode]);

    async function uploadPfp(e) {
        e.preventDefault();
        if(!pfp) return;

        const formData = new FormData();
        formData.append('file', pfp);

        const res = await fetch('/api/uppfp', {
            method : "POST",
            body : formData,
        });

        const result = await res.text();
    }
    return(
        <div className="h-screen bg-texture-1 pt-10">
            <Sidebar />
            <div className="w-8/12 p-5 mx-auto rounded-md h-[300px] flex flex-col justify-center items-center gap-4 bg-red-400">
                <div className="flex items-center gap-5">
                    <div className={`relative h-36 w-36 ${editMode ? 'hidden' : 'block'}`}>
                        <Image src={user.picture === '' ? user.picture : '/default-icon.jpg'} fill className="object-cover object-center rounded-full" alt="user's pfp"/>
                    </div>
                    <div className={`${editMode ? 'hidden' : 'block'}`}>
                        <h1 className="font-fun text-5xl mb-3">{user.username}</h1>
                        <h1 className="font-fun text-xl opacity-80">{user.email}</h1>
                        <h1 className="font-fun text-xl opacity-80">Total Waifu : {totalWaifu}</h1>
                    </div>
                    <form className={`${editMode ? 'block' : 'hidden'} flex flex-col items-center gap-5`} onSubmit={uploadPfp} onChange={(e) => { if(e.target.files?.[0]) setPfp(e.target.files[0]) }}>
                        <div className="flex items-center gap-5">
                            <div className="relative inline-block h-36 w-36 cursor-pointer after:content-[''] after:absolute after:transform after:transition-all after:duration-200 after:inset-0 hover:after:bg-black/30 after:rounded-full">
                                <input type="file" className="h-full w-full opacity-0 absolute z-20" accept="image/*"/>
                                <Image src={user.picture === '' ? user.picture : '/default-icon.jpg'} fill className="object-cover object-center rounded-full" id="user-img-input" alt="user's pfp"/>
                            </div>
                            <div className="">
                                <h1 className="font-fun text-xl text-white">Username </h1>
                                <input className="bg-white rounded-md text-black font-fun px-2" placeholder="Username" value={userEdit.username} onChange={(e) => setUserEdit(prev => ({...prev, username : e.target.value}))}/>
                                <h1 className="font-fun text-xl text-white">Email </h1>
                                <input className="bg-white rounded-md text-black font-fun px-2" placeholder="Email" value={userEdit.email} onChange={(e) => setUserEdit(prev => ({...prev, email : e.target.value}))}/>
                            </div>
                        </div>
                        <div className='flex gap-5'>
                            <button className="bg-red-500 font-fun px-3 py-2 rounded-md cursor-pointer" onClick={() => setEditMode(false)}>Cancel</button>
                            <button className="bg-cyan-500 font-fun px-3 py-2 rounded-md cursor-pointer" type="submit">Save</button>
                        </div>
                    </form>
                </div>
                <div className={`flex gap-5 ${editMode ? 'hidden' : 'block'}`}>
                    <button className="bg-cyan-500 font-fun px-3 py-2 rounded-md cursor-pointer" onClick={() => setEditMode(true)}>Edit</button>
                    <button className="bg-red-500 font-fun px-3 py-2 rounded-md cursor-pointer">Delete</button>
                </div>
            </div>
        </div>
    );
}   