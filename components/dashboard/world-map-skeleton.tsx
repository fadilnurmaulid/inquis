/**
 * WorldMapSkeleton — DASH-013
 * Skeleton loader shown while dashboard data fetches.
 * Matches WorldMap layout exactly — no layout shift on load.
 */

import { Skeleton } from "@/components/ui/skeleton";

export function WorldMapSkeleton() {
  return (
    <div className="w-full space-y-4" aria-busy="true" aria-label="Memuat peta dunia...">
      {/* ProgressJourney skeleton */}
      <div className="rounded-3xl bg-white/60 p-5">
        <div className="mb-4 flex items-center justify-between">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex flex-1 items-center gap-1">
              <div className="flex flex-col items-center gap-1">
                <Skeleton className="h-12 w-12 rounded-full" />
                <Skeleton className="h-3 w-10" />
              </div>
              {i < 4 && <Skeleton className="h-1 flex-1" />}
            </div>
          ))}
        </div>
      </div>

      {/* ContinueCard skeleton */}
      <Skeleton className="h-24 w-full rounded-3xl" />

      {/* WorldCard skeletons — 2×2 grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-40 w-full rounded-3xl" />
        ))}
      </div>
    </div>
  );
}
