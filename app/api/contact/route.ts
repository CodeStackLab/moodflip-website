import { NextResponse } from 'next/server';

const attempts = new Map<string, number[]>();

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const now = Date.now();
  const recent = (attempts.get(ip) || []).filter((timestamp) => now - timestamp < 60 * 60 * 1000);
  if (recent.length >= 5) {
    return NextResponse.json({ error: 'Too many messages. Please try again later.' }, { status: 429 });
  }

  const body = await request.json().catch(() => ({}));
  if (body.honeypot) return NextResponse.json({ sent: true });
  const name = String(body.name || '').trim().slice(0, 100);
  const email = String(body.email || '').trim().toLowerCase().slice(0, 254);
  const message = String(body.message || '').trim().slice(0, 4000);
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.length < 10) {
    return NextResponse.json({ error: 'Please provide a valid name, email, and message.' }, { status: 400 });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const contactEmail = process.env.CONTACT_EMAIL;
  if (!resendApiKey || !contactEmail) {
    return NextResponse.json({ error: 'Contact email is temporarily unavailable. Please try again later.' }, { status: 503 });
  }

  recent.push(now);
  attempts.set(ip, recent);
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${resendApiKey}`,
    },
    body: JSON.stringify({
      from: process.env.RESEND_FROM_EMAIL || 'MoodFlip <contact@moodflip.coach>',
      to: [contactEmail],
      reply_to: email,
      subject: `MoodFlip contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    }),
  });
  if (!response.ok) {
    return NextResponse.json({ error: 'Message delivery failed. Please try again later.' }, { status: 502 });
  }
  return NextResponse.json({ sent: true });
}
