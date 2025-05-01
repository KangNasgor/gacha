'use client'

import Image from "next/image";
import { useState } from "react";

export default function Gacha(){
    const[waifu, setWaifu] = useState(null);

    const getWaifu = async () => {
        try{
            const res = await fetch('/api/get-waifu', {
                method : "POST"
            });
            const data = await res.json();
            setWaifu(data.data.Character);
        }
        catch(err){ 
            console.log(err);
        }
    }

    return(
        <div className="h-screen bg-texture-1">
            <button onClick={getWaifu} className="font-fun text-4xl">GACHA</button>
            {
                waifu && (
                <div className="mx-auto rounded-md bg-red-500 p-5 w-6/12 flex gap-5">
                    <div className="w-6/12 relative aspect-[2/3]">
                        <Image src={waifu.image.medium} height={300} width={300} alt={`Image of ${waifu.name.full}`} className="object-contain"/>
                    </div>
                    <div className="w-6/12">
                        <h1 className="font-fun text-4xl">{waifu.name.full}</h1>
                        <h1 className="font-fun text-2xl">{waifu.name.native}</h1>
                        <h1 className="font-fun text-xl">Gender : {waifu.gender === null ? 'null' : waifu.gender}</h1>
                        <div className={`h-[400px] overflow-y-scroll mt-5 ${waifu.description === null ? 'hidden' : 'block'} hide-scrollbar`}>
                            <p className="font-fun text-lg">{waifu.description}</p>
                        </div>
                    </div>
                </div>
                )
            }
        </div>
    );
}