import { cn } from '@/shared/lib/utils'
import { invalid } from 'moment'
import React, { forwardRef } from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string
    invalid?: boolean
}

const AccountInput = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    return (
        <input
            ref={ref}
            {...props}
            name={props.name}
            className={cn(
                'h-min w-full py-2 px-4 rounded-sm border-2 border-gray-300 focus-within:border-2 focus-within:border-gray-500 outline-none',
                props.invalid && 'border-red-500 ',
            )}
        />
    )
})

export default AccountInput
