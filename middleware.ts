import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const pathname = req.nextUrl.pathname;
    console.log('Middleware:', { pathname, hasToken: !!token, tokenData: token });
    if (token && pathname === '/auth/login') {
      console.log('Redirecting to dashboard (already logged in)');
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
    if (!token && pathname.startsWith('/dashboard')) {
      console.log('Redirecting to login (not authenticated)');
      return NextResponse.redirect(new URL('/auth/login', req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized({ token, req }) {
        const pathname = req.nextUrl.pathname;
        if (pathname === '/auth/login' && !token) {
          return true;
        }
        if (pathname.startsWith('/dashboard') && token) {
          return true;
        }
        return true;
      },
    },
    pages: {
      signIn: '/auth/login',
    },
  }
);

export const config = {
  matcher: [
    '/auth/login',
    '/dashboard/:path*'
  ],
};
