import { Skeleton } from '@/shared/components/ui/skeleton'
import React from 'react'

type Props = {}

const IngredientsSkeleton = (props: Props) => {
    return (
        <div className="flex flex-col mt-3 items-start gap-4 text-base max-h-[300px] overflow-hidden">
            {[...Array(6)].map((e, i) => (
                <div key={i} className="flex w-full gap-2 items-center cursor-pointer">
                    <Skeleton className="h-8 w-8 rounded-sm" />
                    <Skeleton className="h-6 w-5/6" />
                </div>
            ))}
        </div>
    )
}

export default IngredientsSkeleton
