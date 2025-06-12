'use client'
import { useEffect, useState } from "react";
import Sidebar from "../lib/sidebar";

export default function Profile(){
    const [user, setUser] = useState({});
    useEffect(() => {
        const fetchUser = async () => {
            const res = await fetch('/api/get-user');
            const data = await res.json();
            setUser(data.user[0]);
        }

        fetchUser();
    }, []);
    return(
        <div className="h-screen bg-texture-1 pt-10">
            <Sidebar />
            <div className="w-9/12 mx-auto rounded-md h-[300px] bg-red-400">
                <h1>{user.username}</h1>
                <h1>{user.email}</h1>
            </div>
        </div>
    );
}