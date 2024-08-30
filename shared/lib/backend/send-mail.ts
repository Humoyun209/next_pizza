import { EmailTemplate } from '@/shared/components/common/EmailTemplate'
import { Resend } from 'resend'

export const sendMail = async (to: string[], subject: string, title: string, body: string) => {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const { data, error } = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: to,
        subject: subject,
        react: EmailTemplate({ title, body }),
    })

    if (error) {
        console.log('EMAIL ERROR', error.message)
    }

    return data
}
