/**
 * Role-based redirect destinations — DASH-002 / FR-DASH-001
 * Used after login to route each role to their correct dashboard.
 */

import type { UserRole } from "@/types";

export const ROLE_HOME: Record<UserRole, string> = {
  CHILD: "/play/home",
  TEACHER: "/teacher/dashboard",
  PARENT: "/parent/dashboard",
  ADMIN: "/admin",
};

export function getRoleHome(role: UserRole): string {
  return ROLE_HOME[role];
}
