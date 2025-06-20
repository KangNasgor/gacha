'use client'
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faBriefcase, faDice, faUser } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";

export default function Sidebar(){
    const pathname = usePathname();
    const [collapse, setCollapse] = useState(true);
    const [user, setUser] = useState({
        name : null,
        email : null,
        picture : 'NULL',
    });
    useEffect(() => {
        const fetchUser = async () => {
            const res = await fetch('/api/get-user');
            const data = await res.json();
            setUser({
                name : data.user[0]?.username ?? null,
                email : data.user[0]?.email ?? null,
                picture : data.user[0]?.picture ?? null,
            });
        }
        fetchUser();
    }, []);

    return(
        <div className="">
            <div onClick={() => setCollapse((prev) => !prev)} className="fixed top-5 left-3 flex flex-col gap-1 md:hidden">
                <div className="w-5 h-0.5 rounded-md bg-white"></div>
                <div className="w-5 h-0.5 rounded-md bg-white"></div>
                <div className="w-5 h-0.5 rounded-md bg-white"></div>
            </div>
            <div className={`${collapse ? 'w-0 md:w-10' : 'w-36'} overflow-hidden bg-red-400 h-screen fixed top-0 z-40 pt-5 shadow-2xl rounded-r-lg transform transition-all duration-200`}>
                <div className="w-36 p-2 rounded-md flex justify-start overflow-hidden h-8 transform transition-all duration-200 mb-3 relative">
                    <div className="flex gap-3 justify-center items-center absolute top-0 left-1.5">
                        <div className="relative w-7 h-7"> 
                            <Image src={user?.picture === 'NULL' ? '/default-icon.jpg' : `/${user?.picture}`} fill={true} sizes="(max-width : 768px) 20vw, 5vw" alt="User's pfp" className="object-cover object-center rounded-full"/>
                        </div>
                        <h1 className={`font-fun text-md text-white`}>{user.name}</h1>
                    </div>
                </div>
                <Link href={'/profile'} className={`w-full px-2 py-3 hover:bg-red-300 ${pathname === '/profile' ? 'bg-red-500/70' : 'bg-none'} cursor-pointer rounded-md flex justify-start overflow-hidden h-8 transform transition-all duration-200 mb-3 active:scale-95`}>
                    <div className="flex gap-5 justify-center items-center">
                        <FontAwesomeIcon icon={faUser} className="text-xl"/>
                        <h1 className={`font-fun text-lg text-white`}>Profile</h1>
                    </div>
                </Link>
                <Link href={'/inventory'} className={`w-full px-2 py-3 hover:bg-red-300 ${pathname === '/inventory' ? 'bg-red-500/70' : 'bg-none'} cursor-pointer rounded-md flex justify-start overflow-hidden h-8 transform transition-all duration-200 mb-3 active:scale-95`}>
                    <div className="flex gap-5 justify-around items-center">
                        <FontAwesomeIcon icon={faBriefcase} className="text-xl"/>
                        <h1 className={`font-fun text-lg text-white`}>Inventory</h1>
                    </div>
                </Link>
                <Link href={'/gacha'} className={`w-full px-2 py-3 hover:bg-red-300 ${pathname === '/gacha' ? 'bg-red-500/70' : 'bg-none'} cursor-pointer rounded-md flex justify-start overflow-hidden h-8 transform transition-all duration-200 mb-3 active:scale-95`}>
                    <div className="flex gap-5 justify-around items-center">
                        <FontAwesomeIcon icon={faDice} className="text-xl"/>
                        <h1 className={`font-fun text-lg text-white`}>Gacha</h1>
                    </div>
                </Link>
                <div className="w-full flex justify-center hover:bg-red-300 py-2 rounded-md transform transition-all duration-200 active:scale-95" onClick={() => setCollapse((prev) => !prev)}>
                    <FontAwesomeIcon icon={faArrowRight} className={`${ collapse ? 'rotate-0' : 'rotate-180'} transform transition-all duration-200`}/>
                </div>
            </div>
        </div>
    );
}