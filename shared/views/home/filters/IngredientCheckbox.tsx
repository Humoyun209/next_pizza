import React from 'react'
import IngredientsSkeleton from './IngredientsSkeleton'
import useSWR from 'swr'
import { Ingredient } from '@prisma/client'
import { BASE_URL, fetcher } from '@/shared/lib/fetcher'
import Checkbox from '@/shared/components/ui/checkbox'
import { cn } from '@/shared/lib/utils'
import toast from 'react-hot-toast'

type Props = {
    setShowAll: React.Dispatch<React.SetStateAction<boolean>>
    showAll: boolean
    searchV: string
    filteredIngredients: number[]
    changeIngredients: (name: string, id: number) => void
}

const IngredientCheckbox = ({
    changeIngredients,
    filteredIngredients,
    searchV,
    setShowAll,
    showAll,
}: Props) => {
    const {
        data: ingredients = [],
        isLoading,
        error,
    } = useSWR<Ingredient[]>(`${BASE_URL}/ingredients`, {
        fetcher: fetcher,
    })

    if (isLoading) {
        return <IngredientsSkeleton />
    }

    if (error) {
        toast.error('Произошла ошибка при загрузке ингредиентов', { position: 'bottom-left' })
        return <IngredientsSkeleton />
    }
    return (
        <>
            <div
                className={cn(
                    'flex flex-col mt-3 items-start gap-4 text-base max-h-[300px] ',
                    showAll ? 'overflow-auto' : 'overflow-hidden',
                )}
            >
                {ingredients
                    .slice(0, !showAll ? 5 : 250)
                    .filter(e => e.name.toLowerCase().includes(searchV.toLowerCase()))
                    .map((e, i) => (
                        <div
                            onClick={() => changeIngredients(e.name, e.id)}
                            key={i}
                            className="flex gap-2 items-center cursor-pointer"
                        >
                            <Checkbox checked={filteredIngredients.includes(e.id)} />
                            <span>{e.name}</span>
                        </div>
                    ))}
            </div>
            <button
                onClick={() => setShowAll(e => !e)}
                className="text-primary text-base mt-5 font-medium cursor-pointer"
            >
                {!showAll ? '+ Показать всё' : '- Показать меньше'}
            </button>
        </>
    )
}

export default IngredientCheckbox
