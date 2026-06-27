/**
 * Skeleton loader — FND-013 / FND-019
 * Used for all loading states to avoid blank screens (ui-guidelines.md).
 */

import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  );
}

export { Skeleton };
