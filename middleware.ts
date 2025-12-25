import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { AUTH_COOKIE } from "@/lib/auth-constants"

export function middleware(request: NextRequest) {
  const token = request.cookies.get(AUTH_COOKIE)?.value

  if (token) {
    return NextResponse.next()
  }

  const redirectUrl = new URL("/login", request.url)
  redirectUrl.searchParams.set("redirect", request.nextUrl.pathname)
  return NextResponse.redirect(redirectUrl)
}

export const config = {
  matcher: ["/dashboard/:path*"],
}
