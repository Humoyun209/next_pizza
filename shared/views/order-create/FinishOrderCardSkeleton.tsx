import React from 'react'
import OrderCard from './OrderCard'
import { Skeleton } from '@/shared/components/ui/skeleton'

const FinishOrderCardSkeleton = () => {
    return (
        <OrderCard className="h-min">
            <Skeleton className="h-5 w-[100px]" />
            <Skeleton className="h-10 w-[200px] mt-5" />
            <div className="mt-20 flex flex-col gap-5">
                <div className="flex gap-3 items-center justify-between">
                    <Skeleton className="h-4 w-[150px]" />
                    <Skeleton className="h-5 w-[70px]" />
                </div>
                <div className="flex gap-3 items-center justify-between">
                    <Skeleton className="h-4 w-[150px]" />
                    <Skeleton className="h-5 w-[70px]" />
                </div>
            </div>
            <Skeleton className="w-full mt-20 h-12 " />
        </OrderCard>
    )
}

export default FinishOrderCardSkeleton
