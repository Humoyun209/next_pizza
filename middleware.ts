/* Learn next.js middleware */
import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

// export const config = {
//     matcher: [
//         '/profile/:path*',
//         '/order/create',
//         '/api/users/change',
//         '/api/users/change-password',
//         '/api/users/current',
//     ],
// }

export async function middleware(req: NextRequest) {
    const token = await getToken({ req })
    const pathname = req.nextUrl.pathname
    if (
        !token &&
        (pathname.startsWith('/profile') ||
            pathname.startsWith('/order') ||
            pathname.startsWith('/api/users/change'))
    ) {
        return NextResponse.redirect(new URL('/', req.url))
    }
    return NextResponse.next()
}
