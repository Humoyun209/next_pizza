import { User } from '@prisma/client'
import { prisma } from '@/prisma/prisma.client'
import { hash } from 'bcrypt'

type UserWithoutDate = Omit<User, 'createdAt' | 'updatedAt'>
class UserService {
    async createUser(data: UserWithoutDate) {
        const newUser = await prisma.user.create({
            data: {
                ...data,
                password: await hash(data.password, 10),
            },
            select: {
                username: true,
                email: true,
                avatar: true,
                createdAt: true,
                updatedAt: true,
            },
        })
        return newUser
    }

    async getUserById(id: number) {
        const user = await prisma.user.findUnique({
            where: {
                id,
            },
            select: {
                id: true,
                username: true,
                email: true,
                provider: true,
                providerId: true,
                avatar: true,
                createdAt: true,
                updatedAt: true,
                verified: true,
                verifiedAt: true,
            },
        })
        return user
    }

    updateUser = async (id: number, data: { username?: string; avatar?: string }) => {
        const updatedUser = await prisma.user.update({
            data,
            where: {
                id,
            },
            select: {
                id: true,
                username: true,
                email: true,
                avatar: true,
                createdAt: true,
                updatedAt: true,
            },
        })
        return updatedUser
    }
}

export const userService = new UserService()
