import { BASE_API } from '@/shared/lib/utils'
import ProfileCard from '@/shared/views/profile/ProfileCard'
import { getServerSession } from 'next-auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {}

const ProfilePage = async (props: Props) => {
    const session = await getServerSession()
    if (!session?.user) {
        return redirect('/forbidden')
    }
    const headers_ = new Headers(headers())
    const data = await fetch(BASE_API + '/users/current', {
        method: 'GET',
        headers: headers_,
    })
    const user = await data.json()

    return <ProfileCard user={user} />
}

export default ProfilePage
