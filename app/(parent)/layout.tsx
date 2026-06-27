/**
 * Parent interface layout — FND-011
 * Wraps all /parent routes. Enforces PARENT | ADMIN role.
 */

import { requireRole } from "@/lib/services/auth.service";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "INQUIS — Pantau Kemajuan Anak",
    template: "%s | Orang Tua",
  },
};

export default async function ParentLayout({ children }: { children: React.ReactNode }) {
  await requireRole(["PARENT", "ADMIN"]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {children}
    </div>
  );
}
