import { prisma } from '@/prisma/prisma.client'
import { sendMail } from '@/shared/lib/backend/send-mail'
import { ICredentialUser } from '@/types/user.credential'
import { hash } from 'bcrypt'
import { randomUUID } from 'crypto'
import { NextRequest, NextResponse } from 'next/server'

function getDateInMinutes(minutes: number) {
    const now = new Date()
    const futureDate = new Date(now.getTime() + minutes * 60000)
    return futureDate
}

export const POST = async (req: NextRequest) => {
    const credentialData: ICredentialUser = await req.json()
    if (credentialData.password != credentialData.confirmPassword) {
        return NextResponse.json({ message: 'Паролы не совпадают' }, { status: 400 })
    }
    const user = await prisma.user.findFirst({
        where: {
            OR: [{ email: credentialData.email }, { username: credentialData.username }],
        },
    })
    if (user) {
        return NextResponse.json(
            { message: 'Пользователь с такими данными уже существует' },
            { status: 400 },
        )
    }

    const newUser = await prisma.user.create({
        data: {
            username: credentialData.username,
            email: credentialData.email,
            password: await hash(credentialData.password, 10),
        },
        select: {
            id: true,
            username: true,
            email: true,
            createdAt: true,
            updatedAt: true,
        },
    })
    const createdAt = new Date()
    const expiredAt = getDateInMinutes(10)

    const verifyCode = await prisma.verificationCode.create({
        data: {
            userId: newUser.id,
            code: randomUUID(),
            createdAt,
            expiredAt,
        },
        select: {
            id: true,
            code: true,
            createdAt: true,
            expiredAt: true,
            userId: true,
        },
    })

    const res = await sendMail(
        [credentialData.email],
        'Подтверждение регистрации',
        'Подтвердите регистрацию',
        `Ваша последняя верификационная ссылка: <a href="http://localhost:3000/api/users/verify/${verifyCode.code}">Подтвердить</a>`,
    )
    return NextResponse.json(newUser, { status: 201 })
}
