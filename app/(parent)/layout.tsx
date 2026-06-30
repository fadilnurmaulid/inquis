/**
 * Parent interface layout — FND-011
 * Clean, calm design suited for adults reviewing child progress.
 */

import { requireRole } from "@/lib/services/auth.service";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "INQUIS · Portal Orang Tua",
    template: "%s | Portal Orang Tua",
  },
};

export default async function ParentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireRole(["PARENT", "ADMIN"]);
  return <>{children}</>;
}
