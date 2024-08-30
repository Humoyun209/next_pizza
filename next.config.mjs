/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
            {
                // matching all API routes
                source: '/api/:path*',
                headers: [
                    { key: 'Access-Control-Allow-Credentials', value: 'true' },
                    {
                        key: 'Access-Control-Allow-Origin',
                        value: 'https://next-pizza-navy.vercel.app/',
                    }, // replace this your actual origin
                    { key: 'Access-Control-Allow-Methods', value: 'GET,DELETE,PATCH,POST,PUT' },
                    {
                        key: 'Access-Control-Allow-Headers',
                        value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
                    },
                ],
            },
        ]
    },
    reactStrictMode: false,
    images: {
        formats: ['image/avif', 'image/webp'],
        disableStaticImages: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'media.dodostatic.net',
                port: '',
                pathname: '/**',
            },
        ],
    },
}

export default nextConfig
