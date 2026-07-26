import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature') || '';

  let event: any;

  try {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (webhookSecret) {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } else {
      event = JSON.parse(body);
    }
  } catch (err: any) {
    console.error(`Webhook Signature Verification Failed: ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Handle successful checkout event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const customerEmail = session.customer_email || session.metadata?.email;
    const amountTotal = (session.amount_total || 700) / 100;

    if (customerEmail) {
      try {
        // Upsert user profile & mark paid
        const profile = await prisma.userProfile.upsert({
          where: { email: customerEmail },
          update: { isPaid: true, lastActiveAt: new Date() },
          create: { email: customerEmail, isPaid: true }
        });

        // Record purchase transaction
        await prisma.purchase.create({
          data: {
            profileId: profile.id,
            amount: amountTotal,
            productType: '7_DAY_PDF',
            status: 'COMPLETED'
          }
        });

        // Trigger automatic PDF email delivery via Resend or SMTP if configured
        const resendApiKey = process.env.RESEND_API_KEY;
        if (resendApiKey) {
          await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${resendApiKey}`
            },
            body: JSON.stringify({
              from: 'MoodFlip <deliveries@moodflip.coach>',
              to: [customerEmail],
              subject: '💫 Your Personalized MoodFlip 7-Day Mindset Plan is Ready!',
              html: `
                <div style="font-family: sans-serif; padding: 20px; color: #1e1b4b;">
                  <h2>Thank you for your MoodFlip purchase!</h2>
                  <p>Your personalized 7-Day Mindset PDF Plan has been generated based on your saved mood check-ins.</p>
                  <p><a href="https://moodflip.coach/api/pdf?email=${encodeURIComponent(customerEmail)}" style="background: #8b5cf6; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block;">📥 Download Your 7-Day PDF Plan</a></p>
                  <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 30px 0;" />
                  <p style="font-size: 12px; color: #64748b;">MoodFlip is a self-reflection utility. Not therapy or medical advice.</p>
                </div>
              `
            })
          }).catch(err => console.error('Failed to send Resend email:', err));
        }

      } catch (dbErr) {
        console.error('Failed to record purchase in database:', dbErr);
      }
    }
  }

  return NextResponse.json({ received: true });
}
