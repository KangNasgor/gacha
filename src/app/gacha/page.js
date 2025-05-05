'use client'

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Gacha(){
    const [waifu, setWaifu] = useState(null);
    const [title, setTitle] = useState(null);
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState(false);

    const getWaifu = async () => {
        setLoading(true);
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
        finally{
            setLoading(false);
        }
    }
    useEffect(() => {
        const closeModal = (e) => {
            if(e.target.classList.contains('modal')){
                setModal(false);
            }
        }

        if(typeof window !== 'undefined'){
            window.addEventListener("click", closeModal)
        }
        return () => window.removeEventListener("click", closeModal);
    }, []);
    return(
        <div className="h-screen bg-texture-1 pt-5">
            <div className="mx-auto rounded-md bg-red-400 p-2 w-3/12 min-h-[500px]">
                <div className="rounded-md bg-red-300 p-5 h-[300px] flex relative overflow-hidden">
                    <Image src={waifu ? waifu.image.medium === null ? waifu.image.large : waifu.image.medium : "/assets/yae-miko.png"} fill alt="cover" className="object-cover"/>
                </div>
                <div className={`mt-3 text-center ${waifu ? 'hidden' : 'block'}`}>
                    <h1 className="font-fun text-3xl text-center">Your waifu will appear here</h1>
                    <h1 className="font-fun text-xl">Press the "Gacha" button to start!</h1>
                </div>
                {waifu && (
                    <div className='mt-3 text-center'>
                        <h1 className="font-fun text-4xl text-center">{waifu.name.full}</h1>
                        <h1 className="font-fun text-lg text-white/75 text-center mb-5">{title ? title : 'Unknown'}</h1>
                        <button className="bg-red-500 px-4 py-2 rounded-md font-fun text-xl" onClick={() => setModal(prev => !prev)}>Details</button>
                    </div>  
                )}
                {modal && (
                    <div className="bg-black/50 top-0 left-0 h-screen w-full pt-10 fixed gacha-result-container-animation-open z-50 modal">
                        <div className="mx-auto rounded-md bg-red-400 p-5 w-10/12 flex overflow-hidden gacha-result-animation-open">
                            <div className="w-4/12 relative aspect-square">
                                <Image src={waifu.image.medium === null ? waifu.image.large : waifu.image.medium} height={300} width={300} alt={`Image of ${waifu.name.full}`} className="object-contain"/>
                            </div>
                            <div className="w-8/12">
                                <h1 className="font-fun text-4xl">{waifu.name.full}</h1>
                                <h1 className="font-fun text-2xl">{waifu.name.native}</h1>
                                <h1 className="font-fun text-2xl">Anime : {title === null ? 'null' : title}</h1>
                                <h1 className="font-fun text-xl">Gender : {waifu.gender === null ? 'null' : waifu.gender}</h1>
                                <h1 className="font-fun text-lg mt-3">Description :</h1>
                                <div className={`h-[200px] overflow-y-scroll hide-scrollbar`}>
                                    <p className="font-fun text-lg">{waifu.description === null ? 'No Description Available.' : waifu.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <button onClick={getWaifu} className="font-fun block mx-auto mt-5 bg-red-400 rounded-md px-4 py-2 text-4xl" disabled={loading === true ? true : false}>GACHA</button>
        </div>
    );
}