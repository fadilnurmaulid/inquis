/**
 * Teacher interface layout — FND-011
 * Wraps all /teacher routes. Enforces TEACHER | ADMIN role.
 * Teacher UI: information density, clear navigation, sortable data.
 */

import { requireRole } from "@/lib/services/auth.service";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "INQUIS — Panel Guru",
    template: "%s | Panel Guru",
  },
};

export default async function TeacherLayout({ children }: { children: React.ReactNode }) {
  await requireRole(["TEACHER", "ADMIN"]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl">
        {children}
      </div>
    </div>
  );
}
