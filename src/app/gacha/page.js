'use client'

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Gacha(){
    const[waifu, setWaifu] = useState(null);
    const [title, setTitle] = useState(null);

    const getWaifu = async () => {
        try{
            const res = await fetch('/api/get-waifu', {
                method : "POST"
            });
            const data = await res.json();
            setWaifu(data.randomWaifu);
            setTitle(data.animeTitle);
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
                <div className="mx-auto rounded-md bg-red-500 p-5 w-10/12 flex overflow-hidden">
                    <div className="w-4/12 relative aspect-square">
                        <Image src={waifu.image.medium === null ? waifu.image.large : waifu.image.medium} height={300} width={300} alt={`Image of ${waifu.name.full}`} className="object-contain"/>
                    </div>
                    <div className="w-8/12">
                        <h1 className="font-fun text-4xl">{waifu.name.full}</h1>
                        <h1 className="font-fun text-2xl">{waifu.name.native}</h1>
                        <h1 className="font-fun text-2xl">Anime : {title}</h1>
                        <h1 className="font-fun text-xl">Gender : {waifu.gender === null ? 'null' : waifu.gender}</h1>
                        <h1 className="font-fun text-lg mt-3">Description :</h1>
                        <div className={`h-[200px] overflow-y-scroll hide-scrollbar`}>
                            <p className="font-fun text-lg">{waifu.description === null ? 'No Description Available.' : waifu.description}</p>
                        </div>
                    </div>
                </div>
                )
            }
        </div>
    );
}