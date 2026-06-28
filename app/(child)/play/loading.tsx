import { WorldMapSkeleton } from "@/components/dashboard/world-map-skeleton";

export default function PlayLoading() {
  return (
    <div className="min-h-screen pb-24 pt-6">
      <div className="mx-auto max-w-lg space-y-4 px-4">
        <div className="h-16 animate-pulse rounded-2xl bg-white/60" />
        <WorldMapSkeleton />
      </div>
    </div>
  );
}
