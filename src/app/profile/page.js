'use client'
import { useEffect, useState } from "react";
import Sidebar from "../lib/sidebar";
import Image from "next/image";

export default function Profile(){
    const [user, setUser] = useState({});
    const [totalWaifu, setTotalWaifu] = useState(0);
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
    return(
        <div className="h-screen bg-texture-1 pt-10">
            <Sidebar />
            <div className="w-9/12 p-5 mx-auto rounded-md h-[300px] flex items-center gap-4 bg-red-400">
                <div className="relative h-36 w-36">
                    <Image src={user.picture === '' ? user.picture : '/default-icon.jpg'} fill className="object-cover object-center rounded-full" alt="user's pfp"/>
                </div>
                <div>
                    <h1 className="font-fun text-5xl">{user.username}</h1>
                    <h1 className="font-fun text-xl">{user.email}</h1>
                    <h1 className="font-fun text-xl">Total Waifu : {totalWaifu}</h1>
                </div>
            </div>
        </div>
    );
}   