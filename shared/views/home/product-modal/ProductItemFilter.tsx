import { cn } from '@/shared/lib/utils'
import { PizzaType, ProductItem } from '@prisma/client'
import React, { Dispatch, SetStateAction } from 'react'
import FilterButton from './FilterButton'

type Props = {
    size: number
    typeProduct: PizzaType
    setSize: Dispatch<SetStateAction<number>>
    setSumAddivities: Dispatch<SetStateAction<number>>
    setTypeProduct: Dispatch<SetStateAction<PizzaType>>
    items: ProductItem[]
}

const ProductItemFilter = ({
    size,
    typeProduct,
    setSize,
    setSumAddivities,
    setTypeProduct,
    items,
}: Props) => {
    return (
        <>
            <div className="bg-[#ECECEC] shadow-sm rounded-[30px] grid grid-cols-3 gap-1 mt-5">
                {items?.map((item, i) => (
                    <FilterButton
                        disabled={false}
                        key={item.id}
                        onClick={() => {
                            setSize(i + 1)
                            setSumAddivities(0)
                        }}
                        active={size == i + 1}
                    >
                        {item.name}
                    </FilterButton>
                ))}
            </div>
            <div className="bg-[#ECECEC] shadow-sm rounded-[30px] grid grid-cols-2 gap-1 mt-5">
                <FilterButton
                    onClick={() => setTypeProduct(PizzaType.TRADIONAL)}
                    disabled={!items[size - 1].isTraditional}
                    active={typeProduct == PizzaType.TRADIONAL}
                >
                    Традиционное
                </FilterButton>
                <FilterButton
                    onClick={() => setTypeProduct(PizzaType.THIN)}
                    disabled={!items[size - 1].isThin}
                    active={typeProduct == PizzaType.THIN}
                >
                    Тонкое
                </FilterButton>
            </div>
        </>
    )
}

export default ProductItemFilter
