/** @type {import('next').NextConfig} */
const nextConfig = {
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
