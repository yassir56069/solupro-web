'use server';

import { Resend } from 'resend';
import { Redis } from '@upstash/redis';

const resend = new Resend(process.env.RESEND_API_KEY);
const redis = Redis.fromEnv();

const FALLBACK_TO_EMAIL = process.env.BOOKING_RECIPIENT_EMAIL ?? 'solupro@outlook.fr';
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? 'Bookings <rentacar@solupro.ltd>';

export const sendEmail = async (subject: string, message: string) => {
    let recipient: string | null = null;

    try {
        recipient = await redis.get<string>('booking:recipient_email');
    } catch (err) {
        console.error('Redis lookup failed, using fallback email:', err);
    }

    const trimmed = recipient?.trim() ?? '';
    const to = trimmed.length > 0 ? trimmed : FALLBACK_TO_EMAIL;

    const { data, error } = await resend.emails.send({
        to,
        from: FROM_EMAIL,
        subject,
        html: message,
    });

    if (error) {
        console.error('Resend error:', error);
        throw new Error(`Failed to send booking email: ${error.message}`);
    }

    return data;
};