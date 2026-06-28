/**
 * Teacher interface layout — FND-011
 * Responsive: sidebar on desktop, top bar on mobile.
 */

import { requireRole } from "@/lib/services/auth.service";
import { TeacherNav } from "@/components/teacher/teacher-nav";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "INQUIS — Panel Guru",
    template: "%s | Panel Guru",
  },
};

export default async function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireRole(["TEACHER", "ADMIN"]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <TeacherNav />
      <div className="mx-auto w-full max-w-7xl flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
}
