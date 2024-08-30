import { prisma } from '@/prisma/prisma.client'
import { BASE_URL } from '@/shared/lib/utils'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest) => {
    const params = req.nextUrl.searchParams
    const orderId = params.get('orderId')
    if (!orderId) {
        return NextResponse.json({ message: 'Order Not Found' }, { status: 400 })
    }
    try {
        const order = await prisma.order.update({
            where: {
                id: orderId,
            },
            data: {
                status: 'CANCELED',
            },
        })
        return NextResponse.redirect(BASE_URL + '/?orderStatus=paid')
    } catch (error) {
        return NextResponse.json({ message: 'Order Not Found' }, { status: 400 })
    }
}
