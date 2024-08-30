'use client'
import React, { useEffect, useState } from 'react'
import { useProductFilter } from '@/store/productFilters'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import IngredientCheckbox from './IngredientCheckbox'

const CheckboxGroup = () => {
    const searchParams = useSearchParams().toString()
    const params = new URLSearchParams(searchParams.toString())
    const router = useRouter()
    const pathname = usePathname()
    const { ingredients: filteredIngredients, setIngredients } = useProductFilter()

    useEffect(() => {
        const ingredientStr = params.get('ingredients')
        if (ingredientStr) {
            const ingredientIds = ingredientStr.split('|').map(Number)
            setIngredients(ingredientIds)
        }
    }, [])
    const changeIngredients = (name: string, id: number) => {
        if (!filteredIngredients.includes(id)) {
            setIngredients([...filteredIngredients, id])
            params.set('ingredients', [...filteredIngredients, id].join('|'))
        } else {
            const withoutId = filteredIngredients.filter(e => e !== id)
            setIngredients(withoutId)
            params.set('ingredients', withoutId.join('|'))
        }
        router.push(`${pathname}?${params.toString()}`, { scroll: false })
    }

    const [showAll, setShowAll] = useState<boolean>(false)
    const [searchV, setsearchV] = useState<string>('')

    return (
        <div>
            <h3 className="font-bold text-base text-dark">Ингредиенты:</h3>
            {showAll && (
                <input
                    type="text"
                    className=" border border-secondary outline-none rounded-sm py-2 px-3 text-sm text-secondary-text max-w-[150px] my-4 placeholder:text-secondary"
                    placeholder="Поиск..."
                    value={searchV}
                    onChange={e => setsearchV(e.target.value)}
                />
            )}
            <IngredientCheckbox
                {...{ changeIngredients, filteredIngredients, searchV, setShowAll, showAll }}
            />
        </div>
    )
}

export default CheckboxGroup
