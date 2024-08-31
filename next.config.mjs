/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: '/api/:path*',
            },
        ]
    },
    async headers() {
        return [
            {
                source: '/api/:path*',
                headers: [
                    { key: 'Access-Control-Allow-Origin', value: '*' },
                    {
                        key: 'Access-Control-Allow-Methods',
                        value: 'GET, POST, PUT, DELETE, OPTIONS',
                    },
                    { key: 'Access-Control-Allow-Headers', value: '*' },
                ],
            },
        ]
    },
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
