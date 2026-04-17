import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith('/dev-login')) {
    const hasUid = !!request.cookies.get('uid')?.value;
    const hasEmail = !!request.cookies.get('email')?.value;
    const hasLogoutMarker = !!request.cookies.get('logout')?.value;

    if ((hasUid || hasEmail) && !hasLogoutMarker) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // Create response
  const response = NextResponse.next();

  // Development CSP - allows unsafe-eval for Next.js dev mode and hot reloading
  const isDev = process.env.NODE_ENV === 'development';
  
  const cspPolicy = isDev 
    ? "default-src 'self' http: https: data: blob: 'unsafe-inline' 'unsafe-eval'; img-src 'self' data: blob: http: https:; connect-src 'self' http: https: ws: wss:;"
    : "default-src 'self' https: data: 'unsafe-inline'; script-src 'self' 'unsafe-inline' https://fonts.googleapis.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: blob: https:; connect-src 'self' https:;";

  // Set CSP header
  response.headers.set('Content-Security-Policy', cspPolicy);

  // Additional security headers for production
  if (!isDev) {
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};