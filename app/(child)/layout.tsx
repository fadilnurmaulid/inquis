/**
 * Tata letak area anak.
 *
 * Membungkus seluruh /play: memastikan perannya CHILD dan menyediakan
 * konteks suara untuk navigasi bawah.
 */

import type { Metadata } from "next";
import { requireRole } from "@/lib/services/auth.service";
import { AudioProvider } from "@/components/providers/audio-provider";

export const metadata: Metadata = {
  title: { default: "INQUIS", template: "%s · INQUIS" },
};

export default async function ChildLayout({ children }: { children: React.ReactNode }) {
  await requireRole(["CHILD"]);

  return (
    <AudioProvider>
      <div className="min-h-screen">{children}</div>
    </AudioProvider>
  );
}
