import React from 'react'
import OrderCard from './OrderCard'
import ButtonWithLoading from '@/shared/components/common/ButtonWithLoading'
import { ArrowRight, Package, Truck } from 'lucide-react'

type Props = {
    sumProducts: number
    loading: boolean
}

const FinishOrderCard = ({ sumProducts, loading }: Props) => {
    return (
        <OrderCard className="h-min">
            <p className="text-[22px]">Итого:</p>
            <h2 className="text-[34px] text-dark font-extrabold">{sumProducts + 120} ₽</h2>
            <div className="mt-20 flex flex-col gap-5">
                <div className="flex gap-3 items-center">
                    <Package className="text-secondary-text" size={16} />
                    <span className="text-[18px] text-dark">Стоимость товаров:</span>
                    <span className="text-[18px] font-bold ml-auto">{sumProducts} ₽</span>
                </div>
                <div className="flex gap-3 items-center">
                    <Truck className="text-secondary-text" size={16} />
                    <span className="text-[18px] text-dark">Доставка:</span>
                    <span className="text-[18px] font-bold ml-auto">120 ₽</span>
                </div>
            </div>
            <ButtonWithLoading
                loading={loading}
                type="submit"
                className="w-full mt-20 h-12 flex items-center gap-2"
            >
                <span>Оформить заказ</span>
                <ArrowRight size={16} />
            </ButtonWithLoading>
        </OrderCard>
    )
}

export default FinishOrderCard
