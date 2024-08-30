import React from 'react'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/shared/components/ui/breadcrumb'
import Sidebar from './Sidebar'

type Props = {}

const Profile = (props: Props) => {
    return (
        <>
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
            <div className="grid grid-cols-5 gap-10">
                <Sidebar />
                <div className="col-span-4"></div>
            </div>
        </>
    )
}

export default Profile
