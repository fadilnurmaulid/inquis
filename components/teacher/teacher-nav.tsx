"use client";

/**
 * TeacherNav — sidebar navigation for the teacher panel.
 * Responsive: sidebar on lg+, bottom bar on mobile.
 */

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, LogOut, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { logout } from "@/lib/services/auth.service";

const NAV_ITEMS = [
  { href: "/teacher/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/about", icon: BookOpen, label: "Metode Inkuiri" },
];

export function TeacherNav() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden w-56 flex-shrink-0 border-r bg-white lg:flex lg:flex-col">
        <div className="flex h-full flex-col p-4">
          {/* Logo */}
          <div className="mb-8 flex items-center gap-2.5 px-2 pt-2">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-xl
                         bg-gradient-to-br from-inquis-sky to-inquis-ocean text-base font-bold text-white shadow-sm"
            >
              Q
            </div>
            <div>
              <p className="font-display text-sm font-bold text-gray-800 leading-none">
                INQUIS
              </p>
              <p className="text-[10px] font-medium text-gray-400 leading-none mt-0.5">
                Panel Guru
              </p>
            </div>
          </div>

          {/* Nav items */}
          <nav className="flex-1 space-y-1" aria-label="Navigasi guru">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const active = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex min-h-[44px] items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                    active
                      ? "bg-primary/10 text-primary shadow-sm"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  <Icon className="h-4.5 w-4.5 shrink-0" aria-hidden />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="border-t pt-3">
            <form action={logout}>
              <button
                type="submit"
                className="flex min-h-[44px] w-full items-center gap-3 rounded-xl px-3 py-2
                           text-sm font-medium text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors"
              >
                <LogOut className="h-4.5 w-4.5 shrink-0" aria-hidden />
                Keluar
              </button>
            </form>
          </div>
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="flex items-center justify-between border-b bg-white px-4 py-3 lg:hidden">
        <div className="flex items-center gap-2">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-lg
                       bg-gradient-to-br from-inquis-sky to-inquis-ocean text-sm font-bold text-white"
          >
            Q
          </div>
          <span className="font-display font-bold text-gray-800">INQUIS Guru</span>
        </div>
        <form action={logout}>
          <button
            type="submit"
            className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm text-gray-500
                       hover:bg-gray-100 transition-colors min-h-0 min-w-0"
          >
            <LogOut className="h-4 w-4" aria-hidden />
            Keluar
          </button>
        </form>
      </header>
    </>
  );
}
