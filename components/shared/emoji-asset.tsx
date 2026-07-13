/**
 * EmojiAsset — presentation-only bridge between the current emoji-based
 * gameplay content and illustrated artwork.
 *
 * Resolution order:
 *   1. A mapped file-based illustration in `lib/assets/emoji-map.ts`
 *      (for when real artwork files are dropped into public/assets/).
 *   2. A built-in SVG nature-icon placeholder (`components/illustrations`)
 *      for common environmental objects — leaves, trees, flowers, etc.
 *   3. The emoji glyph itself, exactly as before.
 *
 * This lets real artwork be swapped in later (see
 * `public/assets/README.md`) without any changes to gameplay code.
 */

import Image from "next/image";
import { getEmojiAsset } from "@/lib/assets/emoji-map";
import { getNatureIcon } from "@/components/illustrations/nature-icons";
import { cn } from "@/lib/utils";

interface EmojiAssetProps {
  emoji: string | undefined;
  /** Accessible label. Omit (or pass "") for purely decorative emoji. */
  label?: string;
  /** Tailwind size classes, e.g. "h-10 w-10". Also used as the emoji font-size basis. */
  className?: string;
  /** Emoji glyph font-size class, e.g. "text-4xl". Ignored when an image/icon asset renders. */
  textClassName?: string;
  size?: number;
  /**
   * When true, always renders the emoji glyph even if an icon/asset match
   * exists. Use this when rendering a group of items where not every
   * emoji has a matching illustration — mixing SVG icons and emoji
   * glyphs in the same grid looks inconsistent, so callers should check
   * group-wide availability first (see hasNatureIconFor) and pass this
   * when the group isn't fully covered.
   */
  forceEmoji?: boolean;
}

export function EmojiAsset({
  emoji,
  label,
  className,
  textClassName = "text-4xl",
  size = 40,
  forceEmoji = false,
}: EmojiAssetProps) {
  const assetPath = forceEmoji ? null : getEmojiAsset(emoji);

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

  const NatureIcon = forceEmoji ? null : getNatureIcon(emoji);
  if (NatureIcon) {
    return (
      <span
        role={label ? "img" : undefined}
        aria-label={label}
        aria-hidden={!label}
        className="inline-flex select-none items-center justify-center"
      >
        <NatureIcon size={size} className={className} />
      </span>
    );
  }

  // Fallback: render the emoji glyph exactly as the app does today.
  return (
    <span className={cn(textClassName, className)} aria-hidden={!label} role={label ? "img" : undefined} aria-label={label}>
      {emoji}
    </span>
  );
}
