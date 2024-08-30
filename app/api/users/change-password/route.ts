import { IChangePassword } from '@/types/user.credential'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import { authOptions } from '@/shared/lib/backend/auth,options'
import { prisma } from '@/prisma/prisma.client'
import { compare, hash } from 'bcrypt'

export const POST = async (req: NextRequest) => {
    const session = await getServerSession(authOptions)
    const data: IChangePassword = await req.json()
    const user = await prisma.user.findFirst({
        where: {
            id: session?.user.id as number,
        },
    })

    if (!user) {
        return NextResponse.json({ message: 'Пользователь не найден' }, { status: 400 })
    }

    const isValid = await compare(data.currentPassword, user.password)

    if (!isValid) {
        return NextResponse.json({ message: 'Предыдущий пароль неверен' }, { status: 400 })
    }

    if (data.confirmPassword != data.newPassword) {
        return NextResponse.json({ message: 'Пароли не совпадают' }, { status: 400 })
    }

    await prisma.user.update({
        where: {
            id: user.id,
        },
        data: {
            password: await hash(data.newPassword, 10),
        },
    })
    return NextResponse.json({ message: 'Пароль успешно изменен' }, { status: 200 })
}
