import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import { userService } from '../users.service'
import { authOptions } from '@/shared/lib/backend/auth,options'

export const GET = async (req: NextRequest) => {
    try {
        const session = await getServerSession(authOptions)
        if (!session) {
            return NextResponse.redirect('/?message=Unauthorized')
        }
        const user = await userService.getUserById(session.user.id)
        return NextResponse.json(user, { status: 200 })
    } catch (error) {
        if (error instanceof Error) {
            console.log(error)
            console.log(error.message)
        }
        return NextResponse.json({ ok: false }, { status: 400 })
    }
}
