'use client'

import React from 'react'
import OrderCard from './OrderCard'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/shared/components/ui/accordion'
import useSWR from 'swr'
import { fetcher } from '@/shared/lib/fetcher'
import { TCart } from '../home/cart/CartDrawer'
import { getPriceBySize, sumProductWithIngredients } from '../home/cart/utils'
import { Size } from '@prisma/client'

type Props = { cart: TCart }

const OrderBasket = ({ cart }: Props) => {
    const formatResult = (item: any, size: Size) => {
        if (item.count > 1) {
            return `${sumProductWithIngredients(item, item.productItem.size) / item.count} ₽ x ${
                item.count
            } = ${sumProductWithIngredients(item, item.productItem.size)}`
        } else {
            return sumProductWithIngredients(item, item.productItem.size)
        }
    }
    return (
        <OrderCard title="1. Корзина">
            <div className="mt-16 flex flex-col gap-8">
                {cart?.items &&
                    cart?.items.length > 0 &&
                    cart.items.map((item, index) => (
                        <Accordion type="single" collapsible key={item.id}>
                            <AccordionItem value="item-1">
                                <AccordionTrigger>
                                    <div className="flex items-center gap-3 justify-between">
                                        <div className="flex items-center gap-2 no-underline">
                                            <img
                                                src={item.productItem.product.image}
                                                className="max-w-[65px] max-h-[65px]"
                                                alt=""
                                            />
                                            <div className="flex flex-col items-start">
                                                <h3 className="text-xl font-bold">
                                                    {item.productItem.product.name}
                                                </h3>
                                                <span className="text-secondary-text">
                                                    {item.productItem.name},{' '}
                                                    {item.type == 'TRADIONAL'
                                                        ? 'традиционное'
                                                        : 'тонкое'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="flex flex-col gap-5 max-w-[500px] mx-auto my-5 text-base">
                                    <div className="flex justify-between text-xl">
                                        <span className="text-xl">
                                            Пицца - <b>{item.productItem.product.name}</b>
                                        </span>
                                        <span>
                                            <b>{item.productItem.price} ₽</b>
                                        </span>
                                    </div>
                                    {item.ingredients.length > 0 && (
                                        <>
                                            <h2 className="text-xl font-bold mt-5">Добавки:</h2>
                                            {item.ingredients.map((ingredient, index) => (
                                                <div className="flex justify-between">
                                                    <span>
                                                        {index + 1}. {ingredient.name}
                                                    </span>
                                                    <span>
                                                        <b>
                                                            {getPriceBySize(
                                                                ingredient,
                                                                item.productItem.size,
                                                            )}{' '}
                                                            ₽
                                                        </b>
                                                    </span>
                                                </div>
                                            ))}
                                        </>
                                    )}
                                    <span className="ml-auto mt-10 text-[18px]">
                                        <b>Итого: {formatResult(item, item.productItem.size)} ₽</b>
                                    </span>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    ))}
            </div>
        </OrderCard>
    )
}

export default OrderBasket
