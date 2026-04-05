import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const host = request.nextUrl.hostname;
  const isLocalhost = host === 'localhost' || host === '127.0.0.1';
  if (!isLocalhost) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  const searchParams = request.nextUrl.searchParams;
  const email = (searchParams.get('email') || 'dev@nss.iiit.ac.in').trim().toLowerCase();
  const inferredUid = email.includes('@') ? email.split('@')[0] : email;
  const uid = (searchParams.get('uid') || inferredUid || 'nss-dev-user').trim();
  const name = (searchParams.get('name') || uid || 'NSS Dev User').trim();

  const forwardedProto = request.headers.get('x-forwarded-proto') || request.nextUrl.protocol.replace(':', '');
  const forwardedHost = request.headers.get('host') || request.nextUrl.host;
  const response = NextResponse.redirect(`${forwardedProto}://${forwardedHost}/`);
  const cookieOptions = {
    httpOnly: false,
    secure: false,
    sameSite: 'lax' as const,
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  };

  response.cookies.set('uid', uid, cookieOptions);
  response.cookies.set('email', email, cookieOptions);
  response.cookies.set('name', name, cookieOptions);

  return response;
}
