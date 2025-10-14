
import WelcomeEmail from '@/components/EmailTemplates/WelcomeEmail';
import { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextApiRequest, res: NextApiResponse) {


    try {
        const { data, error } = await resend.emails.send({
            from: 'Evis <evis.dev>',
            to: ['evisdrenova@gmail.com'],
            subject: 'Thank you for subscribing',
            react: WelcomeEmail({ firstName: req.body.firstName }),
        });

        if (error) {
            return Response.json({ error }, { status: 500 });
        }

        return Response.json(data);
    } catch (error) {
        return Response.json({ error }, { status: 500 });
    }
}