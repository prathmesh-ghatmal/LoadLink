import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Get auth data from localStorage (in a real app, this would be from cookies/JWT)
  // For demo purposes, we'll handle this client-side with the RoleGuard component

  // Allow public routes
  const publicRoutes = ["/", "/login", "/register", "/trips", "/about", "/contact", "/unauthorized"]
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next()
  }

  // For protected routes, let the RoleGuard component handle the logic
  return NextResponse.next()
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
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}
