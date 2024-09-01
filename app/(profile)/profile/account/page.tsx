import { BASE_API } from '@/shared/lib/utils'
import ChangeForm from '@/shared/views/profile/account/ChangeForm'
import ChangePassword from '@/shared/views/profile/account/ChangePassword'
import { headers } from 'next/headers'
import React from 'react'

type Props = {}

const AccountPage = async (props: Props) => {
    const headers_ = new Headers(headers())
    const user: any = await fetch(BASE_API + '/users/current', {
        method: 'GET',
        headers: headers_,
    })
    return (
        <div>
            <ChangeForm />
            {user.data && !user.data.provider && <ChangePassword />}
        </div>
    )
}

export default AccountPage
