'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async(subject:any,message:any) => {
    await resend.emails.send({
        to: "hoossanbukshyassir@gmail.com",
        from: "Solupro <Solupro.mu>",
        subject: subject,
        html: message
    })
}