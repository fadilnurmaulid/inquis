/**
 * Child Profile page — /play/profile
 * Shows child info, progress summary, and logout.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { requireRole, getChildProfile, logout } from "@/lib/services/auth.service";
import { getChildDashboardData } from "@/lib/services/dashboard.service";
import { Button } from "@/components/ui/button";
import { ChildNav } from "@/components/dashboard/child-nav";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { WORLDS } from "@/types";

export const metadata: Metadata = { title: "Profilku" };

export default async function ChildProfilePage() {
  const user = await requireRole(["CHILD"]);
  const child = await getChildProfile(user.id);
  const data = await getChildDashboardData(user.id);

  const totalActivities = WORLDS.reduce((sum, w) => sum + w.activityCount, 0);
  const progressPercent =
    totalActivities > 0
      ? Math.round((data.totalCompletedActivities / totalActivities) * 100)
      : 0;

  return (
    <>
      <main className="min-h-screen px-4 pb-24 pt-12">
        <div className="mx-auto max-w-lg space-y-6">
          {/* Profile header */}
          <div className="flex flex-col items-center gap-4 text-center">
            <Avatar className="h-24 w-24 shadow-xl">
              <AvatarImage src={child?.avatarUrl ?? undefined} alt="" />
              <AvatarFallback className="bg-gradient-to-br from-primary to-inquis-sky text-4xl">
                🧒
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h1 className="font-display text-2xl font-bold text-gray-800">
                {child?.displayName ?? "Pelajar INQUIS"}
              </h1>
              <p className="text-sm text-gray-500">{child?.name}</p>
            </div>
          </div>

          {/* Progress summary */}
          <section className="rounded-3xl bg-white/70 p-5 shadow-sm">
            <h2 className="font-display text-lg font-bold text-gray-800">Kemajuan Belajar</h2>
            <div className="mt-4 space-y-4">
              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-gray-600">Aktivitas selesai</span>
                  <span className="font-semibold text-primary">
                    {data.totalCompletedActivities}/{totalActivities}
                  </span>
                </div>
                <Progress value={progressPercent} className="h-3" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-primary/10 p-3 text-center">
                  <p className="font-display text-2xl font-bold text-primary">
                    {data.completedWorlds}
                  </p>
                  <p className="text-xs text-gray-500">Dunia selesai</p>
                </div>
                <div className="rounded-2xl bg-inquis-grass/10 p-3 text-center">
                  <p className="font-display text-2xl font-bold text-inquis-grass">
                    {data.totalWorlds - data.completedWorlds}
                  </p>
                  <p className="text-xs text-gray-500">Dunia tersisa</p>
                </div>
              </div>
            </div>
          </section>

          {/* World breakdown */}
          <section className="rounded-3xl bg-white/70 p-5 shadow-sm">
            <h2 className="font-display text-lg font-bold text-gray-800">Per Dunia</h2>
            <ul className="mt-3 space-y-3">
              {data.worlds.map((world) => {
                const pct =
                  world.totalActivities > 0
                    ? Math.round((world.completedActivities / world.totalActivities) * 100)
                    : 0;
                return (
                  <li key={world.worldId} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-gray-700">{world.titleBahasa}</span>
                      <span className="text-gray-500">
                        {world.completedActivities}/{world.totalActivities}
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${pct}%`, background: world.themeColor }}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>

          {/* Actions */}
          <div className="flex flex-col gap-3">
            <Button asChild variant="childPrimary" size="lg">
              <Link href="/play/home">🗺️ Ke Peta Dunia</Link>
            </Button>
            <form action={logout}>
              <Button
                type="submit"
                variant="ghost"
                size="lg"
                className="w-full text-destructive hover:text-destructive"
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
