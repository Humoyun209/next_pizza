'use client'
import React, { useState } from 'react'
import AccountInput from './AccountInput'
import { Button } from '@/shared/components/ui/button'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { BASE_URL } from '@/shared/lib/fetcher'
import toast from 'react-hot-toast'
import ButtonWithLoading from '@/shared/components/common/ButtonWithLoading'

const SPassword = z.string().min(4, { message: 'Длина пароля минимум 4 символов!' }).max(20, {
    message: 'Длина пароля максимум 20 смиволов',
})
const changePasswordSchema = z
    .object({
        currentPassword: SPassword,
        newPassword: SPassword,
        confirmPassword: SPassword,
    })
    .refine(data => data.newPassword === data.confirmPassword, {
        message: 'Пароли не совпадают',
        path: ['confirmPassword'],
    })

type TChangePassword = z.infer<typeof changePasswordSchema>
const ChangePassword = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const form = useForm<TChangePassword>({
        mode: 'onChange',
        resolver: zodResolver(changePasswordSchema),
        defaultValues: {
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        },
    })
    const handleSubmit = async (data: TChangePassword) => {
        setLoading(true)
        const res = await fetch(`${BASE_URL}/users/change-password`, {
            body: JSON.stringify(data),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if (res.ok) {
            form.reset()
            toast.success('Пароль успешно изменен')
        } else {
            const data = await res.json()
            toast.error(`Произошла ошибка - ${data.message}`)
        }
        setLoading(false)
    }
    return (
        <div className="grid-cols-2 grid my-20 gap-10">
            <div className="items-center justify-center flex">
                <img src="/static/forbidden.svg" alt="" />
            </div>
            <FormProvider {...form}>
                <form
                    className="flex flex-col justify-between"
                    onSubmit={form.handleSubmit(handleSubmit)}
                >
                    <h1 className="text-4xl font-bold text-center">Изменение пароля</h1>
                    <Controller
                        name="currentPassword"
                        render={({ field, fieldState: { error } }) => (
                            <div>
                                <AccountInput
                                    {...field}
                                    type="password"
                                    placeholder="Текущий пароль"
                                />
                                {error && <p className="text-red-500 text-xs">{error.message}</p>}
                            </div>
                        )}
                    />
                    <Controller
                        name="newPassword"
                        render={({ field, fieldState: { error } }) => (
                            <div>
                                <AccountInput
                                    {...field}
                                    type="password"
                                    placeholder="Новый пароль"
                                />
                                {error && <p className="text-red-500 text-xs">{error.message}</p>}
                            </div>
                        )}
                    />

                    <Controller
                        name="confirmPassword"
                        render={({ field, fieldState: { error } }) => (
                            <div>
                                <AccountInput
                                    {...field}
                                    type="password"
                                    placeholder="Подтвердите пароль"
                                />
                                {error && <p className="text-red-500  text-xs">{error.message}</p>}
                            </div>
                        )}
                    />
                    <ButtonWithLoading loading={loading} className="h-12" size="lg">
                        Сохранить
                    </ButtonWithLoading>
                </form>
            </FormProvider>
        </div>
    )
}

export default ChangePassword
