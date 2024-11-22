'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async(subject:any,message:any) => {
    await resend.emails.send({
        to: "solupro@outlook.fr",
        from: "OrcDev <onboarding@resend.dev>",
        subject: subject,
        html: message
    })
}