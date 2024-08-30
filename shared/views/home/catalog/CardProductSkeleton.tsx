import { Skeleton } from '@/shared/components/ui/skeleton'
import React from 'react'

type Props = {}

const CardProductSkeleton = (props: Props) => {
    return (
        <div className=" cursor-pointer">
            <div className={'px-[34px] py-[24px] rounded-[15px] relative bg-white'}>
                <img
                    width={0}
                    height={0}
                    className={'w-full h-auto'}
                    src={'/static/default-product.svg'}
                    alt=""
                    loading="lazy"
                />
            </div>
            <div className="flex flex-col gap-5">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
                <div className="flex justify-between items-center gap-10">
                    <Skeleton className="h-5 w-[150px]" />
                    <Skeleton className="h-10 w-full" />
                </div>
            </div>
        </div>
    )
}

export default CardProductSkeleton
