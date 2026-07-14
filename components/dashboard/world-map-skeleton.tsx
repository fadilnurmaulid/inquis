/**
 * WorldMapSkeleton — DASH-013
 * Pixel-perfect skeleton matching the dashboard layout, including the
 * desktop two-column reflow (main content + sidebar) used on the real
 * loaded page, so there's no layout shift when data arrives on desktop.
 */

export function WorldMapSkeleton() {
  return (
    <div
      className="w-full lg:grid lg:grid-cols-3 lg:items-start lg:gap-6"
      aria-busy="true"
      aria-label="Memuat peta dunia..."
    >
      {/* Main column: journey + world map */}
      <div className="space-y-4 lg:col-span-2">
        {/* ProgressJourney skeleton */}
        <div className="rounded-3xl bg-white/60 p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div className="h-6 w-36 animate-pulse rounded-xl bg-gray-200" />
            <div className="h-6 w-24 animate-pulse rounded-full bg-gray-200" />
          </div>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-1 items-center">
                <div className="flex flex-col items-center gap-1.5">
                  <div className="h-12 w-12 animate-pulse rounded-full bg-gray-200" />
                  <div className="h-3 w-10 animate-pulse rounded-full bg-gray-100" />
                </div>
                {i < 4 && (
                  <div className="mx-1 h-1.5 flex-1 animate-pulse rounded-full bg-gray-100" />
                )}
              </div>
            ))}
          </div>
          <div className="mt-4 h-4 w-3/4 animate-pulse rounded-full bg-gray-100 mx-auto" />
        </div>

        {/* WorldCard grid skeletons */}
        <div>
          <div className="mb-3 h-6 w-28 animate-pulse rounded-xl bg-gray-200" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-44 animate-pulse rounded-3xl"
                style={{
                  background: `linear-gradient(135deg, #e5e7eb${i % 2 === 0 ? "dd" : "aa"}, #d1d5db88)`,
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Sidebar column: continue card + achievements */}
      <div className="mt-4 space-y-4 lg:col-span-1 lg:mt-0">
        {/* ContinueCard skeleton */}
        <div className="h-28 animate-pulse rounded-3xl bg-primary/20" />
        {/* AchievementRow skeleton */}
        <div className="rounded-3xl bg-white/60 p-4 shadow-sm">
          <div className="mb-3 h-5 w-24 animate-pulse rounded-lg bg-gray-200" />
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="aspect-square animate-pulse rounded-2xl bg-gray-200"
                style={{ animationDelay: `${i * 0.08}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
