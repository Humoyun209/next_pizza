import ProfileCard from '@/shared/views/profile/ProfileCard'
import { getServerSession } from 'next-auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {}

const ProfilePage = async (props: Props) => {
    const session = await getServerSession()
    console.log('session in Page', session)
    if (!session?.user) {
        return redirect('/forbidden')
    }
    const data = await fetch(process.env.BASE_API + '/users/current', {
        method: 'GET',
        headers: headers(),
    })
    const user = await data.json()

    return <ProfileCard user={user} />
}

export default ProfilePage
