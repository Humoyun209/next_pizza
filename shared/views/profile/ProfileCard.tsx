import { userService } from '@/app/api/users/users.service'
import { BookType, Calendar, CalendarFold, CheckCheckIcon, CheckCircle } from 'lucide-react'
import React from 'react'
import moment from 'moment'
import 'moment/locale/ru'

moment.locale('ru')

type Props = {
    user: Awaited<ReturnType<typeof userService.getUserById>>
}

const ProfileCard = ({ user }: Props) => {
    return (
        <div className="grid grid-cols-3 gap-20">
            <div className="px-2 flex flex-col items-center">
                <img
                    className="inline-flex object-cover border-4 border-primary rounded-full shadow-[5px_5px_0_0_rgba(0,0,0,1)] shadow-[#FE5F00]/100 bg-indigo-50 text-indigo-600 h-24 w-24 !h-48 !w-48"
                    src={user?.avatar || '/static/user-round.svg'}
                    alt=""
                />
                <div className="text-2xl text-gray-500 font-bold mt-2 flex gap-2 items-center">
                    <span>{user?.username}</span> <CheckCircle className="text-green-500" />
                </div>
                <h2 className="text-base md:text-xl text-gray-500 font-bold">{user?.email}</h2>
            </div>
            <div className="col-span-2 flex flex-col justify-between gap-6">
                <div className="text-2xl md:text-3xl text-gray-500 font-bold mb-5 flex gap-2 items-center">
                    <BookType size={30} />
                    <span>Дополнительная информация</span>
                </div>
                <div className="flex flex-col gap-8">
                    <div className="text-base md:text-xl text-gray-500 font-bold flex items-center gap-1">
                        <Calendar />
                        Способ подклчения - {user?.provider ? user.provider.toUpperCase() : 'Email'}
                    </div>
                    <div className="text-base md:text-xl text-gray-500 font-bold flex items-center gap-1">
                        <CalendarFold /> Дата регистрации - {moment(user?.createdAt).calendar()}
                    </div>
                    <div className="text-base md:text-xl text-gray-500 font-bold flex items-center gap-1">
                        <CheckCheckIcon className="text-green-500" />{' '}
                        <span>Аккаунт верифицирован - </span>
                        {moment(user?.verifiedAt).fromNow()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileCard
