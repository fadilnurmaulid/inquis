/**
 * EmojiAsset — presentation-only bridge between the current emoji-based
 * gameplay content and future illustrated artwork.
 *
 * Renders an <img> when a mapped illustration exists in
 * `lib/assets/emoji-map.ts`; otherwise renders the emoji glyph exactly as
 * before. This lets real artwork be swapped in later (see
 * `public/assets/README.md`) without any changes to gameplay code.
 */

import Image from "next/image";
import { getEmojiAsset } from "@/lib/assets/emoji-map";
import { cn } from "@/lib/utils";

interface EmojiAssetProps {
  emoji: string | undefined;
  /** Accessible label. Omit (or pass "") for purely decorative emoji. */
  label?: string;
  /** Tailwind size classes, e.g. "h-10 w-10". Also used as the emoji font-size basis. */
  className?: string;
  /** Emoji glyph font-size class, e.g. "text-4xl". Ignored when an image asset renders. */
  textClassName?: string;
  size?: number;
}

export function EmojiAsset({
  emoji,
  label,
  className,
  textClassName = "text-4xl",
  size = 40,
}: EmojiAssetProps) {
  const assetPath = getEmojiAsset(emoji);

  if (assetPath) {
    return (
      <Image
        src={assetPath}
        alt={label ?? ""}
        width={size}
        height={size}
        className={cn("select-none object-contain", className)}
        aria-hidden={!label}
      />
    );
  }

  // Fallback: render the emoji glyph exactly as the app does today.
  return (
    <span className={cn(textClassName, className)} aria-hidden={!label} role={label ? "img" : undefined} aria-label={label}>
      {emoji}
    </span>
  );
}
