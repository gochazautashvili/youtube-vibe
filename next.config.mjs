/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "utfs.io",
                pathname: `/a/${process.env.UPLOADTHING_APP_ID}/*`,
            }
        ]
    },
};

export default nextConfig;
