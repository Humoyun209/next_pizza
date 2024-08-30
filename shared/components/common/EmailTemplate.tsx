import React from 'react'

interface EmailTemplateProps {
    title: string
    body: string
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({ title, body }) => (
    <div>
        <h1>{title}</h1>
        <p dangerouslySetInnerHTML={{ __html: body }}></p>
    </div>
)
