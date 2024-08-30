'use client'
import { cn } from '@/shared/lib/utils'
import { useCategoryId } from '@/store/category'
import Container from '@/shared/components/ui/container'
import SortedPopover from './SortedPopover'
import { usePathname, useRouter } from 'next/navigation'
import useSWR from 'swr'
import { BASE_URL, fetcher } from '@/shared/lib/fetcher'
import { Skeleton } from '@/shared/components/ui/skeleton'
import toast from 'react-hot-toast'

type Props = {
    className?: string
}

const HeaderOfCategories = ({ className }: Props) => {
    const router = useRouter()
    const pathname = usePathname()
    const { setCategoryId, categoryId } = useCategoryId()
    const safePageCategory = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, name: string) => {
        e.preventDefault()
        router.push(pathname + '#' + name, { scroll: false })
        const element = document.getElementById(name)
        element?.scrollIntoView({ behavior: 'smooth' })
    }

    interface ICategory {
        id: number
        name: string
    }

    const { data, isLoading, error } = useSWR<{ categories: ICategory[] }, Error>(
        BASE_URL + '/categories',
        { fetcher },
    )

    if (isLoading) {
        return (
            <Container className="mt-28 mb-16">
                <Skeleton className="w-[250px] h-8" />
                <Skeleton className="w-[650px] h-12 mt-5" />
            </Container>
        )
    }

    if (error) {
        toast.error('Произошла ошибка при загрузке категорий - ' + error.message, {
            position: 'top-left',
        })
        return (
            <Container className="mt-28 mb-16">
                <Skeleton className="w-[200px] h-8" />
                <Skeleton className="w-[650px] h-10 mt-5" />
            </Container>
        )
    }

    return (
        !isLoading && (
            <>
                <Container>
                    <h1 className="text-4xl font-bold mt-20 mb-5">{`${
                        data?.categories.find(cat => cat.id == categoryId)?.name
                    }`}</h1>
                </Container>
                <div className="sticky top-0 z-10 bg-white pb-6 pt-4 shadow-md">
                    <Container className="flex justify-between items-center">
                        <div className="p-[6px] bg-secondary-foreground inline-flex gap-1 rounded-md">
                            {data?.categories.map((cat, index) => (
                                <a
                                    onClick={e => safePageCategory(e, cat.name)}
                                    key={index}
                                    href={`/#${cat.name}`}
                                >
                                    <button
                                        onClick={() => setCategoryId(cat.id)}
                                        className={cn(
                                            'rounded-md text-dark font-semibold px-4 py-2 text-nowrap',
                                            categoryId == cat.id
                                                ? 'bg-white shadow-md'
                                                : 'bg-transparent',
                                        )}
                                    >
                                        {cat.name}
                                    </button>
                                </a>
                            ))}
                        </div>
                        <SortedPopover />
                    </Container>
                </div>
            </>
        )
    )
}

export default HeaderOfCategories
