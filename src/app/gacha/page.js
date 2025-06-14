'use client'

import Image from "next/image";
import { useEffect, useState } from "react";
import AlertModal from "../lib/alert";
import Sidebar from "../lib/sidebar";

export default function Gacha(){
    const [waifu, setWaifu] = useState(null);
    const [title, setTitle] = useState(null);
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState(false);

    const getWaifu = async () => {
        setLoading(true);
        setWaifu(null);
        try{
            const res = await fetch('/api/get-waifu', {
                method : "POST"
            });
            const data = await res.json();
            setWaifu(data.selectedWaifu);
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

    const saveWaifu = async () => {
        try{
            const res = await fetch('/api/save-waifu', {
                method : "POST",
                headers : {
                    'Content-Type' : 'application/json',
                    Accept : 'application/json',
                },
                body : JSON.stringify({
                    waifu : waifu?.id || waifu?.mal_id,
                    type : waifu?.id ? 'ani' : 'mal'
                }),
            });
            const data = await res.json();
            if(data.success === false){
                return AlertModal.show('Failed', data.message);
            }
            return AlertModal.show('Success', data.message);
        }
        catch(err){
            return AlertModal.show('Failed', err);
        }
    }
    return(
        <div className="h-fit min-h-screen relative bg-texture-1 pt-5">
            <Sidebar />
            <div className="mx-auto rounded-md bg-red-400 px-2 pt-2 pb-4 xl:p-2 w-8/12 md:w-4/12 lg:w-3/12 min-h-[300px] lg:min-h-[500px] flex flex-col justify-evenly">
                <div className="rounded-md bg-red-300 p-5 h-[300px] w-full flex relative overflow-hidden">
                    <Image src={waifu?.images?.webp?.image_url || waifu?.image?.medium || "/assets/yae-miko.png"} fill alt="cover" sizes="(max-width : 768px) 100vw, (max-width : 1200px) 50vw, 33vw" priority className="object-cover"/>
                </div>
                <div className={`mt-3 text-center ${waifu ? 'hidden' : loading ? 'hidden' : 'block'}`}>
                    <h1 className="font-fun text-lg lg:text-xl">Press the "Gacha" button to start!</h1>
                </div>
                {loading && (
                    <div className="text-center pt-3">
                        <h1 className="font-fun text-xl lg:text-3xl">Pulling your char...</h1>
                    </div>
                )}
                {waifu && !loading && (
                    <div className='text-center'>
                        <h1 className="font-fun text-4xl text-center">{waifu.name.full ? waifu.name.full : waifu.name}</h1>
                        <h1 className="font-fun lg:text-lg text-white/75 text-center mb-5">{waifu?.media?.nodes?.[0]?.title?.english ? waifu?.media?.nodes?.[0]?.title?.english : waifu?.anime?.[0]?.anime?.title ?? 'Unknown'}</h1>
                        <div className="flex gap-5 justify-center">
                            <button className="bg-red-500 px-4 py-2 rounded-md font-fun text-xl cursor-pointer active:scale-90" onClick={() => setModal(prev => !prev)}>Details</button>
                            <button className="bg-green-500 px-4 py-2 rounded-md font-fun text-xl cursor-pointer active:scale-90" onClick={saveWaifu}>Save</button>
                        </div>
                    </div>  
                )}
                {modal && (
                    <div className="bg-black/50 top-0 left-0 h-screen w-full pt-2 md:pt-10 fixed modal-container-open z-50 modal">
                        <div className="mx-auto rounded-md bg-red-400 p-5 w-10/12 min-h-[200px] h-fit flex flex-col md:flex-row overflow-hidden modal-open">
                            <div className="md:w-5/12 xl:w-4/12 relative aspect-square">
                                <Image src={waifu?.images?.webp?.image_url || waifu?.image?.medium} alt={`Image of ${waifu.name.full}`} fill sizes="(max-width : 768px) 100vw, (max-width : 1200px) 50vw, 33vw" priority className="object-contain"/>
                            </div>
                            <div className="md:w-8/12 text-start">
                                <h1 className="font-fun text-4xl text-center md:text-start">{waifu.name.full ? waifu.name.full : waifu.name}</h1>
                                <h1 className="font-fun text-2xl hidden xl:block">{waifu.name.native ? waifu.name.full : waifu.name_kanji ? waifu.name_kanji : 'Unknown'}</h1>
                                <h1 className="font-fun xl:text-2xl text-center md:text-start mb-3">Anime : {waifu?.media?.nodes?.[0]?.title?.english ? waifu?.media?.nodes?.[0]?.title?.english : waifu?.anime?.[0]?.anime?.title ?? 'Unknown'}</h1>
                                <h1 className={`font-fun text-xl ${waifu.gender ? 'block' : 'hidden'}`}>Gender : {waifu.gender ?? '-'}</h1>
                                <h1 className="font-fun text-lg xl:mt-3">Description :</h1>
                                <div className={`h-[100px] lg:h-[200px] overflow-y-scroll hide-scrollbar`}>
                                    <p className="font-fun text-lg">{waifu.description ? waifu.description : waifu.about ? waifu.about : 'No Description Available'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <button onClick={getWaifu} className="font-fun block mx-auto mt-5 hover:scale-110 cursor-pointer active:scale-100 transition-all duration-200 bg-red-400 rounded-md px-4 py-2 text-xl lg:text-4xl" disabled={loading === true ? true : false}>GACHA</button>
        </div>
    );
}