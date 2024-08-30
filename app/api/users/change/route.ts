import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import { authOptions } from '@/shared/lib/backend/auth,options'
import { userService } from '../users.service'
import { fileService } from '@/shared/lib/backend/file.service'
import { prisma } from '@/prisma/prisma.client'

export const POST = async (req: NextRequest) => {
    const session = await getServerSession(authOptions)
    const data = await req.formData()
    const avatar = data.get('avatar')
    const username = data.get('username') as string
    const updatedData: { username?: string; avatar?: string } = {}
    if (avatar) {
        const pathImage = await fileService.uploadImage(avatar as File)
        updatedData['avatar'] = pathImage
        const user = await userService.getUserById(session?.user.id as number)
        if (user?.avatar?.startsWith('/uploads/')) {
            await fileService.deleteImage(user?.avatar)
        }
    }

    if (username) {
        updatedData['username'] = username
    }

    try {
        const updatedUser = await userService.updateUser(session?.user.id as number, updatedData)
        return NextResponse.json(updatedUser, { status: 201 })
    } catch (error) {
        return NextResponse.json({ message: 'Something went wrong' }, { status: 400 })
    }
}
