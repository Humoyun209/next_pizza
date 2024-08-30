import { prisma } from '@/prisma/prisma.client'
import { BASE_URL } from '@/shared/lib/utils'
import { redirect } from 'next/navigation'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest) => {
    const params = req.nextUrl.searchParams
    const orderId = params.get('orderId')
    if (!orderId) {
        return NextResponse.json({ message: 'Order Not Found 123' }, { status: 400 })
    }
    try {
        const order = await prisma.order.update({
            where: {
                id: orderId,
            },
            data: {
                status: 'PAID',
            },
        })
        return NextResponse.redirect(BASE_URL + '/?orderStatus=paid')
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: 'Order Not Found 567' }, { status: 400 })
    }
}
