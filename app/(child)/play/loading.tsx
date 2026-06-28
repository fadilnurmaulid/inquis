/**
 * Play route loading skeleton — matches exact layout to avoid shift.
 */

import { WorldMapSkeleton } from "@/components/dashboard/world-map-skeleton";

export default function PlayLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50/50 to-indigo-50 pb-24">
      {/* Header skeleton */}
      <div className="sticky top-0 z-30 bg-gradient-to-b from-sky-100/80 to-transparent px-4 pb-2 pt-6">
        <div className="mx-auto flex max-w-lg items-center justify-between">
          <div className="space-y-1.5">
            <div className="h-3.5 w-12 animate-pulse rounded-full bg-gray-200" />
            <div className="h-7 w-32 animate-pulse rounded-xl bg-gray-200" />
          </div>
          <div className="h-12 w-16 animate-pulse rounded-2xl bg-white/60" />
        </div>
      </div>

      {/* Content skeleton */}
      <div className="mx-auto max-w-lg space-y-4 px-4 pt-2">
        {/* Companion skeleton */}
        <div className="flex items-center gap-4 rounded-3xl bg-white/60 p-4">
          <div className="h-16 w-16 animate-pulse rounded-2xl bg-gray-200" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-24 animate-pulse rounded-full bg-gray-200" />
            <div className="h-3.5 w-48 animate-pulse rounded-full bg-gray-100" />
          </div>
        </div>
        <WorldMapSkeleton />
      </div>
    </div>
  );
}
