import { Button } from '@/shared/components/ui/button'
import { CartItem as ICartItem, PizzaType, Size } from '@prisma/client'
import { Minus, Plus, X } from 'lucide-react'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { sumProductWithIngredients } from '@/shared/views/home/cart/utils'
import { useSWRConfig } from 'swr'
import { BASE_URL, fetcher } from '@/shared/lib/fetcher'
import toast from 'react-hot-toast'
import { CartItemSkeleton } from './CartItemSkeleton'

type Props = {
    item: {
        id: number
        count: number
        type: PizzaType
        ingredients: {
            id: number
            name: string
            priceMin: number
            priceAvg: number
            priceMax: number
        }[]
        productItem: {
            id: number
            name: string
            size: Size
            isThin: boolean
            price: number
            product: {
                id: number
                image: string
                name: string
            }
        }
    }
    loading?: boolean
    setLoading: Dispatch<SetStateAction<boolean>>
}

const CartItem = ({ item, loading, setLoading }: Props) => {
    const { mutate } = useSWRConfig()
    const handleChangeCountProduct = async (type: 'inc' | 'dec') => {
        setLoading(true)
        let result: any = ''
        if (type == 'inc' && item.count < 5) {
            result = await mutate(
                `${BASE_URL}/cart`,
                fetcher(`${BASE_URL}/cart/change`, {
                    method: 'PUT',
                    body: JSON.stringify({ id: item.id, count: item.count + 1 }),
                }),
            )
        } else if (type == 'dec' && item.count > 1) {
            const result = await mutate<ICartItem>(
                `${BASE_URL}/cart`,
                fetcher(`${BASE_URL}/cart/change`, {
                    method: 'PUT',
                    body: JSON.stringify({ id: item.id, count: item.count - 1 }),
                }),
            )
        }
        setLoading(false)
    }

    const deleteCartItem = async () => {
        setLoading(true)
        const result = await mutate<{ ok: boolean }>(
            `${BASE_URL}/cart`,
            fetcher(`${BASE_URL}/cart/remove/${item.id}`, {
                method: 'DELETE',
            }),
        )
        if (result?.ok) {
            mutate(`${BASE_URL}/cart`)
            toast.success('Товар удален из корзины')
        } else {
            toast.error('Произошла ошибка при удалении')
        }
        setLoading(false)
    }
    return (
        <div className=" bg-white p-5 flex gap-6">
            {loading ? (
                <CartItemSkeleton />
            ) : (
                <>
                    <img
                        className="w-[65px] h-[65px]"
                        src={item.productItem.product.image}
                        alt=""
                    />
                    <div className="flex flex-col w-full">
                        <div className="flex justify-between">
                            <div>
                                <h3 className="text-dark text-base font-bold">
                                    {item.productItem.product.name}
                                </h3>
                                <p className="text-secondary-text text-sm mt-[3px]">
                                    {item.productItem.name},{' '}
                                    {item.type == 'TRADIONAL' ? 'традиционное' : 'тонькое'}
                                </p>
                            </div>
                            <button
                                className="text-secondary-text text-xl"
                                onClick={deleteCartItem}
                            >
                                <X />
                            </button>
                        </div>
                        <div className="flex justify-between mt-[20px] items-center">
                            <div className="flex gap-4 items-center">
                                <Button
                                    size="sm"
                                    variant="outline"
                                    disabled={item.count >= 5}
                                    className="px-[10px] rounded-sm"
                                    onClick={() => handleChangeCountProduct('inc')}
                                >
                                    <Plus size={14} />
                                </Button>
                                <b className="text-dark">{item.count}</b>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="px-[10px] rounded-sm"
                                    onClick={() => handleChangeCountProduct('dec')}
                                    disabled={item.count <= 1}
                                >
                                    <Minus size={14} />
                                </Button>
                            </div>
                            <span className="">
                                <b>{sumProductWithIngredients(item, item.productItem.size)} ₽</b>
                            </span>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default CartItem
