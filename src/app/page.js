"use client";

import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  useEffect(() => {
    AOS.init();
  }, []);

  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const response = await fetch('/api/auth-check', {
        method : 'GET',
        credentials : "include",
      });

      const data = await response.json();
      if(data.loggedIn === false){
        return false;
      }

      setLoggedIn(true);
      return true;
    }

    checkAuth();
  }, []);

  const logout = async () => {
    await fetch('/api/log-out');
    location.reload();
  }

  return (
    <div className="h-screen bg-texture-1 flex justify-center items-center">
      <div className="flex flex-col items-center bg-[#e57e7e] p-4 rounded-lg" data-aos="fade" data-aos-duration="1000">
        <h1 className="font-fun text-8xl text-center text-white hover:scale-110 hover:rotate-6" style={{
            transition: "0.5s",
          }} data-aos="fade-down" data-aos-duration="1000">
          Waifu Gacha Website
        </h1>
        <h1 className="font-fun text-xl text-white" data-aos="fade-up" data-aos-duration="1000">
          Website buat lu para gooners.
        </h1>
        {
          loggedIn === false ? 
            (<div className="flex gap-5">
                <Link href="/signup" className="bg-red-300 rounded-md px-3 mt-5 py-2 font-fun text-2xl hover:scale-110" style={{ transition: "0.3s" }} data-aos="fade-left" data-aos-duration="1000">
                  Sign Up
                </Link>
                <Link href='/login' className="bg-red-300 rounded-md px-3 mt-5 py-2 font-fun text-2xl hover:scale-110" style={{ transition: "0.3s"}} data-aos="fade-left" data-aos-duration="1000">
                  Log In
                </Link>
              </div>) 
            :
            (<div className="flex gap-5">
              <Link href='/gacha' className="bg-green-500 rounded-md px-3 mt-5 py-2 font-fun text-2xl hover:scale-110 active:scale-105" style={{ transition: "0.3s"}} data-aos="fade-left" data-aos-duration="1000">
                PLAY!
              </Link>
              <button onClick={logout} className="bg-red-500 rounded-md px-3 mt-5 py-2 font-fun text-2xl hover:scale-110 active:scale-105" style={{ transition: "0.3s"}}>
                Logout
              </button>
            </div>)
        }
      </div>
    </div>
  );
}
