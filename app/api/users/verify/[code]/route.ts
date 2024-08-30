import { prisma } from '@/prisma/prisma.client'
import { NextRequest, NextResponse } from 'next/server'
type Props = {
    params: {
        code: string
    }
}

export const GET = async (req: NextRequest, { params: { code } }: Props) => {
    const verifyCode = await prisma.verificationCode.findFirst({
        where: {
            code,
        },
    })

    if (!verifyCode) {
        console.log('Not found....')
        return NextResponse.redirect(process.env.BASE_URL + '/not-found')
    }
    const now = new Date()
    if (verifyCode.expiredAt < now) {
        console.log('Expired....')
        return NextResponse.redirect(process.env.BASE_URL + '/forbidden')
    }

    const user = await prisma.user.update({
        where: {
            id: verifyCode.userId,
        },
        data: {
            verified: true,
            verifiedAt: now,
        },
    })
    if (user) {
        await prisma.verificationCode.delete({
            where: {
                id: verifyCode.id,
            },
        })
    }
    return NextResponse.redirect(process.env.BASE_URL + '/')
}
