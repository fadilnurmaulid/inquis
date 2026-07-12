/**
 * Child Dashboard — World Map (DASH-001 through DASH-015)
 * Server Component: fetches all dashboard data server-side, zero client waterfalls.
 * Layout (FR-DASH-002): Companion → Progress Journey → World Map → Continue Learning
 */

import type { Metadata } from "next";
import { Suspense } from "react";
import { requireRole } from "@/lib/services/auth.service";
import { getChildDashboardData } from "@/lib/services/dashboard.service";
import { WorldMap } from "@/components/dashboard/world-map";
import { ProgressJourney } from "@/components/dashboard/progress-journey";
import { ContinueCard } from "@/components/dashboard/continue-card";
import { ChildNav } from "@/components/dashboard/child-nav";
import { WorldMapSkeleton } from "@/components/dashboard/world-map-skeleton";
import { DashboardEmpty } from "@/components/dashboard/dashboard-empty";
import { AchievementRow } from "@/components/dashboard/achievement-badge";
import { EmojiAsset } from "@/components/shared/emoji-asset";
import { computeAchievements } from "@/lib/achievements";
import { WORLDS } from "@/types";

export const metadata: Metadata = { title: "Peta Dunia" };

// Revalidate on every request so progress is always fresh (FR-DASH-009)
// World companion emojis
const COMPANION_EMOJI: Record<string, string> = {
  "world-1": "🦋",
  "world-2": "🐢",
  "world-3": "🔮",
  "world-4": "🧪",
};

export const dynamic = "force-dynamic";

export default async function PlayHomePage() {
  const user = await requireRole(["CHILD"]);
  const data = await getChildDashboardData(user.id);

  const hasAnyProgress = data.totalCompletedActivities > 0;
  const achievements = computeAchievements({
    totalCompletedActivities: data.totalCompletedActivities,
    completedWorlds: data.completedWorlds,
    totalWorlds: data.totalWorlds,
  });

  // FR-DASH-008: Determine next activity assets to hint for preloading
  const nextActivity = data.activeSession ?? data.nextRecommended;
  const nextWorldDef = nextActivity
    ? WORLDS.find((w) => w.id === nextActivity.worldId)
    : null;

  return (
    <>
      {/* FR-DASH-008: Asset preload hints for next activity world */}
      {nextWorldDef && (
        <link
          rel="preconnect"
          href="https://storage.googleapis.com"
          // Companion illustration / audio assets will be served from storage CDN
        />
      )}

      {/* Main scrollable area — padding-bottom leaves room for fixed ChildNav */}
      <main className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50/50 to-indigo-50 pb-24">
        {/* Dashboard header */}
        <header className="sticky top-0 z-30 bg-gradient-to-b from-sky-100 to-transparent px-4 pb-2 pt-6 lg:px-8">
          <div className="mx-auto flex max-w-lg items-center justify-between lg:max-w-5xl">
            <div>
              <p className="text-sm text-gray-500">Halo,</p>
              <h1 className="font-display text-2xl font-bold text-gray-800">
                {data.child.displayName}! 👋
              </h1>
            </div>
            {/* World completion count badge */}
            <div className="flex items-center gap-2 rounded-2xl bg-white/70 px-3 py-2 shadow-sm">
              <span className="text-xl" aria-hidden>🌍</span>
              <div className="text-right">
                <p className="font-display text-lg font-bold leading-none text-primary">
                  {data.completedWorlds}/{data.totalWorlds}
                </p>
                <p className="text-xs text-gray-500">dunia</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="mx-auto max-w-lg space-y-4 px-4 pt-2 lg:max-w-5xl lg:px-8">
          {/* FR-DASH-002: Companion character placeholder (shown always) */}
          <div
            className="flex items-center gap-4 rounded-3xl bg-white/60 p-4 shadow-sm"
            aria-label="Karakter pendamping"
          >
            <div
              className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl shadow-sm"
              style={{
                background: nextWorldDef
                  ? `linear-gradient(135deg, ${nextWorldDef.themeColor}cc, ${nextWorldDef.themeColor}66)`
                  : "linear-gradient(135deg, #60B8FFcc, #60B8FF66)",
              }}
              aria-hidden
            >
              <EmojiAsset
                emoji={COMPANION_EMOJI[nextWorldDef?.id ?? ""] ?? "🦉"}
                textClassName="text-3xl"
                size={44}
              />
            </div>
            <div>
              <p className="font-display font-bold text-gray-800">
                {nextWorldDef?.companionName ?? "Quisy"}
              </p>
              <p className="text-sm text-gray-500">
                {hasAnyProgress
                  ? "Selamat datang kembali! Ayo lanjutkan petualanganmu 🚀"
                  : "Hai! Aku siap menemanimu belajar hari ini 🌟"}
              </p>
            </div>
          </div>

          <Suspense fallback={<WorldMapSkeleton />}>
            {hasAnyProgress ? (
              <div className="lg:grid lg:grid-cols-3 lg:items-start lg:gap-6 lg:space-y-0">
                {/* Main column: journey + world map */}
                <div className="space-y-4 lg:col-span-2">
                  {/* Progress journey path (FR-DASH-005) */}
                  <ProgressJourney
                    worlds={data.worlds}
                    totalCompletedActivities={data.totalCompletedActivities}
                  />

                  {/* World map grid (FR-DASH-002, FR-DASH-003) */}
                  <section>
                    <h2 className="mb-3 font-display text-lg font-bold text-gray-800">
                      🗺️ Peta Dunia
                    </h2>
                    <WorldMap
                      worlds={data.worlds}
                      nextRecommended={data.nextRecommended}
                      activeSession={data.activeSession}
                    />
                  </section>
                </div>

                {/* Sidebar column: continue + achievements (desktop only reflow) */}
                <div className="mt-4 space-y-4 lg:col-span-1 lg:mt-0">
                  {/* Continue / next recommended activity (FR-DASH-006) */}
                  <ContinueCard
                    activeSession={data.activeSession}
                    nextRecommended={data.nextRecommended}
                  />

                  <AchievementRow achievements={achievements} />
                </div>
              </div>
            ) : (
              <>
                {/* New learner — show empty state + world map (locked worlds visible) */}
                <DashboardEmpty />
                <section>
                  <h2 className="mb-3 font-display text-lg font-bold text-gray-800">
                    🗺️ Peta Dunia
                  </h2>
                  <WorldMap
                    worlds={data.worlds}
                    nextRecommended={data.nextRecommended}
                    activeSession={null}
                  />
                </section>
              </>
            )}
          </Suspense>
        </div>
      </main>

      {/* Fixed bottom navigation (FR-DASH-007) */}
      <ChildNav />
    </>
  );
}
