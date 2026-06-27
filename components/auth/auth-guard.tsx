/**
 * AuthGuard — FND-014 / FR-004
 * Server component that protects content requiring authentication.
 * Redirects to login if user is not authenticated.
 */

import { getCurrentUser } from "@/lib/services/auth.service";
import { redirect } from "next/navigation";

interface AuthGuardProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export async function AuthGuard({ children, redirectTo = "/login" }: AuthGuardProps) {
  const user = await getCurrentUser();
  if (!user) redirect(redirectTo);
  return <>{children}</>;
}
