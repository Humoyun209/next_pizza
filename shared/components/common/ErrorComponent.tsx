'use client'

import { Button } from '@/shared/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

type Props = {
    title: string
    body: string
    imagePath: string
}

const ErrorComponent = ({ body, imagePath, title }: Props) => {
    const router = useRouter()
    return (
        <div className="h-[100vh] flex items-center justify-center mx-auto max-w-[850px] gap-20">
            <div className="flex flex-col gap-4 items-start w-full">
                <h1 className="text-4xl font-extrabold text-dark break-keep">{title}</h1>
                <p className="text-secondary-text text-xl">{body}</p>
                <div className="flex gap-5 mt-5">
                    <Button
                        size="lg"
                        variant="outline"
                        className="flex gap-2"
                        onClick={() => router.push('/')}
                    >
                        <ArrowLeft size={16} />
                        <span>На главную</span>
                    </Button>
                    <Button size="lg" variant="secondary">
                        Обновить
                    </Button>
                </div>
            </div>
            <img src={imagePath} alt="" />
        </div>
    )
}

export default ErrorComponent
