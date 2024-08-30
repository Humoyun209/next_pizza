'use client'
import { cn } from '@/shared/lib/utils'
import { signOut } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import React from 'react'

type Props = {}

const Sidebar = (props: Props) => {
    const pathName = usePathname()
    const router = useRouter()
    return (
        <ul className="flex flex-col border border-secondary text-secondary-text rounded-sm h-min">
            <li
                onClick={() => router.push('/profile')}
                className={cn(
                    'font-semibold py-4 px-6 text-2xl border-b border-secondary text-center cursor-pointer rounded-t-sm transition-all duration-300 hover:text-dark hover:bg-primary-muted',
                    pathName === '/profile' ? 'text-dark bg-primary-muted' : '',
                )}
            >
                Профиль
            </li>
            <li
                onClick={() => router.push('/profile/orders')}
                className={cn(
                    'font-semibold py-4 px-6 text-2xl border-b border-secondary text-center  cursor-pointer transition-all duration-300 hover:text-dark hover:bg-primary-muted',
                    pathName === '/profile/orders' ? 'text-dark bg-primary-muted' : '',
                )}
            >
                Заказы
            </li>
            <li
                onClick={() => router.push('/profile/account')}
                className={cn(
                    'font-semibold py-4 px-6 text-2xl border-b border-secondary text-center  cursor-pointer transition-all duration-300 hover:text-dark hover:bg-primary-muted',
                    pathName === '/profile/account' ? 'text-dark bg-primary-muted' : '',
                )}
            >
                Аккаунт
            </li>
            <li
                onClick={() => signOut({ redirect: true, callbackUrl: '/' })}
                className={cn(
                    'font-semibold  py-4 px-6 text-2xl border-secondary text-center rounded-b-sm cursor-pointer transition-all duration-300 hover:text-dark hover:bg-primary-muted',
                )}
            >
                Выход
            </li>
        </ul>
    )
}

export default Sidebar
