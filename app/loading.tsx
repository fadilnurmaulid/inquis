/**
 * Global route loading fallback — FND-019 / FR-011
 * Shown during route transitions. Never a blank page.
 */

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        {/* Animated INQUIS logo mark */}
        <div className="relative h-16 w-16">
          <div className="animate-pulse-ring absolute inset-0 rounded-full bg-primary/30" />
          <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-primary">
            <span className="font-display text-2xl font-bold text-white">Q</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">Memuat...</p>
      </div>
    </div>
  );
}
