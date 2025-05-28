'use client'
import { useEffect, useState } from "react";
import Sidebar from "../lib/sidebar";
import Image from "next/image";

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
    return(
        <div className="min-h-screen h-fit py-10 bg-texture-1">
            <Sidebar />
            <div className="grid grid-cols-5 gap-5 font-fun p-4 mx-auto w-11/12 bg-red-300 rounded-md">
            {
                inventory && inventory.map(waifu => (
                    <div key={waifu.id ?? waifu.mal_id} className="bg-red-400 rounded-md px-2 pt-2 py-4">
                        <Image src={waifu?.image?.medium ?? waifu?.images?.webp?.image_url} height={300} width={200} alt={'Waifu image'} className="mb-4 rounded-md"/>
                        <h1 className="text-3xl">{waifu?.name?.full ?? waifu.name}</h1>
                        <h2 className="text-md text-white/70">{waifu?.media?.nodes?.[0]?.title?.english ? waifu?.media?.nodes?.[0]?.title.english : waifu?.anime?.[0].anime.title ?? 'Unknown'}</h2>
                    </div>
                ))
            }
            </div>
        </div>
    );
}