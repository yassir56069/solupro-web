'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async(subject:any,message:any) => {
    await resend.emails.send({
        to: "solupro.reservations@gmail.com",
        from: "solupro.ltd",
        subject: subject,
        html: message
    })
}