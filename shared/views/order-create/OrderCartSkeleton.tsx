import React from 'react'
import OrderCard from './OrderCard'
import { Skeleton } from '@/shared/components/ui/skeleton'

type Props = {}

const OrderCartSkeleton = (props: Props) => {
    return (
        <OrderCard>
            <Skeleton className="h-7 w-[200px]" />
            <div className="flex flex-col gap-10 mt-16">
                <div className="flex items-center gap-5">
                    <Skeleton className=" rounded-full w-16 h-16" />
                    <div className="flex flex-col gap-3">
                        <Skeleton className="h-5 w-[200px]" />
                        <Skeleton className="h-3 w-[300px]" />
                    </div>
                </div>
                <div className="flex items-center gap-5">
                    <Skeleton className=" rounded-full w-16 h-16" />
                    <div className="flex flex-col gap-3">
                        <Skeleton className="h-5 w-[200px]" />
                        <Skeleton className="h-3 w-[300px]" />
                    </div>
                </div>
            </div>
        </OrderCard>
    )
}

export default OrderCartSkeleton
