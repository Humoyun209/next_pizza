import { Skeleton } from '@/shared/components/ui/skeleton'
import React from 'react'
import CardProductSkeleton from './CardProductSkeleton'

type Props = {}

const CatalogSkeleton = (props: Props) => {
    return (
        <div className="col-span-8 flex flex-col">
            <div className="flex flex-col gap-20">
                {[1, 2, 3].map(i => (
                    <div key={i}>
                        <Skeleton className="h-10 w-[200px]" />
                        <div className="grid grid-cols-3 gap-[50px]">
                            {[1, 2, 3, 4, 5, 6].map(_ => (
                                <CardProductSkeleton key={_} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CatalogSkeleton
