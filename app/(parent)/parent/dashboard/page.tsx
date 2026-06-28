/**
 * Parent Dashboard — FR-PP-001 through FR-PP-008
 * Clear, scannable view of child's progress — no long text, visual-first.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { requireRole, getParentProfile } from "@/lib/services/auth.service";
import { getChildDashboardData } from "@/lib/services/dashboard.service";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/shared/page-header";
import { Progress } from "@/components/ui/progress";
import { AchievementRow } from "@/components/dashboard/achievement-badge";
import { computeAchievements } from "@/lib/achievements";
import { WORLDS } from "@/types";
import { Button } from "@/components/ui/button";
import { logout } from "@/lib/services/auth.service";
import { LogOut } from "lucide-react";

export const metadata: Metadata = { title: "Dashboard Orang Tua" };
export const dynamic = "force-dynamic";

const TOTAL_ACTIVITIES = WORLDS.reduce((sum, w) => sum + w.activityCount, 0);

// Skill narrative summaries for parent consumption
function skillNarrative(independenceAvg: number, completedActivities: number) {
  if (completedActivities === 0) return null;
  const pct = Math.round(independenceAvg * 100);
  const skills = [];
  if (completedActivities >= 1)
    skills.push({ icon: "👀", skill: "Mengamati", desc: "Menemukan pola & perbedaan antar benda.", level: "Berkembang" });
  if (completedActivities >= 3)
    skills.push({ icon: "🔍", skill: "Membedakan", desc: "Mengenali benda yang berbeda dalam kelompok.", level: "Berkembang" });
  if (pct >= 70)
    skills.push({ icon: "💪", skill: "Kemandirian", desc: `Menyelesaikan ${pct}% aktivitas tanpa petunjuk — tanda kepercayaan diri tinggi!`, level: "Sangat Baik" });
  return skills;
}

const INDEPENDENCE_TIPS: Record<string, string> = {
  high:    "Tanyakan: \"Pola apa yang kamu temukan hari ini?\" — ini memperkuat kemampuan observasi.",
  medium:  "Coba ajak anak bercerita tentang aktivitasnya. Dorong ia menjelaskan pikirannya sendiri.",
  low:     "Temani anak saat belajar dan tunjukkan ketertarikan pada apa yang ia temukan.",
};

export default async function ParentDashboardPage() {
  const user = await requireRole(["PARENT", "ADMIN"]);
  const parent = await getParentProfile(user.id);

  const children = parent
    ? await prisma.child.findMany({
        where: { parents: { some: { parentId: parent.id } } },
        select: { id: true, displayName: true, name: true, userId: true },
      })
    : [];

  const childrenWithData = await Promise.all(
    children.map(async (child: { id: string; displayName: string; name: string; userId: string }) => {
      const userRecord = await prisma.user.findFirst({
        where: { child: { id: child.id } },
        select: { id: true },
      });
      const dashboard = userRecord ? await getChildDashboardData(userRecord.id) : null;
      return { ...child, dashboard };
    })
  );

  const parentName = parent?.name ?? "Orang Tua";

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50/50 p-6 lg:p-10">
      <div className="mx-auto max-w-2xl">
        <PageHeader
          title={`Halo, ${parentName}! 👋`}
          description="Ringkasan kemajuan belajar anakmu"
          actions={
            <form action={logout}>
              <Button type="submit" variant="outline" size="sm">
                <LogOut className="h-4 w-4" />
                Keluar
              </Button>
            </form>
          }
        />

        {childrenWithData.length === 0 ? (
          <div className="rounded-3xl border bg-white p-10 text-center shadow-sm">
            <p className="text-5xl" aria-hidden>👧</p>
            <h2 className="mt-3 font-display text-lg font-bold text-gray-800">
              Belum Ada Anak yang Terhubung
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Minta guru untuk menghubungkan akun anakmu ke kelas.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {childrenWithData.map((child) => {
              if (!child.dashboard) return null;
              const { dashboard: data } = child;
              const pct =
                TOTAL_ACTIVITIES > 0
                  ? Math.round(
                      (data.totalCompletedActivities / TOTAL_ACTIVITIES) * 100
                    )
                  : 0;

              const nextSession = data.activeSession ?? data.nextRecommended;
              const nextWorld = nextSession
                ? WORLDS.find((w) => w.id === nextSession.worldId)
                : null;

              const achievements = computeAchievements({
                totalCompletedActivities: data.totalCompletedActivities,
                completedWorlds: data.completedWorlds,
                totalWorlds: data.totalWorlds,
              });

              const skills = skillNarrative(
                data.independenceAvg ?? 0,
                data.totalCompletedActivities
              );

              const indPct = Math.round((data.independenceAvg ?? 0) * 100);
              const tipKey = indPct >= 70 ? "high" : indPct >= 40 ? "medium" : "low";

              return (
                <div key={child.id} className="space-y-4">
                  {/* Child card */}
                  <div className="rounded-3xl border bg-white p-6 shadow-sm">
                    {/* Header */}
                    <div className="mb-5 flex items-center gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-3xl shadow-sm">
                        🧒
                      </div>
                      <div>
                        <p className="font-display text-xl font-bold text-gray-800">
                          {child.displayName}
                        </p>
                        <p className="text-sm text-muted-foreground">{child.name}</p>
                      </div>
                    </div>

                    {/* 3 stat tiles */}
                    <div className="mb-5 grid gap-3 sm:grid-cols-3">
                      <div className="rounded-2xl bg-primary/8 p-4 text-center">
                        <p className="font-display text-3xl font-bold text-primary">{pct}%</p>
                        <p className="mt-1 text-xs font-semibold text-muted-foreground">
                          Kemajuan Total
                        </p>
                      </div>
                      <div className="rounded-2xl bg-emerald-50 p-4 text-center">
                        <p className="font-display text-3xl font-bold text-emerald-600">
                          {data.completedWorlds}/{data.totalWorlds}
                        </p>
                        <p className="mt-1 text-xs font-semibold text-muted-foreground">
                          Dunia Selesai
                        </p>
                      </div>
                      <div className="rounded-2xl bg-amber-50 p-4 text-center">
                        <p className="font-display text-base font-bold text-amber-700 leading-tight">
                          {nextWorld?.titleBahasa ?? (data.completedWorlds === data.totalWorlds ? "Semua Selesai! 🎉" : "—")}
                        </p>
                        <p className="mt-1 text-xs font-semibold text-muted-foreground">
                          {nextSession
                            ? `Aktivitas ${nextSession.activityNumber} selanjutnya`
                            : "Status"}
                        </p>
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div>
                      <div className="mb-1.5 flex justify-between text-sm">
                        <span className="text-muted-foreground">Aktivitas</span>
                        <span className="font-semibold text-gray-700">
                          {data.totalCompletedActivities}/{TOTAL_ACTIVITIES}
                        </span>
                      </div>
                      <Progress value={pct} className="h-3 rounded-full" />
                    </div>
                  </div>

                  {/* What child learned */}
                  {skills && skills.length > 0 && (
                    <div className="rounded-3xl border bg-white p-5 shadow-sm">
                      <h2 className="mb-4 font-display text-base font-bold text-gray-800">
                        🎓 Yang Sudah Dipelajari {child.displayName.split(" ")[0]}
                      </h2>
                      <div className="space-y-3">
                        {skills.map((s) => (
                          <div
                            key={s.skill}
                            className="flex gap-3 rounded-xl border bg-gray-50/60 px-4 py-3"
                          >
                            <span className="text-xl" aria-hidden>{s.icon}</span>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-0.5">
                                <p className="font-semibold text-sm text-gray-800">{s.skill}</p>
                                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
                                  {s.level}
                                </span>
                              </div>
                              <p className="text-xs text-muted-foreground leading-relaxed">
                                {s.desc}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Achievements */}
                  <AchievementRow achievements={achievements} />

                  {/* Parent tip */}
                  {data.totalCompletedActivities > 0 && (
                    <div
                      className="rounded-3xl p-5 text-white shadow-md"
                      style={{
                        background: "linear-gradient(135deg, #4ECB71dd, #4ECB7199)",
                      }}
                    >
                      <h3 className="font-display font-bold mb-2">
                        💡 Saran untuk Orang Tua
                      </h3>
                      <p className="text-sm text-white/95 leading-relaxed">
                        {INDEPENDENCE_TIPS[tipKey]}
                      </p>
                      <Link
                        href="/about"
                        className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-white/80
                                   underline underline-offset-2 hover:text-white"
                      >
                        Pelajari metode inkuiri →
                      </Link>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <footer className="mt-8 text-center text-xs text-muted-foreground">
          <Link href="/about" className="hover:underline hover:text-primary">
            Metode Inkuiri
          </Link>
          {" · "}
          <Link href="/" className="hover:underline hover:text-primary">
            Beranda
          </Link>
          {" · "}
          INQUIS · LIDM 2026
        </footer>
      </div>
    </main>
  );
}
