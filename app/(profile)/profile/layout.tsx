import React from 'react'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/shared/components/ui/breadcrumb'
import Sidebar from '@/shared/views/profile/Sidebar'
import Container from '@/shared/components/ui/container'
import Header from '@/shared/views/home/header/Header'

type Props = {
    children: React.ReactNode
}

const LayoutProfile = ({ children }: Props) => {
    return (
        <main className="my-5">
            <Header />
            <Container>
                <Breadcrumb className="py-12">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">Главная</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Профиль</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <div className="grid grid-cols-4 gap-10">
                    <Sidebar />
                    <div className="col-span-3">{children}</div>
                </div>
            </Container>
        </main>
    )
}

export default LayoutProfile
