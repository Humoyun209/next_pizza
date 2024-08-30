import { Button } from '@/shared/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import React from 'react'

const EmptyBasket = () => {
    return (
        <div className="flex flex-col gap-4 items-center justify-center h-full px-[55px]">
            <img src="/static/basket.svg" alt="" />
            <h3 className="text-[22px] font-semibold">Корзина пустая</h3>
            <p className="text-secondary-text text-center">
                Добавьте хотя бы одну пиццу, чтобы совершить заказ
            </p>
            <Button size="lg" className="flex items-center gap-2">
                <ArrowLeft size={16} />
                <span>Вернуться назад</span>
            </Button>
        </div>
    )
}

export default EmptyBasket
