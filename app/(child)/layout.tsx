/**
 * Child interface layout — FND-011
 * Wraps all /play routes. Enforces CHILD role, provides audio context.
 * Applies child-screen utilities from ui-guidelines.md.
 */

import { requireRole } from "@/lib/services/auth.service";
import { AudioProvider } from "@/components/providers/audio-provider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "INQUIS · Bermain dan Belajar",
    template: "%s | INQUIS",
  },
};

export default async function ChildLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireRole(["CHILD"]);

  return (
    <AudioProvider>
      <div className="child-screen min-h-screen">
        {children}
      </div>
    </AudioProvider>
  );
}
