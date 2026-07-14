/**
 * Global route loading fallback — never shows a blank page.
 * Animated INQUIS brand mark with pulse ring.
 */

import { InquisLogoMark } from "@/components/shared/inquis-logo-mark";

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-5 bg-gradient-to-br from-sky-50 to-blue-100">
      {/* Animated INQUIS logo mark */}
      <div className="relative">
        <div className="absolute inset-0 animate-pulse-ring rounded-full bg-primary/30" />
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-inquis-sky to-inquis-ocean shadow-2xl shadow-primary/30">
          <InquisLogoMark size={38} />
        </div>
      </div>
      <div className="space-y-1 text-center">
        <p className="font-display text-base font-semibold text-gray-700">INQUIS</p>
        <p className="text-sm text-gray-400">Memuat...</p>
      </div>
    </div>
  );
}
