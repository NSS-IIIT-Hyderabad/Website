import { NextRequest, NextResponse } from 'next/server';

function clearCookie(response: NextResponse, name: string) {
  response.cookies.set(name, '', {
    path: '/',
    maxAge: 0,
    expires: new Date(0),
    httpOnly: false,
    sameSite: 'lax',
  });
}

export async function GET(request: NextRequest) {
  const nextPath = request.nextUrl.searchParams.get('next') || '/';
  const forwardedProto = request.headers.get('x-forwarded-proto') || request.nextUrl.protocol.replace(':', '');
  const forwardedHost = request.headers.get('host') || request.nextUrl.host;
  const response = NextResponse.redirect(`${forwardedProto}://${forwardedHost}${nextPath}`);

  for (const cookie of request.cookies.getAll()) {
    clearCookie(response, cookie.name);
  }

  clearCookie(response, 'uid');
  clearCookie(response, 'email');
  clearCookie(response, 'name');
  clearCookie(response, 'logout');

  return response;
}
