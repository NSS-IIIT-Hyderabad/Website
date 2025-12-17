import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  
  // Get CAS ticket from query parameters
  const ticket = searchParams.get('ticket');
  
  if (!ticket) {
    // If no ticket, redirect to home
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Validate ticket with backend
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';
  const serviceUrl = `${request.nextUrl.origin}/api/auth/callback`;
  
  try {
    // Call backend to validate CAS ticket
    const validateResponse = await fetch(
      `${backendUrl}/api/auth/validate?ticket=${encodeURIComponent(ticket)}&service=${encodeURIComponent(serviceUrl)}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!validateResponse.ok) {
      console.error('CAS ticket validation failed');
      return NextResponse.redirect(new URL('/', request.url));
    }

    const userData = await validateResponse.json();
    
    if (!userData.uid) {
      console.error('No user data received from backend');
      return NextResponse.redirect(new URL('/', request.url));
    }

    // Get redirect path (will be read from sessionStorage on client side)
    const redirect = '/';

    // Create response with redirect
    const response = NextResponse.redirect(new URL(redirect, request.url));

    // Set cookies with user data
    const cookieOptions = {
      httpOnly: false, // Allow JavaScript access
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    };

    response.cookies.set('uid', userData.uid, cookieOptions);
    
    if (userData.email) {
      response.cookies.set('email', userData.email, cookieOptions);
    }
    
    if (userData.name) {
      response.cookies.set('name', userData.name, cookieOptions);
    }

    return response;
  } catch (error) {
    console.error('Error validating CAS ticket:', error);
    return NextResponse.redirect(new URL('/', request.url));
  }
}
