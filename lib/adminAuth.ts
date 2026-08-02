import { createHmac, timingSafeEqual } from 'crypto';

export const ADMIN_COOKIE_NAME = 'moodflip_admin_session';

function signingSecret() {
  return `${process.env.ADMIN_PASSWORD || ''}:${process.env.CRON_SECRET || ''}`;
}

export function adminAuthIsConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD && process.env.CRON_SECRET);
}

export function createAdminSessionValue() {
  return createHmac('sha256', signingSecret()).update('moodflip-admin-v1').digest('hex');
}

export function hasValidAdminSession(request: Request) {
  if (!adminAuthIsConfigured()) return false;
  const cookieHeader = request.headers.get('cookie') || '';
  const cookies = Object.fromEntries(
    cookieHeader.split(';').map((part) => {
      const [key, ...value] = part.trim().split('=');
      return [key, decodeURIComponent(value.join('='))];
    }),
  );
  const supplied = cookies[ADMIN_COOKIE_NAME] || '';
  const expected = createAdminSessionValue();
  if (supplied.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(supplied), Buffer.from(expected));
}
