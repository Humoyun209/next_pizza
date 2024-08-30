import React from 'react'

type Props = {
    clasName?: string
    error?: {
        message?: string
    }
}

const ErrorMessage = ({ error, clasName }: Props) => {
    return error && <span className="mt-1 text-xs text-red-500">{error.message}</span>
}

export default ErrorMessage
