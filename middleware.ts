/**
 * Next.js Middleware — Route protection (FND-009)
 * Enforces authentication and role-based routing before any page renders.
 * Authorization must never rely solely on client-side validation (architecture.md).
 */

import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

// Routes accessible without authentication
const PUBLIC_ROUTES = ["/", "/login", "/about", "/demo"];
const AUTH_ROUTES = ["/login"];

// Protected route prefixes and their required roles
const PROTECTED_ROUTES: Record<string, string[]> = {
  "/play": ["CHILD"],
  "/admin": ["ADMIN"],
};

export async function middleware(request: NextRequest) {
  const { supabaseResponse, user } = await updateSession(request);
  const { pathname } = request.nextUrl;

  // Allow public routes without auth
  const isPublicRoute = PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
  if (isPublicRoute) return supabaseResponse;

  // Redirect unauthenticated users to login
  if (!user) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect authenticated users away from auth pages
  if (AUTH_ROUTES.some((r) => pathname.startsWith(r))) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Role-based route protection
  // Note: Full role resolution happens in server components/actions via DB lookup.
  // This middleware checks a role claim stored in the Supabase JWT metadata.
  for (const [prefix, allowedRoles] of Object.entries(PROTECTED_ROUTES)) {
    if (pathname.startsWith(prefix)) {
      const userRole = user.user_metadata?.role as string | undefined;

      if (!userRole || !allowedRoles.includes(userRole)) {
        // Redirect to appropriate home based on actual role
        const redirectMap: Record<string, string> = {
          CHILD: "/play/home",
          ADMIN: "/admin",
        };
        const destination = redirectMap[userRole ?? ""] ?? "/";
        return NextResponse.redirect(new URL(destination, request.url));
      }
      break;
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     * - public assets
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
