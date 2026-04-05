import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const nextPath = request.nextUrl.searchParams.get('next') || '/';
  const forwardedProto = request.headers.get('x-forwarded-proto') || request.nextUrl.protocol.replace(':', '');
  const forwardedHost = request.headers.get('host') || request.nextUrl.host;
  const response = NextResponse.redirect(`${forwardedProto}://${forwardedHost}${nextPath}`);

  response.cookies.set('uid', '', { path: '/', maxAge: 0 });
  response.cookies.set('email', '', { path: '/', maxAge: 0 });
  response.cookies.set('name', '', { path: '/', maxAge: 0 });

  return response;
}
