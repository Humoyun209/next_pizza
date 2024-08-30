'use client'
import React, { useEffect, useRef, useState } from 'react'
import AccountInput from './AccountInput'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'
import ButtonWithLoading from '@/shared/components/common/ButtonWithLoading'
import { userService } from '@/app/api/users/users.service'
import { BASE_API } from '@/shared/lib/utils'

type Props = {}
type TCurrentUser = Awaited<ReturnType<typeof userService.getUserById>>

const ChangeForm = (props: Props) => {
    const session = useSession()
    const ref = useRef<HTMLInputElement>(null)
    const [currentUser, setCurrentUser] = useState<TCurrentUser | null>(null)
    useEffect(() => {
        fetch(BASE_API + '/users/current')
            .then(res => res.json())
            .then(data => {
                setCurrentUser(data)
                setUsername(data.username)
            })
    }, [])
    const [username, setUsername] = useState(session.data?.user?.username || '')
    const [uploadImage, setUploadImage] = useState<File | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (uploadImage || username != currentUser?.username) {
            setLoading(true)
            const formData = new FormData()
            formData.append('avatar', uploadImage ? uploadImage : '')
            formData.append('username', username)
            const response = await fetch(BASE_API + '/users/change', {
                method: 'POST',
                body: formData,
            })

            const data = await response.json()
            console.log(data)
            setLoading(false)
            if (response.ok) {
                toast.success('Аккаунт успешно обновлен')
            } else {
                toast.error('Произошла ошибка при обновлении аккаунта')
            }
        } else {
            toast.error('Хоть что-то не измените!')
        }
    }
    return (
        <form autoComplete="off" onSubmit={submitHandler}>
            <div className="bg-slate-100 rounded-lg py-10 flex flex-col gap-3 items-center justify-center">
                <img
                    onClick={() => ref.current?.click()}
                    className="rounded-full w-[150px] h-[150px] border-dashed border-2 border-secondary p-2 cursor-pointer"
                    src={
                        uploadImage
                            ? URL.createObjectURL(uploadImage)
                            : currentUser?.avatar || '/static/user-round.svg'
                    }
                    alt=""
                />
                <div className="ml-5 text-sm text-secondary-text max-w-[400px]">
                    <p className="text-center">
                        Вы можете загрузить свой аватар, для этого нажмите на провил, размер
                        изображения должен быть не больше 2000x2000
                    </p>
                </div>
                <input
                    onChange={e => setUploadImage(e.target.files?.[0] || null)}
                    ref={ref}
                    type="file"
                    className="hidden"
                    accept=".jpg, .jpeg, .png"
                    name=""
                />
            </div>
            <div className="flex justify-between gap-10 items-center mt-5">
                <AccountInput
                    name="username"
                    placeholder="Имя пользователя"
                    autoComplete="off"
                    value={username}
                    readOnly={loading}
                    onChange={e => setUsername(e.target.value)}
                />
                <ButtonWithLoading loading={loading} size="lg" variant="outline">
                    Сохранить
                </ButtonWithLoading>
            </div>
        </form>
    )
}

export default ChangeForm
