'use client'
import { useEffect, useState } from "react";
import Sidebar from "../lib/sidebar";

export default function Inventory(){
    const [inventory, setInventory] = useState(null);
    useEffect(() => {
        const fetchInv = async () => {
            const res = await fetch('/api/get-inventory');
            const data = await res.json();
            setInventory(await data.inventory);
        }

        fetchInv();
    }, []);
    useEffect(() => console.log(inventory), [inventory]);
    return(
        <div className="h-screen bg-texture-1">
            <Sidebar />
            <div className="flex gap-5 font-fun mx-auto w-10/12">
            {
                inventory && inventory.map(waifu => (
                    <div key={waifu.id}>
                        <h1 className="text-2xl">{waifu.name.full}</h1>
                    </div>
                ))
            }
            </div>
        </div>
    );
}