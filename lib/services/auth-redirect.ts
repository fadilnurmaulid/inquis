/**
 * Ke mana tiap peran diantar setelah masuk.
 *
 * Tinggal dua peran. Guru dan orang tua sudah dihapus bersama dasbornya.
 */

import type { UserRole } from "@/types";

export const ROLE_HOME: Record<UserRole, string> = {
  CHILD: "/play/home",
  ADMIN: "/admin",
};

export function getRoleHome(role: UserRole): string {
  return ROLE_HOME[role];
}
