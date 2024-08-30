import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const returnArray = (count: number) => {
    let result = []
    for (let i = 1; i <= count; i++) {
        result.push(i)
    }
    return result
}

export const sumPrice = (price: number, add: number) => {
    return price + add
}

const getEnv = () => {
    if (process.env.NODE_ENV == 'production') {
        const BASE_API = process.env.NEXT_PUBLIC_BASE_PRODUCTION_API
        const BASE_URL = process.env.NEXT_PUBLIC_BASE_PRODUCTION_URL
        return { BASE_API, BASE_URL }
    } else {
        const BASE_API = process.env.NEXT_PUBLIC_BASE_DEVELOPMENT_API
        const BASE_URL = process.env.NEXT_PUBLIC_BASE_DEVELOPMENT_URL
        return { BASE_API, BASE_URL }
    }
}

const env = getEnv()
export const BASE_API = env.BASE_API
export const BASE_URL = env.BASE_URL
