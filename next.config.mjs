/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination:
                    'https://next-pizza-2pab2r3fv-humoyun209s-projects.vercel.app/api/:path*',
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
