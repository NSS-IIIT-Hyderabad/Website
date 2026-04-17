import { NextRequest, NextResponse } from 'next/server';
import { getBackendBaseCandidates } from '@/services/backend/config';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const ticket = searchParams.get('ticket');

  if (!ticket) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  for (const base of getBackendBaseCandidates()) {
    try {
      const target = new URL(`${base}/login`);
      target.searchParams.set('ticket', ticket);
      target.searchParams.set('path', '/');
      return NextResponse.redirect(target);
    } catch {
      // Try next backend base candidate.
    }
  }

  return NextResponse.redirect(new URL('/', request.url));
}
