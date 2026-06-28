/**
 * Teacher Dashboard — FR-TP-001 through FR-TP-010
 * Classroom overview with inquiry skill analytics and per-student summaries.
 * FR-LIDM-005: shows scientific thinking development at a glance.
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
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Dashboard Guru" };
export const dynamic = "force-dynamic";

function worldLabel(worldId: string | null) {
  if (!worldId) return "Belum mulai";
  return WORLDS.find((w) => w.id === worldId)?.titleBahasa ?? worldId;
}

// Inquiry skill framework descriptions for LIDM judges
const SKILL_FRAMEWORK = [
  { key: "observe",  emoji: "👀", label: "Amati",     world: "Dunia 1",   desc: "Mengidentifikasi pola & perbedaan" },
  { key: "question", emoji: "❓", label: "Tanya",     world: "Dunia 1–2", desc: "Merumuskan pertanyaan dari observasi" },
  { key: "predict",  emoji: "🔮", label: "Prediksi",  world: "Dunia 3",   desc: "Menebak hasil berdasarkan bukti" },
  { key: "explore",  emoji: "🔬", label: "Jelajahi",  world: "Dunia 2–4", desc: "Menguji hipotesis secara aktif" },
  { key: "conclude", emoji: "💡", label: "Simpulkan", world: "Dunia 4",   desc: "Menarik kesimpulan dari bukti" },
] as const;

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

  const teacherName = teacher?.name ?? "Guru";
  const teacherSchool = teacher?.school ?? "Sekolah";

  return (
    <div className="flex-1 space-y-6 p-6 lg:p-8">
      <PageHeader
        title={`Selamat datang, ${teacherName}! 👩‍🏫`}
        description={`${teacherSchool} · ${classrooms.length} kelas`}
        actions={
          <Button asChild variant="outline" size="sm">
            <Link href="/about">
              <BookOpen className="h-4 w-4" />
              Metode Inkuiri
            </Link>
          </Button>
        }
      />

      {/* Impact metrics */}
      {impact && (
        <section aria-label="Metrik dampak">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: "Total Siswa",           value: impact.totalStudents,                         emoji: "👧", color: "text-primary"         },
              { label: "Aktivitas Selesai",      value: impact.totalActivitiesCompleted,              emoji: "✅", color: "text-emerald-600"      },
              { label: "Kemandirian Rata-rata",  value: `${Math.round(impact.avgIndependence * 100)}%`, emoji: "⭐", color: "text-amber-600"    },
              { label: "Kelas Aktif",            value: classrooms.length,                            emoji: "🏫", color: "text-violet-600"      },
            ].map((m) => (
              <div
                key={m.label}
                className="rounded-2xl border bg-white p-4 shadow-sm"
              >
                <p className="text-2xl" aria-hidden>{m.emoji}</p>
                <p className={`font-display text-2xl font-bold ${m.color}`}>{m.value}</p>
                <p className="text-xs text-muted-foreground">{m.label}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {classrooms.length === 0 ? (
        <div className="rounded-3xl border bg-white p-10 text-center shadow-sm">
          <p className="text-5xl" aria-hidden>🏫</p>
          <h2 className="mt-3 font-display text-lg font-bold text-gray-800">
            Belum Ada Kelas
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Buat kelas pertamamu untuk mulai memantau siswa.
          </p>
        </div>
      ) : (
        <>
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Skill analytics */}
            {skillAverages && (
              <SkillProgress
                averages={skillAverages}
                title={`Keterampilan Inkuiri — ${primaryClassroom?.name}`}
              />
            )}

            {/* Student list */}
            <section
              className="rounded-2xl border bg-white p-5 shadow-sm"
              aria-label="Daftar siswa"
            >
              <div className="mb-1">
                <h3 className="font-display font-bold text-gray-800">
                  Siswa — {primaryClassroom?.name}
                </h3>
                <p className="text-xs text-muted-foreground">
                  Kode kelas:{" "}
                  <span className="font-mono font-semibold text-gray-700">
                    {primaryClassroom?.code}
                  </span>
                </p>
              </div>

              <div className="mt-4 space-y-2">
                {students.length === 0 ? (
                  <div className="rounded-xl bg-gray-50 p-6 text-center">
                    <p className="text-2xl" aria-hidden>👧</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Belum ada siswa di kelas ini.
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Bagikan kode kelas ke siswa atau orang tua.
                    </p>
                  </div>
                ) : (
                  students.map((s) => (
                    <div key={s.id}>
                      <StudentSkillRow
                        name={s.displayName}
                        completedActivities={s.completedActivities}
                        independenceAvg={s.independenceAvg}
                      />
                      <p className="mt-0.5 pl-4 text-xs text-muted-foreground">
                        Dunia saat ini:{" "}
                        <span className="font-medium text-gray-600">
                          {worldLabel(s.currentWorld)}
                        </span>
                      </p>
                    </div>
                  ))
                )}
              </div>
            </section>
          </div>

          {/* Scientific thinking framework — for LIDM judges */}
          <section
            className="rounded-2xl border bg-white p-5 shadow-sm"
            aria-label="Kerangka berpikir ilmiah"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display font-bold text-gray-800">
                📊 Perkembangan Berpikir Ilmiah
              </h3>
              <span className="text-xs text-muted-foreground">
                5 keterampilan inkuiri · 4 dunia belajar
              </span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {SKILL_FRAMEWORK.map((skill) => {
                const value = skillAverages
                  ? (skillAverages[skill.key as keyof typeof skillAverages] ?? 0)
                  : 0;
                return (
                  <div
                    key={skill.key}
                    className="rounded-xl border bg-gray-50/60 p-3 text-center"
                  >
                    <div className="text-2xl mb-1.5" aria-hidden>{skill.emoji}</div>
                    <p className="font-display font-bold text-gray-800 text-sm">{skill.label}</p>
                    <p className="font-display text-xl font-bold text-primary mt-1">
                      {Math.round(value)}
                    </p>
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-gray-200">
                      <div
                        className="h-full rounded-full bg-primary/60 transition-all duration-700"
                        style={{ width: `${Math.min(100, value)}%` }}
                      />
                    </div>
                    <p className="mt-2 text-[10px] text-muted-foreground leading-tight">
                      {skill.world}
                    </p>
                    <p className="text-[10px] text-muted-foreground leading-tight">
                      {skill.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Multiple classrooms */}
          {classrooms.length > 1 && (
            <section aria-label="Semua kelas">
              <h3 className="mb-3 font-display font-bold text-gray-800">
                Semua Kelas
              </h3>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {classrooms.map((c: { id: string; name: string; code: string }) => (
                  <div key={c.id} className="rounded-xl border bg-white p-4 shadow-sm">
                    <p className="font-display font-bold text-gray-800">{c.name}</p>
                    <p className="text-xs font-mono text-muted-foreground">{c.code}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </>
      )}

      <footer className="text-center text-xs text-muted-foreground pt-2">
        <Link href="/demo" className="hover:underline hover:text-primary">
          Mode Demo
        </Link>
        {" · "}
        <Link href="/about" className="hover:underline hover:text-primary">
          Metode Inkuiri
        </Link>
        {" · "}
        INQUIS · LIDM 2026
      </footer>
    </div>
  );
}
