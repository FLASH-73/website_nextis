import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
    try {
        const { email } = await request.json();

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        // If API key is not set, just log it (for dev/demo purposes)
        if (!process.env.RESEND_API_KEY) {
            console.log('Waitlist Signup (Simulated):', email);
            return NextResponse.json({ success: true, message: 'Simulated signup successful' });
        }

        // Send email to the site owner (using the Verified Domain "onboarding@resend.dev" for testing if no domain set)
        // In production, user should set up their own domain in Resend
        // 1. Send notification to developer
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: 'robedela1@gmail.com',
            subject: 'New Waitlist Signup',
            html: `<p>New user joined the waitlist: <strong>${email}</strong></p>`
        });

        // 2. Add to Resend Audience (Collection List)
        // This allows you to see the list of emails in your Resend Dashboard > Audiences
        if (process.env.RESEND_AUDIENCE_ID) {
            try {
                await resend.contacts.create({
                    email: email,
                    audienceId: process.env.RESEND_AUDIENCE_ID,
                });
            } catch (contactsError) {
                console.error('Failed to add to contacts:', contactsError);
                // Don't fail the request if just the contact add fails, the email notification still worked
            }
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Waitlist error:', error);
        return NextResponse.json({ error: 'Failed to join waitlist' }, { status: 500 });
    }
}
