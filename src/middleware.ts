import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except /studio, /api, /_next, and static files
  matcher: ['/((?!studio|api|_next|.*\\..*).*)']
};

export const runtime = 'edge';
