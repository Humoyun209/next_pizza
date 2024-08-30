import React from 'react'

type Props = {
    children: React.ReactNode
    modal: React.ReactNode
}

const LayoutHome = ({ children, modal }: Props) => {
    return (
        <main className="my-5">
            {children}
            {modal}
        </main>
    )
}

export default LayoutHome
