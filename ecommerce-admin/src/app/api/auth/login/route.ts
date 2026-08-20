import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import crypto from 'crypto';

function base64URLEncode(buffer: Buffer) {
  return buffer.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

export async function GET() {
  const verifier = base64URLEncode(crypto.randomBytes(32));
  const challenge = base64URLEncode(crypto.createHash('sha256').update(verifier).digest());

  const cookieStore = await cookies();
  cookieStore.set('pkce_verifier', verifier, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 600,
  });

  const domain = "https://d26tfxw2msp72q.cloudfront.net";
  const clientId = "1n00iku2aqmicd0ctuq51ijk7b";
  const redirectUri = "https://d2gsjrw8qdxah8.cloudfront.net/auth/callback";

  const loginUrl = `${domain}/login?client_id=${clientId}&response_type=code&scope=email+openid&redirect_uri=${encodeURIComponent(redirectUri)}&code_challenge=${challenge}&code_challenge_method=S256`;

  return NextResponse.redirect(loginUrl);
}

export const dynamic = 'force-static';
