import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json(
    { error: 'Legacy OTP endpoint retired. MoodFlip now uses Supabase Auth email verification.' },
    { status: 410 },
  );
}
