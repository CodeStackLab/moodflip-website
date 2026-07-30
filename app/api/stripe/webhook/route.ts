import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error('Stripe webhook rejected because STRIPE_WEBHOOK_SECRET is not configured.');
    return NextResponse.json({ error: 'Webhook is not configured.' }, { status: 503 });
  }

  const body = await req.text();
  const signature = req.headers.get('stripe-signature') || '';

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Invalid signature';
    console.error(`Stripe webhook signature verification failed: ${message}`);
    return NextResponse.json({ error: 'Invalid webhook signature.' }, { status: 400 });
  }

  if (event.type !== 'checkout.session.completed') {
    return NextResponse.json({ received: true });
  }

  const session = event.data.object;
  const customerEmail = (session.customer_details?.email || session.customer_email || session.metadata?.email || '')
    .trim()
    .toLowerCase();
  const planType = session.metadata?.planType === '30_DAY_PDF' ? '30_DAY_PDF' : '7_DAY_PDF';

  if (!customerEmail || session.payment_status !== 'paid') {
    return NextResponse.json({ error: 'Paid customer details are incomplete.' }, { status: 400 });
  }

  try {
    const profile = await prisma.userProfile.upsert({
      where: { email: customerEmail },
      update: { isPaid: true, lastActiveAt: new Date() },
      create: { email: customerEmail, isPaid: true },
      select: { id: true },
    });

    const downloadUrl = `https://moodflip.coach/api/pdf?session_id=${encodeURIComponent(session.id)}`;
    const existingPurchase = await prisma.purchase.findFirst({ where: { pdfUrl: downloadUrl } });
    const purchase = existingPurchase || await prisma.purchase.create({
      data: {
        profileId: profile.id,
        amount: (session.amount_total || (planType === '30_DAY_PDF' ? 1900 : 700)) / 100,
        productType: planType,
        status: 'COMPLETED',
        pdfUrl: downloadUrl,
      },
    });

    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      await prisma.purchase.update({
        where: { id: purchase.id },
        data: {
          status: 'COMPLETED_DELIVERY_PENDING',
        },
      });
      return NextResponse.json({ received: true, delivery: 'pending_configuration' });
    }

    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM_EMAIL || 'MoodFlip <deliveries@moodflip.coach>',
        to: [customerEmail],
        subject: `Your personalised MoodFlip ${planType === '30_DAY_PDF' ? '30-Day' : '7-Day'} report is ready`,
        html: `
          <div style="font-family:Arial,sans-serif;padding:24px;color:#1e1b4b">
            <h2>Thank you for your MoodFlip purchase</h2>
            <p>Your personalised report is ready from your saved check-ins.</p>
            <p><a href="${downloadUrl}" style="background:#7c54d1;color:#fff;padding:12px 22px;border-radius:8px;text-decoration:none;font-weight:700">Download your report</a></p>
            <p style="font-size:12px;color:#64748b">MoodFlip is a self-reflection utility, not therapy or medical advice.</p>
          </div>
        `,
      }),
    });

    if (!emailResponse.ok) {
      await prisma.purchase.update({
        where: { id: purchase.id },
        data: { status: `COMPLETED_DELIVERY_FAILED_${emailResponse.status}` },
      });
      return NextResponse.json({ received: true, delivery: 'failed' });
    }

    await prisma.purchase.update({
      where: { id: purchase.id },
      data: {
        status: 'COMPLETED_DELIVERED',
      },
    });
    return NextResponse.json({ received: true, delivery: 'sent' });
  } catch (error) {
    console.error('Stripe purchase processing failed:', error);
    return NextResponse.json({ error: 'Purchase processing failed.' }, { status: 500 });
  }
}
