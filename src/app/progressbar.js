'use client'

import { usePathname }from 'next/navigation';
import { useEffect } from "react";
import nProgress from "nprogress";
import 'nprogress/nprogress.css'

export default function ProgressBar(){
    const pathname = usePathname();

    useEffect(() => {
        nProgress.start();
        nProgress.done();
    }, []);

    return null;
}