'use server';

import { Resend } from 'resend';
import { Redis } from '@upstash/redis';

const resend = new Resend(process.env.RESEND_API_KEY);

const FALLBACK_TO_EMAIL = process.env.BOOKING_RECIPIENT_EMAIL ?? 'solupro@outlook.fr';
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? 'Bookings <rentacar@solupro.ltd>';

export type SendEmailResult =
    | {
    success: true;
    id: string | null;
    to: string;
    from: string;
    source: 'redis' | 'fallback';
    redisNote?: string;
}
    | {
    success: false;
    error: string;
    to: string;
    from: string;
    source: 'redis' | 'fallback';
    redisNote?: string;
};

async function getRecipientFromRedis(): Promise<{ value: string | null; note?: string }> {
    const url = process.env.UPSTASH_REDIS_REST_URL?.trim() ?? '';
    const token = process.env.UPSTASH_REDIS_REST_TOKEN?.trim() ?? '';

    if (url.length === 0 || token.length === 0) {
        return { value: null, note: 'Redis env vars missing' };
    }

    const redis = Redis.fromEnv();
    let timer: ReturnType<typeof setTimeout> | undefined;

    try {
        const timeoutPromise = new Promise<never>((_, reject) => {
            timer = setTimeout(() => reject(new Error('Redis timed out after 1500ms')), 1500);
        });

        const value = await Promise.race([
            redis.get<string>('booking:recipient_email'),
            timeoutPromise,
        ]);

        return { value };
    } catch (err) {
        const msg = err instanceof Error ? err.message : 'Unknown Redis error';
        console.error('[sendEmail] Redis lookup failed:', msg);
        return { value: null, note: msg };
    } finally {
        if (timer !== undefined) clearTimeout(timer);
    }
}

export const sendEmail = async (
    subject: string,
    message: string
): Promise<SendEmailResult> => {
    const { value: recipient, note: redisNote } = await getRecipientFromRedis();

    const trimmed = recipient?.trim() ?? '';
    const hasRedisEmail = trimmed.length > 0;
    const to = hasRedisEmail ? trimmed : FALLBACK_TO_EMAIL;
    const source = hasRedisEmail ? 'redis' : 'fallback';

    console.log('[sendEmail] Attempting send:', { to, from: FROM_EMAIL, source, redisNote, subject });

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
                redisNote,
            };
        }

        console.log('[sendEmail] Sent successfully:', { id: data?.id, to, source });
        return {
            success: true,
            id: data?.id ?? null,
            to,
            from: FROM_EMAIL,
            source,
            redisNote,
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
            redisNote,
        };
    }
};