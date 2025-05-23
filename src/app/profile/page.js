'use client'
import { useEffect } from "react";
import Sidebar from "../lib/sidebar";

export default function Profile(){
    return(
        <div className="h-screen bg-texture-1">
            <Sidebar />
        </div>
    );
}