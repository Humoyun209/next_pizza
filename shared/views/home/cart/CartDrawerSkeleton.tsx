import { SheetHeader, SheetTitle } from '@/shared/components/ui/sheet'
import { Skeleton } from '@/shared/components/ui/skeleton'
import { Sheet } from 'lucide-react'
import React from 'react'
import { CartItemSkeleton } from './CartItemSkeleton'

type Props = {}

const CartDrawerSkeleton = (props: Props) => {
    return (
        <>
            <SheetHeader className="mt-4">
                <SheetTitle className="mx-2 mr-20">
                    <Skeleton className="h-6 w-full" />
                </SheetTitle>
            </SheetHeader>
            <div className="mt-5 flex flex-col gap-10 overflow-y-auto mb-10">
                <CartItemSkeleton />
                <CartItemSkeleton />
                <CartItemSkeleton />
            </div>
            <div className="mt-auto bg-white p-[35px] flex flex-col gap-3">
                <span className="flex justify-between">
                    <Skeleton className="h-4 w-[70px]" />
                    <Skeleton className="h-4 w-[70px]" />
                </span>
                <Skeleton className="h-12 w-full mt-5" />
            </div>
        </>
    )
}

export default CartDrawerSkeleton
