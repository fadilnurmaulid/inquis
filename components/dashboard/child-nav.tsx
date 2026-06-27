/**
 * ChildNav — DASH-009
 * Bottom navigation bar for the child interface.
 * Icon-first, no complex menus (ui-guidelines.md).
 * Includes: Home, Profile, Audio control (mute toggle).
 */

"use client";

import { usePathname, useRouter } from "next/navigation";
import { Home, User, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAudio } from "@/components/providers/audio-provider";

interface NavItem {
  href: string;
  icon: React.ElementType;
  label: string;
  exact?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { href: "/play/home", icon: Home, label: "Beranda", exact: true },
  { href: "/play/profile", icon: User, label: "Profil" },
];

export function ChildNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { isMuted, toggleMute } = useAudio();

  function isActive(item: NavItem) {
    return item.exact ? pathname === item.href : pathname.startsWith(item.href);
  }

  return (
    <nav
      aria-label="Navigasi utama"
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/30 bg-white/80 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-md items-center justify-around px-4 py-2">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = isActive(item);
          return (
            <button
              key={item.href}
              onClick={() => router.push(item.href)}
              className={cn(
                // Minimum 44px touch target (ui-guidelines.md)
                "flex min-h-[56px] min-w-[64px] flex-col items-center justify-center gap-1",
                "rounded-2xl px-4 py-2 transition-all duration-fast",
                active
                  ? "bg-primary/10 text-primary"
                  : "text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              )}
              aria-label={item.label}
              aria-current={active ? "page" : undefined}
            >
              <Icon
                className={cn("h-6 w-6 transition-transform", active && "scale-110")}
                aria-hidden
              />
              <span className="text-[10px] font-semibold leading-none">{item.label}</span>
            </button>
          );
        })}

        {/* Audio mute toggle */}
        <button
          onClick={toggleMute}
          className={cn(
            "flex min-h-[56px] min-w-[64px] flex-col items-center justify-center gap-1",
            "rounded-2xl px-4 py-2 transition-all duration-fast",
            isMuted
              ? "bg-destructive/10 text-destructive"
              : "text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          )}
          aria-label={isMuted ? "Aktifkan suara" : "Matikan suara"}
          aria-pressed={isMuted}
        >
          {isMuted ? (
            <VolumeX className="h-6 w-6" aria-hidden />
          ) : (
            <Volume2 className="h-6 w-6" aria-hidden />
          )}
          <span className="text-[10px] font-semibold leading-none">
            {isMuted ? "Mute" : "Suara"}
          </span>
        </button>
      </div>
    </nav>
  );
}
