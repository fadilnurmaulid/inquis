/**
 * Parent Dashboard — with current world, next activity, achievements.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { requireRole, getParentProfile } from "@/lib/services/auth.service";
import { getChildDashboardData } from "@/lib/services/dashboard.service";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/shared/page-header";
import { Progress } from "@/components/ui/progress";
import { AchievementRow, computeAchievements } from "@/components/dashboard/achievement-badge";
import { WORLDS } from "@/types";

export const metadata: Metadata = { title: "Dashboard Orang Tua" };
export const dynamic = "force-dynamic";

const TOTAL_ACTIVITIES = WORLDS.reduce((sum, w) => sum + w.activityCount, 0);

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
    children.map(async (child) => {
      const userRecord = await prisma.user.findFirst({
        where: { child: { id: child.id } },
        select: { id: true },
      });
      const dashboard = userRecord ? await getChildDashboardData(userRecord.id) : null;
      return { ...child, dashboard };
    })
  );

  return (
    <main className="p-6 lg:p-10">
      <PageHeader
        title={`Halo, ${parent?.name ?? "Orang Tua"}!`}
        description="Ringkasan kemajuan belajar anakmu"
      />

      {childrenWithData.length === 0 ? (
        <div className="mt-6 rounded-2xl border bg-white p-8 text-center text-muted-foreground shadow-sm">
          <p className="text-4xl">👧</p>
          <p className="mt-2 font-medium">Belum ada anak yang terhubung</p>
          <p className="text-sm">Minta guru untuk menghubungkan akun anakmu.</p>
        </div>
      ) : (
        <div className="mt-6 space-y-6">
          {childrenWithData.map((child) => {
            if (!child.dashboard) return null;
            const { dashboard: data } = child;
            const pct =
              TOTAL_ACTIVITIES > 0
                ? Math.round((data.totalCompletedActivities / TOTAL_ACTIVITIES) * 100)
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

            return (
              <div key={child.id} className="space-y-4">
                <div className="rounded-2xl border bg-white p-6 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-3xl">
                      🧒
                    </div>
                    <div>
                      <p className="font-display text-xl font-bold">{child.displayName}</p>
                      <p className="text-sm text-muted-foreground">{child.name}</p>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-4 sm:grid-cols-3">
                    <div className="rounded-xl bg-primary/5 p-4 text-center">
                      <p className="font-display text-2xl font-bold text-primary">{pct}%</p>
                      <p className="text-xs text-muted-foreground">Kemajuan Total</p>
                    </div>
                    <div className="rounded-xl bg-emerald-50 p-4 text-center">
                      <p className="font-display text-2xl font-bold text-emerald-600">
                        {data.completedWorlds}/{data.totalWorlds}
                      </p>
                      <p className="text-xs text-muted-foreground">Dunia Selesai</p>
                    </div>
                    <div className="rounded-xl bg-amber-50 p-4 text-center">
                      <p className="font-display text-lg font-bold text-amber-700 leading-tight">
                        {nextWorld?.titleBahasa ?? "—"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {nextSession
                          ? `Aktivitas ${nextSession.activityNumber} selanjutnya`
                          : "Semua selesai!"}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="mb-1 flex justify-between text-sm">
                      <span className="text-muted-foreground">Aktivitas</span>
                      <span className="font-semibold">
                        {data.totalCompletedActivities}/{TOTAL_ACTIVITIES}
                      </span>
                    </div>
                    <Progress value={pct} className="h-3" />
                  </div>
                </div>

                <AchievementRow achievements={achievements} />
              </div>
            );
          })}
        </div>
      )}

      <p className="mt-8 text-center text-xs text-muted-foreground">
        <Link href="/about" className="hover:underline">
          Pelajari Metode Inkuiri
        </Link>
        {" · "}
        <Link href="/" className="hover:underline">
          Beranda
        </Link>
      </p>
    </main>
  );
}
