import { TOrderSchema } from '@/shared/views/order-create/order.schema'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import { authOptions } from '@/shared/lib/backend/auth,options'
import { prisma } from '@/prisma/prisma.client'
import { cartService } from '../../cart/cart.service'
import { getSumAllProducts } from '@/shared/views/home/cart/utils'
import Stripe from 'stripe'
import { getPriceId } from '@/shared/lib/backend/stripe'
import { BASE_URL } from '@/shared/lib/utils'

export const POST = async (req: NextRequest) => {
    const DELIVERY_COST = 120
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
    const session = await getServerSession(authOptions)
    if (!session) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }
    const data: TOrderSchema & { totalAmount: number } = await req.json()
    const ip = req.headers.get('x-forwarded-for')
    const cart = await cartService.getCart(ip as string)

    if (!cart || cart.items.length === 0) {
        return NextResponse.json({ message: 'Cart not found' }, { status: 404 })
    }

    if (getSumAllProducts(cart.items) != data.totalAmount) {
        return NextResponse.json({ message: 'Incorrect total amount' }, { status: 400 })
    }
    const order = await prisma.order.create({
        data: {
            ...data,
            totalAmount: getSumAllProducts(cart.items) + DELIVERY_COST,
            userId: session.user.id,
            cartId: cart.id,
        },
    })

    try {
        const priceId = (await getPriceId(order.totalAmount)) as string
        const checkoutSession: Stripe.Checkout.Session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${BASE_URL}/api/order/status/success?orderId=${order.id}`,
            cancel_url: `${BASE_URL}/api/order/status/cancel?orderId=${order.id}`,
            metadata: {
                userId: 1,
                priceId,
            },
        })
        await prisma.cart.update({
            where: {
                id: cart.id,
            },
            data: {
                ip: null,
            },
        })
        return NextResponse.json({ result: checkoutSession, ok: true })
    } catch (error) {
        console.log(error)
        return new NextResponse('Internal Server', { status: 500 })
    }
}
