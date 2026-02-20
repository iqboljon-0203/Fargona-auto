import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { i18n } from './i18n-config'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // 1. Exclude public files and API routes
  if (
    [
      '/favicon.ico',
      '/icon.svg',
      '/images',
    ].some(path => pathname.startsWith(path)) ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // 2. Check for admin subdomain
  const hostname = request.headers.get('host') || ''
  const isAdminSubdomain = hostname.startsWith('admin.')

  // If on admin subdomain and trying to access root, rewrite to /admin/dashboard
  if (isAdminSubdomain) {
    if (pathname === '/') {
      return NextResponse.rewrite(new URL('/admin/dashboard', request.url))
    }
    // For other paths on admin subdomain, rewrite to /admin/[path] if not already starting with /admin
    if (!pathname.startsWith('/admin')) {
      return NextResponse.rewrite(new URL(`/admin${pathname}`, request.url))
    }
    // If it already starts with /admin, just let it pass
    return NextResponse.next()
  }

  // 3. Handle Admin routes manually on main domain (optional, but requested to move to subdomain)
  // We'll leave this to allow /admin to still work on the main domain just in case
  if (pathname.startsWith('/admin') || pathname.startsWith('/api')) {
    return NextResponse.next()
  }

  // 4. I18N Logic for other routes (main domain)
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  if (pathnameIsMissingLocale) {
    const locale = i18n.defaultLocale
    return NextResponse.redirect(
      new URL(`/${locale}${pathname === '/' ? '' : pathname}`, request.url)
    )
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
