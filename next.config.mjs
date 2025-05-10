/** @type {import('next').NextConfig} */
const nextConfig = {
    images : {
        remotePatterns : [{
            protocol : 'https',
            hostname : 's4.anilist.co',
        },
        {
            protocol : 'https',
            hostname : 'cdn.myanimelist.net',
        }
        ],
    }
};

export default nextConfig;
