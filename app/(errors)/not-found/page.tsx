import ErrorComponent from '@/shared/components/common/ErrorComponent'
import React from 'react'

const NotFoundPage = () => {
    return (
        <ErrorComponent
            title="Страница не найдена"
            body="Данную страницу могут просматривать только авторизованные пользователи"
            imagePath="/static/not-found.svg"
        />
    )
}

export default NotFoundPage
