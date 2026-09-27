import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = [
  "/dashboard",
  "/projects",
  "/results",
  "/settings",
];

const authRoutes = [
  "/login",
  "/signup",
  "/forgot-password",
  "/verify-email",
];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get("access_token")?.value;
  const isProtectedRoute = protectedRoutes.some(
    (route) =>
      pathname === route || pathname.startsWith(`${route}/`),
  );

  const isAuthRoute = authRoutes.some(
    (route) =>
      pathname === route || pathname.startsWith(`${route}/`),
  );

  if (isProtectedRoute && !accessToken) {
    const loginUrl = new URL("/login", request.url);

    loginUrl.searchParams.set("redirect", pathname);

    return NextResponse.redirect(loginUrl);
  }

  if (isAuthRoute && accessToken) {
    return NextResponse.redirect(
      new URL("/dashboard", request.url),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/projects/:path*",
    "/results/:path*",
    "/settings/:path*",
    "/login",
    "/signup",
    "/forgot-password",
    "/verify-email",
  ],
};