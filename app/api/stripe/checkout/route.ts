import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(req: Request) {
  try {
    const { email, planType = '7_DAY_PDF' } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required for checkout' }, { status: 400 });
    }

    const origin = req.headers.get('origin') || 'https://moodflip.coach';

    // If Stripe secret key is unconfigured (test mode fallback)
    if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY.includes('mock')) {
      return NextResponse.json({
        url: `${origin}/profile?success=true&demo=true&email=${encodeURIComponent(email)}`
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'MoodFlip 7-Day Personalized Mindset PDF Plan',
              description: 'Custom 7-day action guide created from your saved mood check-ins.',
              images: ['https://moodflip.coach/icon.svg'],
            },
            unit_amount: 700, // US$ 7.00
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
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Stripe Checkout Error:', error);
    return NextResponse.json({ error: error.message || 'Checkout failed' }, { status: 500 });
  }
}
