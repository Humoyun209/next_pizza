import { z } from 'zod'

export const orderSchema = z.object({
    name: z.string().min(3, { message: 'Необходимо указать имя!' }),
    lastName: z.string().min(3, { message: 'Необходимо указать фамилию!' }),
    phone: z.string().min(9, { message: 'Необходимо указать телефон!' }),
    email: z.string().email({ message: 'Не валидный email!' }),
    address: z.string().min(3, { message: 'Необходимо указать адрес!' }),
    comment: z.string().optional(),
})

export type TOrderSchema = z.infer<typeof orderSchema>
