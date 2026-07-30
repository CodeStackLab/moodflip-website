import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedUser } from '@/lib/serverAuth';

export async function POST(req: Request) {
  try {
    const user = await getAuthenticatedUser(req);
    if (!user) return NextResponse.json({ error: 'Please sign in before checkout.' }, { status: 401 });
    const { planType = '7_DAY_PDF' } = await req.json();
    if (!['7_DAY_PDF', '30_DAY_PDF'].includes(planType)) {
      return NextResponse.json({ error: 'Invalid plan.' }, { status: 400 });
    }
    const email = user.email;

    const profile = await prisma.userProfile.findUnique({
      where: { email },
      select: { id: true },
    });
    if (!profile) return NextResponse.json({ error: 'Profile not found.' }, { status: 404 });

    const requiredDays = planType === '30_DAY_PDF' ? 30 : 7;
    const savedDays = await prisma.$queryRaw<Array<{ days: bigint }>>`
      SELECT COUNT(DISTINCT DATE("createdAt"))::bigint AS days
      FROM "user_checkins"
      WHERE "profileId" = ${profile.id}
    `;
    const calendarDays = Number(savedDays[0]?.days || 0);
    if (calendarDays < requiredDays) {
      return NextResponse.json({
        error: `Your report becomes available after check-ins across ${requiredDays} calendar days. Current progress: ${calendarDays}/${requiredDays}.`,
      }, { status: 409 });
    }

    const origin = req.headers.get('origin') || 'https://moodflip.coach';

    if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY.includes('mock')) {
      return NextResponse.json({ error: 'Secure checkout is temporarily unavailable.' }, { status: 503 });
    }

    const is30Day = planType === '30_DAY_PDF';
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `MoodFlip ${is30Day ? '30-Day' : '7-Day'} Personalised Mood Report`,
              description: `Personalised report created from your saved MoodFlip check-ins across ${requiredDays} calendar days.`,
              images: ['https://moodflip.coach/icon.svg'],
            },
            unit_amount: is30Day ? 1900 : 700,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/profile?session_id={CHECKOUT_SESSION_ID}&success=true`,
      cancel_url: `${origin}/?canceled=true`,
      metadata: {
        email,
        planType,
        profileId: profile.id,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Stripe Checkout Error:', error);
    return NextResponse.json({ error: error.message || 'Checkout failed' }, { status: 500 });
  }
}
