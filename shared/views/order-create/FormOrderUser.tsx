import React from 'react'
import OrderCard from './OrderCard'
import AccountInput from '../profile/account/AccountInput'
import { Controller } from 'react-hook-form'
import { Divide } from 'lucide-react'
import ErrorMessage from '@/shared/components/common/ErrorMessage'

type Props = {}

const FormOrderUser = (props: Props) => {
    return (
        <OrderCard title="2. Контактные данные">
            <div className=" grid grid-cols-2 mt-20 gap-10">
                <div className="flex flex-col gap-10">
                    <div className="flex flex-col gap-2">
                        <span className="font-bold text-sm">Имя</span>
                        <Controller
                            name="name"
                            render={({ field, fieldState: { error, invalid } }) => (
                                <div>
                                    <AccountInput {...field} invalid={invalid} />
                                    <ErrorMessage error={error} />
                                </div>
                            )}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <span className="font-bold text-sm">E-Mail</span>
                        <Controller
                            name="email"
                            render={({ field, fieldState: { error, invalid } }) => (
                                <div>
                                    <AccountInput {...field} invalid={invalid} />
                                    <ErrorMessage error={error} />
                                </div>
                            )}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-10">
                    <div className="flex flex-col gap-2">
                        <span className="font-bold text-sm">Фамилия</span>
                        <Controller
                            name="lastName"
                            render={({ field, fieldState: { error, invalid } }) => (
                                <div>
                                    <AccountInput {...field} invalid={invalid} />
                                    <ErrorMessage error={error} />
                                </div>
                            )}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <span className="font-bold text-sm">Телефон</span>
                        <Controller
                            name="phone"
                            render={({ field, fieldState: { error, invalid } }) => (
                                <div>
                                    <AccountInput {...field} invalid={invalid} />
                                    <ErrorMessage error={error} />
                                </div>
                            )}
                        />
                    </div>
                </div>
            </div>
        </OrderCard>
    )
}

export default FormOrderUser
