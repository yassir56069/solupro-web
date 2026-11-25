'use server';

import { Resend } from 'resend';
import { Redis } from '@upstash/redis';

const resend = new Resend(process.env.RESEND_API_KEY);
const redis = Redis.fromEnv();

const FALLBACK_TO_EMAIL = process.env.BOOKING_RECIPIENT_EMAIL ?? 'solupro@outlook.fr';
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? 'Bookings <rentacar@solupro.ltd>';

export type SendEmailResult =
    | {
    success: true;
    id: string | null;
    to: string;
    from: string;
    source: 'redis' | 'fallback';
}
    | {
    success: false;
    error: string;
    to: string;
    from: string;
    source: 'redis' | 'fallback';
};

export const sendEmail = async (
    subject: string,
    message: string
): Promise<SendEmailResult> => {
    let recipient: string | null = null;

    try {
        recipient = await redis.get<string>('booking:recipient_email');
    } catch (err) {
        console.error('[sendEmail] Redis lookup failed, using fallback email:', err);
    }

    const trimmed = recipient?.trim() ?? '';
    const hasRedisEmail = trimmed.length > 0;
    const to = hasRedisEmail ? trimmed : FALLBACK_TO_EMAIL;
    const source = hasRedisEmail ? 'redis' : 'fallback';

    console.log('[sendEmail] Attempting send:', { to, from: FROM_EMAIL, source, subject });

    try {
        const { data, error } = await resend.emails.send({
            to,
            from: FROM_EMAIL,
            subject,
            html: message,
        });

        if (error) {
            console.error('[sendEmail] Resend API error:', error);
            return {
                success: false,
                error: error.message,
                to,
                from: FROM_EMAIL,
                source,
            };
        }

        console.log('[sendEmail] Sent successfully:', { id: data?.id, to, source });
        return {
            success: true,
            id: data?.id ?? null,
            to,
            from: FROM_EMAIL,
            source,
        };
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error sending email';
        console.error('[sendEmail] Unexpected exception:', err);
        return {
            success: false,
            error: errorMessage,
            to,
            from: FROM_EMAIL,
            source,
        };
    }
};