import { NextRequest, NextResponse } from "next/server";

const protectedPaths = ["/my-profile", "/courses/"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected =
    pathname.startsWith("/my-profile") ||
    (pathname.startsWith("/courses/") && pathname !== "/courses");

  if (!isProtected) return NextResponse.next();

  // Check for better-auth session cookie
  const sessionCookie =
    request.cookies.get("better-auth.session_token") ||
    request.cookies.get("__Secure-better-auth.session_token");

  if (!sessionCookie?.value) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/courses/:path+", "/my-profile", "/my-profile/:path+"],
};
