/**
 * Teacher Dashboard — DASH-001
 * Properly wired placeholder. Full implementation in teacher-panel module.
 * Displays teacher name and class count from DB.
 */

import type { Metadata } from "next";
import { requireRole } from "@/lib/services/auth.service";
import { getTeacherProfile } from "@/lib/services/auth.service";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/shared/page-header";

export const metadata: Metadata = { title: "Dashboard Guru" };
export const dynamic = "force-dynamic";

export default async function TeacherDashboardPage() {
  const user = await requireRole(["TEACHER", "ADMIN"]);
  const teacher = await getTeacherProfile(user.id);

  const classroomCount = teacher
    ? await prisma.classroom.count({ where: { teacherId: teacher.id } })
    : 0;

  return (
    <main className="p-6 lg:p-10">
      <PageHeader
        title={`Selamat datang, ${teacher?.name ?? "Guru"}!`}
        description={`${teacher?.school ?? ""} · ${classroomCount} kelas`}
      />

      <div className="mt-6 rounded-2xl border bg-white p-8 text-center text-muted-foreground shadow-sm">
        <p className="text-4xl">🏫</p>
        <p className="mt-2 font-medium">Teacher Dashboard</p>
        <p className="text-sm">Fitur lengkap tersedia di modul Teacher Panel.</p>
      </div>
    </main>
  );
}
