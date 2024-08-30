import ErrorComponent from '@/shared/components/common/ErrorComponent'
import React from 'react'

function ForbiddenPage() {
    return (
        <ErrorComponent
            title="Доступ запрещён"
            body="Данную страницу могут просматривать только авторизованные пользователи"
            imagePath="/static/forbidden.svg"
        />
    )
}

export default ForbiddenPage
