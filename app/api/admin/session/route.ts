import { NextResponse } from 'next/server';
import {
  ADMIN_COOKIE_NAME,
  adminAuthIsConfigured,
  createAdminSessionValue,
  hasValidAdminSession,
} from '@/lib/adminAuth';

export async function GET(request: Request) {
  return NextResponse.json({ authenticated: hasValidAdminSession(request) });
}

export async function POST(request: Request) {
  if (!adminAuthIsConfigured()) {
    return NextResponse.json({ error: 'Admin access is not configured.' }, { status: 503 });
  }

  const body = await request.json().catch(() => ({}));
  if (String(body.password || '') !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Incorrect admin password.' }, { status: 401 });
  }

  const response = NextResponse.json({ authenticated: true });
  response.cookies.set(ADMIN_COOKIE_NAME, createAdminSessionValue(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 8,
  });
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ authenticated: false });
  response.cookies.set(ADMIN_COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 0,
  });
  return response;
}
