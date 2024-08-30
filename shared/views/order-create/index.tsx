'use client'

import React, { useState } from 'react'
import OrderBasket from './OrderBasket'
import FormOrderUser from './FormOrderUser'
import FormDelivery from './FormDelivery'
import FinishOrderCard from './FinishOrderCard'
import Container from '@/shared/components/ui/container'
import Header from '../home/header/Header'
import { fetcher } from '@/shared/lib/fetcher'
import useSWR from 'swr'
import { TCart } from '../home/cart/CartDrawer'
import { getSumAllProducts } from '../home/cart/utils'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { orderSchema, TOrderSchema } from './order.schema'
import toast from 'react-hot-toast'
import { loadStripe, Stripe } from '@stripe/stripe-js'
import { Stripe as StripeBackend } from 'stripe'
import OrderCartSkeleton from './OrderCartSkeleton'
import FinishOrderCardSkeleton from './FinishOrderCardSkeleton'

const OrderClientPage = () => {
    const [createLoading, setLoading] = useState(false)
    const form = useForm<TOrderSchema>({
        resolver: zodResolver(orderSchema),
        mode: 'onBlur',
        defaultValues: {
            name: '',
            lastName: '',
            email: '',
            phone: '',
            address: '',
            comment: '',
        },
    })

    const createOrderHandler = async (data: TOrderSchema) => {
        setLoading(true)
        const stripe = (await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!)) as Stripe
        const result = await fetch('/api/order/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...data, totalAmount: getSumAllProducts(cart?.items || []) }),
        })

        if (result.ok) {
            const dataStripe: { result: StripeBackend.Checkout.Session; ok: boolean } =
                await result.json()
            await stripe.redirectToCheckout({
                sessionId: dataStripe.result.id,
            })
        } else {
            const error = await result.json()
            console.log(error)
            toast.error('Произошла ошибка при создании заказа - ', error.message)
        }
        setLoading(false)
    }
    const { data: cart, isLoading, error } = useSWR<TCart, Error>('/api/cart', { fetcher })
    return (
        <main className="bg-secondary-foreground pb-10">
            <Header />
            <Container className=" my-20">
                <FormProvider {...form}>
                    <form
                        className="grid grid-cols-3 gap-20"
                        onSubmit={form.handleSubmit(createOrderHandler)}
                    >
                        <div className="col-span-2 flex flex-col gap-20">
                            {isLoading ? <OrderCartSkeleton /> : <OrderBasket cart={cart!} />}
                            <FormOrderUser />
                            <FormDelivery />
                        </div>
                        {isLoading ? (
                            <FinishOrderCardSkeleton />
                        ) : (
                            <FinishOrderCard
                                sumProducts={getSumAllProducts(cart?.items || [])}
                                loading={createLoading}
                            />
                        )}
                    </form>
                </FormProvider>
            </Container>
        </main>
    )
}

export default OrderClientPage
