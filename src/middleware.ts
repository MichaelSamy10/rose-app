import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

const authRoutes = [
  '/login',
  '/register',
  '/forgot-password',
];

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1. Determine if the current route is an Auth Route
  const isAuthRoute = authRoutes.some(
    route =>
      pathname === route ||
      routing.locales.some(
        locale => pathname === `/${locale}${route}`,
      ),
  );

  const token = await getToken({ req });
  const locale =
    routing.locales.find(l =>
      pathname.startsWith(`/${l}`),
    ) ?? routing.defaultLocale;

  // 2. Protect routes: If NOT an auth route and NOT logged in -> Redirect to login
  if (!isAuthRoute) {
    if (!token) {
      const loginUrl = new URL(
        `/${locale}/login`,
        req.nextUrl.origin,
      );
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }
    return intlMiddleware(req);
  }

  // 3. Prevent logged-in users from accessing Auth Routes
  if (token) {
    return NextResponse.redirect(
      new URL(`/${locale}/dashboard`, req.nextUrl.origin),
    );
  }

  // 4. Otherwise, let next-intl handle the request
  return intlMiddleware(req);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - assets (public assets)
     * - favicon.ico (favicon file)
     * - any file with an extension (e.g. .png, .svg)
     */
    '/((?!api|_next/static|_next/image|assets|favicon.ico|.*\\..*).*)',
  ],
};
