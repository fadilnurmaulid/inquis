"use client";

/**
 * TeacherNav — sidebar navigation for teacher panel (DASH-009).
 */

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { logout } from "@/lib/services/auth.service";

const NAV_ITEMS = [
  { href: "/teacher/dashboard", icon: LayoutDashboard, label: "Dashboard" },
];

export function TeacherNav() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-56 flex-shrink-0 border-r bg-white lg:block">
      <div className="flex h-full flex-col p-4">
        <div className="mb-6 flex items-center gap-2 px-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white">
            Q
          </div>
          <span className="font-display font-bold text-gray-800">INQUIS Guru</span>
        </div>
        <nav className="flex-1 space-y-1" aria-label="Navigasi guru">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex min-h-[44px] items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-gray-600 hover:bg-gray-100"
                )}
                aria-current={active ? "page" : undefined}
              >
                <Icon className="h-5 w-5" aria-hidden />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <form action={logout}>
          <button
            type="submit"
            className="flex min-h-[44px] w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          >
            <LogOut className="h-5 w-5" aria-hidden />
            Keluar
          </button>
        </form>
      </div>
    </aside>
  );
}
