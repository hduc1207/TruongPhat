import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyAdminToken } from '@/utils/verify-token';

export async function POST(request: Request) {
  try {
    const { code } = await request.json();
    const cookieStore = await cookies();
    const pkceVerifier = cookieStore.get('pkce_verifier')?.value;

    if (!code || !pkceVerifier) {
      return NextResponse.json({ error: 'Missing code or verifier' }, { status: 400 });
    }

    const domain = "https://d26tfxw2msp72q.cloudfront.net";
    const clientId = "1n00iku2aqmicd0ctuq51ijk7b";
    const redirectUri = "https://d2gsjrw8qdxah8.cloudfront.net/auth/callback";

    const tokenParams = new URLSearchParams();
    tokenParams.append('grant_type', 'authorization_code');
    tokenParams.append('client_id', clientId);
    tokenParams.append('code', code);
    tokenParams.append('redirect_uri', redirectUri);
    tokenParams.append('code_verifier', pkceVerifier);

    const tokenRes = await fetch(`${domain}/oauth2/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: tokenParams.toString()
    });

    if (!tokenRes.ok) {
      const err = await tokenRes.text();
      return NextResponse.json({ error: 'Lỗi đổi code', details: err }, { status: 401 });
    }

    const tokenData = await tokenRes.json();
    const idToken = tokenData.id_token;
    const accessToken = tokenData.access_token;

    if (!idToken || !accessToken) {
      return NextResponse.json({ error: 'Không nhận được Token' }, { status: 401 });
    }

    const isAdmin = await verifyAdminToken(accessToken);
    if (!isAdmin) {
      return NextResponse.json({ error: 'Bạn không phải Admin hoặc token không hợp lệ.' }, { status: 403 });
    }

    cookieStore.set('admin_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 3600,
    });

    cookieStore.set('admin_id_token', idToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 3600,
    });

    cookieStore.delete('pkce_verifier');

    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export const dynamic = 'force-static';
