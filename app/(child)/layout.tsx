/**
 * Child interface layout — FND-011
 * Wraps all /play routes. Enforces CHILD role, provides child-specific context.
 * Child UI principles from ui-guidelines.md applied here.
 */

import { requireRole } from "@/lib/services/auth.service";
import { getChildProfile } from "@/lib/services/auth.service";
import { AudioProvider } from "@/components/providers/audio-provider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "INQUIS — Bermain dan Belajar",
    template: "%s | INQUIS",
  },
};

export default async function ChildLayout({ children }: { children: React.ReactNode }) {
  const user = await requireRole(["CHILD"]);
  const child = await getChildProfile(user.id);

  return (
    <AudioProvider>
      <div
        className="child-screen min-h-screen bg-gradient-to-b from-sky-100 to-blue-50"
        data-child-id={child?.id}
      >
        {children}
      </div>
    </AudioProvider>
  );
}
