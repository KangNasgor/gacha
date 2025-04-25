"use client";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  useEffect(() => {
    AOS.init();
  }, []);

  const getWaifu = () => {
    var query = `query ($id: Int) {
      Media (id: $id, type: ANIME) {
          id
          title {
              romaji
              english
              native
          }
      }
      }`;

    var url = "https://graphql.anilist.co",
      options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          query: query,
          variables: {
            id: 15125
          },
        }),
      };
    fetch(url, options)
      .then((res) => res.json())
      .then(data => console.log(data))
      .catch((err) => console.log(err));
  };

  return (
    <div className="h-screen bg-texture-1 flex justify-center items-center">
      <div
        className="flex flex-col items-center bg-[#e57e7e] p-4 rounded-lg"
        data-aos="fade"
        data-aos-duration="1000"
      >
        <h1
          className="font-fun text-8xl text-white hover:scale-110 hover:rotate-6"
          style={{
            transition: "0.5s",
          }}
          data-aos="fade-down"
          data-aos-duration="1000"
        >
          Waifu Gacha Website
        </h1>
        <h1
          className="font-fun text-xl text-white"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          Website buat lu para gooners.
        </h1>
        <div className="flex gap-5">
          <Link
            href="/signup"
            className="bg-red-300 rounded-md px-3 mt-5 py-2 font-fun text-2xl hover:scale-110"
            style={{
              transition: "0.3s",
            }}
            data-aos="fade-left"
            data-aos-duration="1000"
          >
            Sign Up
          </Link>
          <button
            className="bg-red-300 rounded-md px-3 mt-5 py-2 font-fun text-2xl hover:scale-110"
            style={{
              transition: "0.3s",
            }}
            data-aos="fade-left"
            data-aos-duration="1000"
            onClick={() => console.log(Date.now())}
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
}
