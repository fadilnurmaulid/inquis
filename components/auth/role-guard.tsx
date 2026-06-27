/**
 * RoleGuard — FND-014 / FR-004
 * Server component that enforces role-based access.
 * Renders children only if user has an allowed role.
 */

import { getCurrentUser } from "@/lib/services/auth.service";
import { redirect } from "next/navigation";
import type { UserRole } from "@/types";

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
  fallback?: React.ReactNode;
}

export async function RoleGuard({ children, allowedRoles, fallback }: RoleGuardProps) {
  const user = await getCurrentUser();

  if (!user) redirect("/login");

  if (!allowedRoles.includes(user.role)) {
    if (fallback) return <>{fallback}</>;

    const redirectMap: Record<UserRole, string> = {
      CHILD: "/play/home",
      TEACHER: "/teacher/dashboard",
      PARENT: "/parent/dashboard",
      ADMIN: "/admin",
    };
    redirect(redirectMap[user.role]);
  }

  return <>{children}</>;
}
