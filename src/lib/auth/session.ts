import crypto from 'crypto';
import { cookies } from 'next/headers';

const SESSION_SECRET = process.env.DISCORD_OAUTH_SECRET || 'fallback_secret_for_dev_only_change_in_prod';
const SESSION_COOKIE_NAME = 'astralix_session';

export interface SessionPayload {
  discord_id: string;
  username: string;
  avatar: string | null;
  exp: number;
}

// Sign a payload string with HMAC SHA256
function sign(payload: string): string {
  return crypto.createHmac('sha256', SESSION_SECRET).update(payload).digest('base64url');
}

// Verify and decode
function verify(signedString: string): SessionPayload | null {
  const [payloadBase64, signature] = signedString.split('.');
  if (!payloadBase64 || !signature) return null;

  const expectedSignature = sign(payloadBase64);
  if (signature !== expectedSignature) return null;

  try {
    const jsonStr = Buffer.from(payloadBase64, 'base64url').toString('utf-8');
    return JSON.parse(jsonStr) as SessionPayload;
  } catch {
    return null;
  }
}

export async function createSession(data: Omit<SessionPayload, 'exp'>) {
  // 7 days expiration
  const exp = Date.now() + 7 * 24 * 60 * 60 * 1000;
  const payload: SessionPayload = { ...data, exp };
  
  const payloadBase64 = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = sign(payloadBase64);
  const signedCookie = `${payloadBase64}.${signature}`;

  const cookieStore = cookies();
  cookieStore.set(SESSION_COOKIE_NAME, signedCookie, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
  });
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);
  
  if (!sessionCookie?.value) return null;

  const session = verify(sessionCookie.value);
  if (!session) return null;

  // Check expiration
  if (Date.now() > session.exp) {
    clearSession();
    return null;
  }

  return session;
}

export async function clearSession() {
  const cookieStore = cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}
