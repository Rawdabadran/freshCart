import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = [
  "/cart",
  "/orders",
  "/payment",
  "/allorders",
  "my_orders",
  "/wishlist",
  "/profile",
];

const authRoutes = ["/login", "/signup", "/forgetpassword", "/resetpassword"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value || null;

  const isAuthenticated = !!token;

  const isProtectedRoute = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  const isAuthRoute = authRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();

  
}


export const config = {
  matcher: [
    // Protected
    "/cart/:path*",
    "/orders/:path*",
    "/payment/:path*",
    "/my_orders/:path*",
    "/allorders/:path*",
    "/wishlist/:path*",
    "/profile/:path*",

    // Auth
    "/login/:path*",
    "/signup/:path*",
    "/forgetpassword/:path*",
    "/resetpassword/:path*",
  ],
};