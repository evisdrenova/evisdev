import { NextResponse } from "next/server";
import { Resend } from "resend";
import WelcomeEmail from "@/components/EmailTemplates/WelcomeEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const { email, firstName } = await request.json();

        if (!email || typeof email !== "string") {
            return NextResponse.json(
                { error: "Missing or invalid email." },
                { status: 400 }
            );
        }

        resend.contacts.create({
            email: email,
            unsubscribed: false,
            audienceId: '381adab9-66ec-42a3-851e-2d706c644d60',
        });


        const { data, error } = await resend.emails.send({
            from: "Evis <news@evis.dev>",
            to: [email],
            subject: "Thank you for subscribing!",
            react: WelcomeEmail({ firstName }),
        });

        if (error) {
            return NextResponse.json(
                { error: error.message ?? "Email send failed." },
                { status: 502 }
            );
        }

        return NextResponse.json({ ok: true, id: data?.id ?? null });
    } catch (err: unknown) {
        const msg =
            err instanceof Error ? err.message : "Unexpected server error.";
        return NextResponse.json({ error: msg }, { status: 500 });
    }
}
