import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import ChangeForm from '@/shared/views/profile/account/ChangeForm'
import ChangePassword from '@/shared/views/profile/account/ChangePassword'
import { getServerSession } from 'next-auth'
import { headers } from 'next/headers'
import React from 'react'

type Props = {}

const AccountPage = async (props: Props) => {
    const session = await getServerSession()
    const user: any = await fetch(process.env.BASE_API + '/users/current', {
        method: 'GET',
        headers: headers(),
    })
    return (
        <div>
            <ChangeForm />
            {!user.provider && <ChangePassword />}
        </div>
    )
}

export default AccountPage
