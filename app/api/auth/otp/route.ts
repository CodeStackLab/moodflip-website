import { NextResponse } from 'next/server';

// Simple in-memory store for OTPs (for production serverless, can use DB or Redis)
const otpStore: Record<string, { code: string; expiresAt: number }> = {};

export async function POST(req: Request) {
  try {
    const { action, email, code } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email address is required' }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();

    if (action === 'send') {
      // Generate a 6-digit OTP code
      const generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
      const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes expiry

      otpStore[normalizedEmail] = { code: generatedCode, expiresAt };

      console.log(`[OTP SENT] Email: ${normalizedEmail}, Code: ${generatedCode}`);

      return NextResponse.json({
        success: true,
        message: `Verification code sent to ${normalizedEmail}`,
        // Included for seamless testing in demo/preview
        demoOtp: generatedCode
      });
    }

    if (action === 'verify') {
      const record = otpStore[normalizedEmail];

      if (!record) {
        return NextResponse.json({ error: 'No verification code found. Please request a new code.' }, { status: 400 });
      }

      if (Date.now() > record.expiresAt) {
        delete otpStore[normalizedEmail];
        return NextResponse.json({ error: 'Verification code expired. Please request a new code.' }, { status: 400 });
      }

      if (record.code !== code?.trim()) {
        return NextResponse.json({ error: 'Invalid 6-digit verification code. Please check your email and try again.' }, { status: 400 });
      }

      // Valid OTP
      delete otpStore[normalizedEmail];
      return NextResponse.json({ success: true, message: 'Email verified successfully!' });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (err) {
    console.error('OTP API error:', err);
    return NextResponse.json({ error: 'Failed to process OTP request' }, { status: 500 });
  }
}
