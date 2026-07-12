/**
 * Emoji → illustration asset lookup.
 *
 * This map is intentionally empty by default. Every emoji already used in
 * `lib/activities/definitions.ts` and elsewhere continues to render as a
 * plain emoji glyph via <EmojiAsset> until a real illustration is added
 * here. See `public/assets/README.md` for how to add artwork.
 *
 * Example (once real art exists):
 *   "🦋": "/assets/companions/world-1.svg",
 *   "🍃": "/assets/illustrations/leaf-green.svg",
 */
export const EMOJI_ASSET_MAP: Record<string, string> = {
  // (empty — populate as illustrations become available)
};

/** Returns the asset path for an emoji, or null if no illustration exists yet. */
export function getEmojiAsset(emoji: string | undefined): string | null {
  if (!emoji) return null;
  return EMOJI_ASSET_MAP[emoji] ?? null;
}
