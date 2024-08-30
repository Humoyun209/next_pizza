import { cn } from '@/shared/lib/utils'
import React from 'react'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode
    active: boolean
    disabled: boolean
}

const FilterButton = (props: Props) => {
    return (
        <button
            {...props}
            disabled={props.disabled}
            className={cn(
                'text-dark rounded-[30px] py-2 disabled:text-secondary-text disabled:bg-gray-200',
                props.active && 'bg-white  shadow-md',
            )}
        >
            {props.children}
        </button>
    )
}

export default FilterButton
