import { Skeleton } from '@/shared/components/ui/skeleton'

export function CartItemSkeleton() {
    return (
        <div className="flex items-center space-x-4 py-5 px-2">
            <Skeleton className="h-16 w-16 rounded-full" />
            <div className="space-y-4">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[200px]" />
            </div>
        </div>
    )
}
