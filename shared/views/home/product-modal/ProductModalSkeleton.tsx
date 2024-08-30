'use client'

import { Skeleton } from '@/shared/components/ui/skeleton'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@radix-ui/react-dialog'
import { useRouter } from 'next/navigation'
import React from 'react'
import ProductModalDialog from '.'

type Props = {}

const ProductModalSkeleton = (props: Props) => {
    const router = useRouter()
    return (
        <ProductModalDialog>
            <div className="max-h-[650px] bg-white rounded-l-[30px] border-none flex justify-center items-center relative">
                <img
                    width={350}
                    className="transition-all duration-200"
                    src={'/static/default-product.svg'}
                    alt=""
                />
            </div>
            <div className="max-h-[650px] bg-secondary-foreground rounded-r-[30px] p-10 flex flex-col">
                <Skeleton className="h-6 w-3/4 mb-5" />
                <div className="flex flex-col gap-3">
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-3/4" />
                    <Skeleton className="h-3 w-5/6" />
                </div>
                <Skeleton className="h-12 w-full mt-10" />
                <Skeleton className="h-12 w-2/3 mt-5" />

                <div className="mb-5 grid grid-cols-3 gap-5 mt-10">
                    <Skeleton className="h-[180px] w-[120px]" />
                    <Skeleton className="h-[180px] w-[120px]" />
                    <Skeleton className="h-[180px] w-[120px]" />
                </div>
                <Skeleton className="h-12 w-full mt-auto" />
            </div>{' '}
        </ProductModalDialog>
    )
}

export default ProductModalSkeleton
