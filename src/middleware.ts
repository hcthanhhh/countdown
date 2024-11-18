import { withAuth } from 'next-auth/middleware';
import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';

import { AppConfig } from './libs/i18n.config';
import { ROUTES_FE } from './routers';

// More on how NextAuth.js middleware works: https://next-auth.js.org/configuration/nextjs#middleware
const intlMiddleware = createMiddleware({
  locales: AppConfig.locales,
  localePrefix: AppConfig.localePrefix,
  defaultLocale: AppConfig.defaultLocale,
  localeDetection: AppConfig.localeDetection,
});

const checkPublicPages = (pathname: string) => {
  const publicPages = [
    '/',
    '/countdown',
    // (/secret requires auth)
  ];
  const publicPathnameRegex = RegExp(
    `^(/(${AppConfig.locales.join('|')}))?(${publicPages
      .flatMap((p) => (p === '/' ? ['', '/'] : p))
      .join('|')})/?$`,
    'i',
  );
  return publicPathnameRegex.test(pathname);
};

export default withAuth(
  function middlewareNextAuth(req) {
    const pathname = req.nextUrl.pathname;
    const token = req.nextauth.token;
    if (pathname === ROUTES_FE.LOGIN && !token) {
      return NextResponse.redirect(new URL(ROUTES_FE.ROOT, req.url));
    }

    if (!checkPublicPages(pathname)) {
      return NextResponse.redirect(new URL(ROUTES_FE.ROOT, req.url));
    }

    return intlMiddleware(req);
  },
  {
    callbacks: {
      authorized({ req, token }) {
        const { pathname } = req.nextUrl;

        if (checkPublicPages(pathname)) {
          return true;
        }
        return !!token;
      },
    },
  },
);

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|error|images|api|swagger|widgets|files|models).*)',
  ],
};
