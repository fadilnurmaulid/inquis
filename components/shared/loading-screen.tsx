/**
 * LoadingScreen — FND-014 / FR-011
 * Full-screen loading state with animated INQUIS identity.
 * Never shows a blank page (ui-guidelines.md).
 */

import { cn } from "@/lib/utils";

interface LoadingScreenProps {
  message?: string;
  className?: string;
  /** compact = small inline spinner, full = full-screen overlay */
  variant?: "full" | "compact";
}

export function LoadingScreen({
  message = "Memuat...",
  className,
  variant = "full",
}: LoadingScreenProps) {
  if (variant === "compact") {
    return (
      <div className={cn("flex items-center justify-center gap-2 py-8", className)}>
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        <span className="text-sm text-muted-foreground">{message}</span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex min-h-[60vh] flex-col items-center justify-center gap-4",
        className
      )}
    >
      <div className="relative h-16 w-16">
        <div className="animate-pulse-ring absolute inset-0 rounded-full bg-primary/20" />
        <div className="relative flex h-16 w-16 animate-float items-center justify-center rounded-full bg-primary shadow-lg">
          <span className="font-display text-2xl font-bold text-white">Q</span>
        </div>
      </div>
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
}
