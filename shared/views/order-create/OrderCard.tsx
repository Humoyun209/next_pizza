import { cn } from '@/shared/lib/utils'
import React from 'react'

type Props = {
    children: React.ReactNode
    title?: string
    className?: string
}

const OrderCard = ({ children, className, title }: Props) => {
    return (
        <div
            className={cn(
                'bg-white p-[35px] rounded-lg shadow-[rgba(0,_0,_0,_0.16)_0px_1px_4px]',
                className,
            )}
        >
            {title && <h2 className="text-2xl font-bold">{title}</h2>}
            {children}
        </div>
    )
}

export default OrderCard
