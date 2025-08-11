import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // No redirects based on login state
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/login', '/signup', '/dashboard'],
}; 