import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  
  // List of routes to block during maintenance
  const blockedRoutes = [
    '/dashboard',
    '/form-builder',
    '/responses',
    '/form/[id]',
    '/shared/[encodedData]'
  ];
  
  // Check if the current path matches any blocked routes
  const isBlockedRoute = blockedRoutes.some(route => {
    if (route.includes('[id]') || route.includes('[encodedData]')) {
      // Handle dynamic routes
      const routePattern = route.replace(/\[.*?\]/g, '[^/]+');
      const regex = new RegExp(`^${routePattern.replace(/\//g, '\\/')}`);
      return regex.test(url.pathname);
    }
    return url.pathname.startsWith(route);
  });
  
  if (isBlockedRoute) {
    // Redirect blocked routes to homepage with maintenance flag
    url.pathname = '/';
    url.searchParams.set('maintenance', 'true');
    return NextResponse.redirect(url);
  }
  
  // If accessing homepage with maintenance flag, set a cookie
  if (url.pathname === '/' && url.searchParams.has('maintenance')) {
    const response = NextResponse.next();
    response.cookies.set('maintenance-notice', 'true', {
      maxAge: 300, // 5 minutes
      httpOnly: true
    });
    return response;
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/form-builder/:path*',
    '/responses/:path*',
    '/form/:path*',
    '/shared/:path*',
    '/'
  ]
};
