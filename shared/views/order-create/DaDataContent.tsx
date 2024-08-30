'use client'
import React, { useEffect, useState } from 'react'

type Props = {
    query: string
    open: boolean
}

const DaDataInput = ({ query, open }: Props) => {
    const [result, setResult] = useState<string[]>([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        fetch('https://cleaner.dadata.ru/api/v1/clean/address', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'X-Secret': 'd5421c5c6c0ac3ace8e72b8499cc92cf8372ac32',
                Authorization: 'Token ' + 'cbf3defc4cd51f4371b7055cf8aa1d88ed97f3ed',
            },
            body: JSON.stringify([query]),
        })
            .then(res => res.json())
            .then(data => {
                setResult(data)
                setLoading(false)
            })
    }, [query])

    return (
        open && (
            <div className="bg-white z-20 rounded-lg p-10 flex flex-col gap-3 items-center justify-center absolute w-full border border-gray-200 mt-2">
                {loading ? 'Загрузка' : result.map((item, index) => <span key={item}>{item}</span>)}
            </div>
        )
    )
}

export default DaDataInput
