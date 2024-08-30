import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/shared/components/ui/alert-dialog'

type Props = {
    open: boolean
    setOpen: (value: boolean) => void
}

const SendCodeAlert = ({ open, setOpen }: Props) => {
    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent className="bg-white">
                <AlertDialogHeader>
                    <AlertDialogTitle>Вам отправлен код</AlertDialogTitle>
                    <AlertDialogDescription>
                        Пожалуйста, проверьте свой почтовый ящик. Если вы не получили код, проверьте
                        папку "Спам".
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction>Хорошо</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default SendCodeAlert
