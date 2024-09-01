import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { cn } from '@/shared/lib/utils'
import Providers from '@/shared/components/common/Providers'

const nunito = localFont({
    src: [
        {
            path: '../public/fonts/Nunito-Light.ttf',
            weight: '300',
            style: 'light',
        },
        {
            path: '../public/fonts/Nunito-Regular.ttf',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../public/fonts/Nunito-Medium.ttf',
            weight: '500',
            style: 'medium',
        },
        {
            path: '../public/fonts/Nunito-SemiBold.ttf',
            weight: '600',
            style: 'semibold',
        },
        {
            path: '../public/fonts/Nunito-Bold.ttf',
            weight: '700',
            style: 'bold',
        },
        {
            path: '../public/fonts/Nunito-ExtraBold.ttf',
            weight: '800',
            style: 'extrabold',
        },
        {
            path: '../public/fonts/Nunito-Black.ttf',
            weight: '900',
            style: 'black',
        },
    ],
    variable: '--font-nunito',
})

export const metadata: Metadata = {
    title: 'Next Pizza',
    description: 'Next Pizza for ever',
}

type Props = {
    children: React.ReactNode
}

export default function RootLayout({ children }: Props) {
    return (
        <html lang="en">
            <body className={cn(nunito.variable)}>
                <Providers>{children}</Providers>
            </body>
        </html>
    )
}
