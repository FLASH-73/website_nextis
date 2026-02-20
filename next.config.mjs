/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: "/manifesto",
                destination: "/blog/the-universal-constructor",
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
