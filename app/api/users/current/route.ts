import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import { userService } from '../users.service'
import { authOptions } from '@/shared/lib/backend/auth,options'

export const GET = async (req: NextRequest) => {
    const session = await getServerSession(authOptions)
    if (!session) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }
    const user = await userService.getUserById(session.user.id)
    return NextResponse.json(user, { status: 200 })
}
