'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async(subject:any,message:any) => {
    await resend.emails.send({
        to: "rentacar@solupro.ltd",
        from: "rentacar@solupro.ltd",
        subject: subject,
        html: message
    })
}