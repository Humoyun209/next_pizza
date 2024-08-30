'use client'

import Header from '@/shared/views/home/header/Header'
import HeaderOfCategories from '@/shared/views/home/header/HeaderOfCategories'
import LeftFilter from '@/shared/views/home/filters'
import Container from '@/shared/components/ui/container'
import CatalogOfProducts from '@/shared/views/home/catalog'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useRouter, useSearchParams } from 'next/navigation'

const IndexPage = () => {
    const router = useRouter()
    const params = useSearchParams()
    const searchParams = new URLSearchParams(params)
    useEffect(() => {
        const status = params.get('orderStatus')
        setTimeout(() => {
            if (status) {
                if (status == 'canceled') {
                    toast.error('Вы отменили заказ!')
                } else {
                    toast.success(
                        'Поздравляю, вы оплатили заказ ваш заказ в пути, скоро до вас доберется',
                        {
                            duration: 2500,
                        },
                    )
                }
                searchParams.delete('orderStatus')
                router.push('/')
            }
        }, 2000)
    }, [])
    return (
        <>
            <Header search showCart />
            <HeaderOfCategories />
            <Container className=" grid grid-cols-10 mt-9 gap-8">
                <LeftFilter />
                <CatalogOfProducts />
            </Container>
        </>
    )
}

export default IndexPage
