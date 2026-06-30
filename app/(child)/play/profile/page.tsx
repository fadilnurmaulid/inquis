/**
 * Child Profile page — /play/profile
 * Progress summary, achievements, per-world breakdown, logout.
 * Child-friendly design — no text walls, visual-first.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { requireRole, getChildProfile, logout } from "@/lib/services/auth.service";
import { getChildDashboardData } from "@/lib/services/dashboard.service";
import { Button } from "@/components/ui/button";
import { ChildNav } from "@/components/dashboard/child-nav";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AchievementRow, computeAchievements } from "@/components/dashboard/achievement-badge";
import { WORLDS } from "@/types";

export const metadata: Metadata = { title: "Profilku" };

// Streak placeholder — real implementation requires daily tracking
function getStreakMessage(completed: number) {
  if (completed === 0) return null;
  if (completed < 3) return "Kamu baru saja mulai! 🌱";
  if (completed < 10) return "Terus semangat belajar! 💪";
  return "Kamu ilmuwan berbakat! 🔬";
}

export default async function ChildProfilePage() {
  const user = await requireRole(["CHILD"]);
  const child = await getChildProfile(user.id);
  const data = await getChildDashboardData(user.id);

  const totalActivities = WORLDS.reduce((sum, w) => sum + w.activityCount, 0);
  const progressPercent =
    totalActivities > 0
      ? Math.round((data.totalCompletedActivities / totalActivities) * 100)
      : 0;

  const achievements = computeAchievements({
    totalCompletedActivities: data.totalCompletedActivities,
    completedWorlds: data.completedWorlds,
    totalWorlds: data.totalWorlds,
  });

  const streakMsg = getStreakMessage(data.totalCompletedActivities);
  const independencePct = Math.round((data.independenceAvg ?? 0) * 100);

  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50/50 to-indigo-50 px-4 pb-28 pt-10">
        <div className="mx-auto max-w-lg space-y-5">
          {/* Profile header */}
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="relative">
              <Avatar className="h-24 w-24 shadow-xl ring-4 ring-white">
                <AvatarImage src={child?.avatarUrl ?? undefined} alt="" />
                <AvatarFallback className="bg-gradient-to-br from-primary to-inquis-sky text-4xl">
                  🧒
                </AvatarFallback>
              </Avatar>
              {/* Level badge */}
              {data.totalCompletedActivities > 0 && (
                <div className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-inquis-sun text-sm shadow-md">
                  ⭐
                </div>
              )}
            </div>
            <div className="space-y-1">
              <h1 className="font-display text-2xl font-bold text-gray-800">
                {child?.displayName ?? "Pelajar INQUIS"}
              </h1>
              <p className="text-sm text-gray-500">{child?.name}</p>
              {streakMsg && (
                <p className="text-sm font-semibold text-primary">{streakMsg}</p>
              )}
            </div>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-2xl bg-white/80 p-3 text-center shadow-sm">
              <p className="font-display text-2xl font-bold text-primary">
                {data.totalCompletedActivities}
              </p>
              <p className="text-[11px] font-semibold text-gray-500 leading-tight mt-0.5">
                Aktivitas
              </p>
            </div>
            <div className="rounded-2xl bg-white/80 p-3 text-center shadow-sm">
              <p className="font-display text-2xl font-bold text-inquis-grass">
                {data.completedWorlds}
              </p>
              <p className="text-[11px] font-semibold text-gray-500 leading-tight mt-0.5">
                Dunia Selesai
              </p>
            </div>
            <div className="rounded-2xl bg-white/80 p-3 text-center shadow-sm">
              <p className="font-display text-2xl font-bold text-inquis-sun">
                {independencePct > 0 ? `${independencePct}%` : "—"}
              </p>
              <p className="text-[11px] font-semibold text-gray-500 leading-tight mt-0.5">
                Kemandirian
              </p>
            </div>
          </div>

          {/* Overall progress */}
          <section className="rounded-3xl bg-white/70 p-5 shadow-sm">
            <h2 className="mb-3 font-display text-lg font-bold text-gray-800">
              Kemajuan Total
            </h2>
            <div className="mb-2 flex justify-between text-sm">
              <span className="text-gray-600">Aktivitas selesai</span>
              <span className="font-semibold text-primary">
                {data.totalCompletedActivities}/{totalActivities}
              </span>
            </div>
            <Progress value={progressPercent} className="h-3 rounded-full" />
            <p className="mt-2 text-center text-xs text-gray-400">
              {progressPercent === 0
                ? "Mulai petualanganmu sekarang! 🚀"
                : progressPercent < 50
                ? "Kamu sedang berkembang dengan bagus! 💪"
                : progressPercent < 100
                ? "Hampir selesai, teruskan! 🌟"
                : "Semua selesai! Kamu luar biasa! 🏆"}
            </p>
          </section>

          {/* Per-world breakdown */}
          <section className="rounded-3xl bg-white/70 p-5 shadow-sm">
            <h2 className="mb-4 font-display text-lg font-bold text-gray-800">
              Per Dunia
            </h2>
            <ul className="space-y-4">
              {data.worlds.map((world) => {
                const pct =
                  world.totalActivities > 0
                    ? Math.round(
                        (world.completedActivities / world.totalActivities) * 100
                      )
                    : 0;
                const isLocked = world.status === "LOCKED";
                const isComplete = world.status === "COMPLETED";

                return (
                  <li key={world.worldId} className={isLocked ? "opacity-40" : ""}>
                    <div className="mb-1.5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-base" aria-hidden>
                          {isComplete ? "✅" : isLocked ? "🔒" : "▶️"}
                        </span>
                        <span className="text-sm font-semibold text-gray-700">
                          {world.titleBahasa}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">
                        {world.completedActivities}/{world.totalActivities}
                      </span>
                    </div>
                    <div className="h-2.5 overflow-hidden rounded-full bg-gray-200">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${pct}%`,
                          background: isLocked ? "#D1D5DB" : world.themeColor,
                        }}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>

          {/* Achievements */}
          <AchievementRow achievements={achievements} />

          {/* Actions */}
          <div className="flex flex-col gap-3">
            <Button asChild variant="childPrimary" size="lg" className="rounded-2xl">
              <Link href="/play/home">🗺️ Ke Peta Dunia</Link>
            </Button>
            <form action={logout}>
              <Button
                type="submit"
                variant="ghost"
                size="lg"
                className="w-full rounded-2xl text-gray-500 hover:text-destructive"
              >
                Keluar
              </Button>
            </form>
          </div>
        </div>
      </main>

      <ChildNav />
    </>
  );
}
