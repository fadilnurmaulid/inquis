/**
 * Teacher Dashboard — with inquiry skill analytics and student summaries.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { requireRole, getTeacherProfile } from "@/lib/services/auth.service";
import {
  getClassroomSkillAverages,
  getClassroomStudentSummaries,
  getTeacherImpactMetrics,
} from "@/lib/services/teacher-analytics.service";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/shared/page-header";
import { SkillProgress, StudentSkillRow } from "@/components/teacher/skill-progress";
import { WORLDS } from "@/types";

export const metadata: Metadata = { title: "Dashboard Guru" };
export const dynamic = "force-dynamic";

function worldLabel(worldId: string | null) {
  if (!worldId) return "Belum mulai";
  return WORLDS.find((w) => w.id === worldId)?.titleBahasa ?? worldId;
}

export default async function TeacherDashboardPage() {
  const user = await requireRole(["TEACHER", "ADMIN"]);
  const teacher = await getTeacherProfile(user.id);

  const classrooms = teacher
    ? await prisma.classroom.findMany({
        where: { teacherId: teacher.id },
        select: { id: true, name: true, code: true },
        orderBy: { name: "asc" },
      })
    : [];

  const primaryClassroom = classrooms[0];
  const [skillAverages, students, impact] = await Promise.all([
    primaryClassroom ? getClassroomSkillAverages(primaryClassroom.id) : Promise.resolve(null),
    primaryClassroom ? getClassroomStudentSummaries(primaryClassroom.id) : Promise.resolve([]),
    teacher ? getTeacherImpactMetrics(teacher.id) : Promise.resolve(null),
  ]);

  return (
    <div className="flex-1 p-6 lg:p-10">
      <PageHeader
        title={`Selamat datang, ${teacher?.name ?? "Guru"}!`}
        description={`${teacher?.school ?? "Sekolah"} · ${classrooms.length} kelas`}
      />

      {/* Impact metrics — FR-LIDM-005 */}
      {impact && (
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: "Total Siswa", value: impact.totalStudents, emoji: "👧" },
            { label: "Aktivitas Selesai", value: impact.totalActivitiesCompleted, emoji: "✅" },
            {
              label: "Kemandirian Rata-rata",
              value: `${Math.round(impact.avgIndependence * 100)}%`,
              emoji: "⭐",
            },
            { label: "Kelas Aktif", value: classrooms.length, emoji: "🏫" },
          ].map((m) => (
            <div key={m.label} className="rounded-2xl border bg-white p-4 shadow-sm">
              <p className="text-2xl" aria-hidden>{m.emoji}</p>
              <p className="font-display text-2xl font-bold text-primary">{m.value}</p>
              <p className="text-xs text-muted-foreground">{m.label}</p>
            </div>
          ))}
        </div>
      )}

      {classrooms.length === 0 ? (
        <div className="mt-6 rounded-2xl border bg-white p-8 text-center text-muted-foreground shadow-sm">
          <p className="text-4xl">🏫</p>
          <p className="mt-2 font-medium">Belum ada kelas</p>
        </div>
      ) : (
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {/* Skill analytics */}
          {skillAverages && (
            <SkillProgress
              averages={skillAverages}
              title={`Keterampilan Inkuiri — ${primaryClassroom?.name}`}
            />
          )}

          {/* Student list */}
          <section className="rounded-2xl border bg-white p-5 shadow-sm">
            <h3 className="font-display font-bold text-gray-800">
              Siswa — {primaryClassroom?.name}
            </h3>
            <p className="text-xs text-muted-foreground">
              Kode kelas: <span className="font-mono font-semibold">{primaryClassroom?.code}</span>
            </p>
            <div className="mt-4 space-y-2">
              {students.length === 0 ? (
                <p className="text-sm text-muted-foreground">Belum ada siswa terdaftar.</p>
              ) : (
                students.map((s) => (
                  <div key={s.id}>
                    <StudentSkillRow
                      name={s.displayName}
                      completedActivities={s.completedActivities}
                      independenceAvg={s.independenceAvg}
                    />
                    <p className="mt-0.5 pl-4 text-xs text-muted-foreground">
                      Dunia saat ini: {worldLabel(s.currentWorld)}
                    </p>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      )}

      {/* All classrooms */}
      {classrooms.length > 1 && (
        <section className="mt-6">
          <h3 className="mb-3 font-display font-bold text-gray-800">Semua Kelas</h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {classrooms.map((c) => (
              <div key={c.id} className="rounded-xl border bg-white p-4 shadow-sm">
                <p className="font-display font-bold">{c.name}</p>
                <p className="text-xs text-muted-foreground font-mono">{c.code}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <p className="mt-8 text-center text-xs text-muted-foreground">
        <Link href="/demo" className="hover:underline">
          Mode Demo
        </Link>
        {" · "}
        <Link href="/about" className="hover:underline">
          Metode Inkuiri
        </Link>
      </p>
    </div>
  );
}
