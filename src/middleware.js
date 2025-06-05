// middleware.js
import { NextResponse } from "next/server";

export function middleware(request) {
  const getJwt = request.cookies.get("logintoken")?.value;

  // Allow API routes
  if (request.nextUrl.pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // If trying to access auth pages while logged in
  const isAuthPage = 
    request.nextUrl.pathname === "/signup" || 
    request.nextUrl.pathname === "/login";

  if (isAuthPage && getJwt) {
    return NextResponse.redirect(new URL("/add-task", request.url));
  }

  // If not logged in and trying to access protected pages
  if (
    !getJwt && 
    !isAuthPage &&
    !request.nextUrl.pathname.startsWith("/_next")
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/add-task", "/showTask", "/login", "/signup"],
};