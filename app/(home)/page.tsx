import { Metadata } from 'next'
import IndexPage from '@/shared/views/home'

export const metadata: Metadata = {
    title: 'Главная страница',
    description: 'Самая вкусная пицца в мире',
}

export default function Home() {
    return <IndexPage />
}
