/**
 * AuthService — FND-015
 * Centralizes login, logout, session validation, and role resolution.
 * All sensitive operations run server-side only.
 */

"use server";

import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import type { AuthUser, UserRole } from "@/types";

// ─────────────────────────────────────────────
// Session
// ─────────────────────────────────────────────

/**
 * Returns the current authenticated user with their role.
 * Returns null if not authenticated.
 */
export async function getCurrentUser(): Promise<AuthUser | null> {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) return null;

  const dbUser = await prisma.user.findUnique({
    where: { supabaseId: user.id },
    select: { id: true, email: true, role: true },
  });

  if (!dbUser) return null;

  return {
    id: dbUser.id,
    email: dbUser.email,
    role: dbUser.role as UserRole,
  };
}

/**
 * Requires authentication. Redirects to /login if not authenticated.
 */
export async function requireAuth(): Promise<AuthUser> {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return user;
}

/**
 * Requires a specific role. Redirects to appropriate home if role mismatch.
 */
export async function requireRole(allowedRoles: UserRole[]): Promise<AuthUser> {
  const user = await requireAuth();

  if (!allowedRoles.includes(user.role)) {
    const redirectMap: Record<UserRole, string> = {
      CHILD: "/play/home",
      ADMIN: "/admin",
    };
    redirect(redirectMap[user.role]);
  }

  return user;
}

// ─────────────────────────────────────────────
// Login
// ─────────────────────────────────────────────

export interface LoginResult {
  success: boolean;
  error?: string;
  redirectTo?: string;
}

export async function loginWithEmail(
  email: string,
  password: string
): Promise<LoginResult> {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return {
      success: false,
      error: "Email atau password salah. Coba lagi.",
    };
  }

  // Resolve role for post-login redirect
  const user = await getCurrentUser();
  const redirectMap: Record<UserRole, string> = {
    CHILD: "/play/home",
    ADMIN: "/admin",
  };

  return {
    success: true,
    redirectTo: user ? redirectMap[user.role] : "/",
  };
}

// ─────────────────────────────────────────────
// Logout
// ─────────────────────────────────────────────

export async function logout(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}

// ─────────────────────────────────────────────
// Role resolution helpers
// ─────────────────────────────────────────────

export async function getChildProfile(userId: string) {
  return prisma.child.findFirst({
    where: { user: { id: userId } },
    select: { id: true, name: true, displayName: true, avatarUrl: true },
  });
}
