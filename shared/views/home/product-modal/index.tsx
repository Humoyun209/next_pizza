'use client'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from '@/shared/components/ui/dialog'
import { useRouter } from 'next/navigation'

type Props = {
    children: React.ReactNode
}

const ProductModalDialog = ({ children }: Props) => {
    const router = useRouter()
    return (
        <Dialog open onOpenChange={() => router.back()}>
            <DialogContent className="p-0 max-w-[1000px] gap-0 bg-transparent rounded-none shadow-none border-none grid grid-cols-1 md:grid-cols-2">
                <DialogTitle className="hidden"></DialogTitle>
                <DialogDescription className="hidden"></DialogDescription>
                {children}
            </DialogContent>
        </Dialog>
    )
}

export default ProductModalDialog
