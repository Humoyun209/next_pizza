'use client'
import React, { useState } from 'react'
import OrderCard from './OrderCard'
import AccountInput from '../profile/account/AccountInput'
import { Controller } from 'react-hook-form'
import ErrorMessage from '@/shared/components/common/ErrorMessage'
import { AddressSuggestions } from 'react-dadata'
import 'react-dadata/dist/react-dadata.css'

type Props = {}

const FormDelivery = (props: Props) => {
    return (
        <OrderCard title="3. Доставка">
            <div className="flex flex-col mt-20 gap-6">
                <div className="flex flex-col gap-2">
                    <span className="font-bold text-sm">Введите адрес</span>
                    <Controller
                        name="address"
                        render={({ field, fieldState: { error, invalid } }) => (
                            <div className="relative">
                                <AddressSuggestions
                                    {...field}
                                    onChange={data => {
                                        field.onChange(data?.value)
                                    }}
                                    defaultQuery="Москва Город"
                                    token="cbf3defc4cd51f4371b7055cf8aa1d88ed97f3ed"
                                    customInput={AccountInput}
                                />
                                <ErrorMessage error={error} />
                            </div>
                        )}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <span className="font-bold text-sm">Комментарий к заказу</span>
                    <textarea
                        className="rounded-md outline-none border-2 border-gray-300 py-2 px-4 focus-within:border-gray-500"
                        name="comment"
                        rows={5}
                    />
                </div>
            </div>
        </OrderCard>
    )
}

export default FormDelivery
