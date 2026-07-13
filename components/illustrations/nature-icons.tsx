/**
 * Nature illustration placeholders — FND (graphics audit).
 *
 * A consistent, hand-drawn-feeling flat icon set for the environmental
 * objects used across gameplay (leaves, trees, flowers, waste, weather,
 * animals). These replace bare emoji glyphs in core gameplay so the app
 * doesn't depend on the platform's emoji font for its primary visuals.
 *
 * Design language: rounded shapes, soft flat fills, 2 tones per icon
 * (a base color + a shade), matching the app's rounded-2xl/3xl, friendly
 * aesthetic. Every icon takes the same props so they're interchangeable.
 *
 * These are intentionally simple — meant to be swapped for real illustrated
 * artwork later (see public/assets/README.md) without changing any call
 * site, since the prop contract (size, className) stays the same.
 */

export interface NatureIconProps {
  size?: number;
  className?: string;
}

export function LeafIcon({ size = 40, className }: NatureIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" className={className} aria-hidden>
      <path d="M20 4C10 6 6 16 8 26c1 5 6 9 12 8 8-1 14-9 14-20 0-4-2-8-4-10-3 3-6 4-10 0z" fill="#4ECB71" />
      <path d="M20 4c2 8 1 18-6 26" stroke="#2E9E52" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function TreeIcon({ size = 40, className }: NatureIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" className={className} aria-hidden>
      <rect x="17" y="24" width="6" height="12" rx="2" fill="#8B5E34" />
      <circle cx="20" cy="16" r="13" fill="#4ECB71" />
      <circle cx="12" cy="20" r="8" fill="#3FB863" />
      <circle cx="28" cy="20" r="8" fill="#3FB863" />
    </svg>
  );
}

export function FlowerIcon({ size = 40, className }: NatureIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" className={className} aria-hidden>
      <circle cx="20" cy="12" r="6" fill="#FFD166" />
      <circle cx="12" cy="18" r="6" fill="#FF8FA3" />
      <circle cx="28" cy="18" r="6" fill="#FF8FA3" />
      <circle cx="15" cy="26" r="6" fill="#FF8FA3" />
      <circle cx="25" cy="26" r="6" fill="#FF8FA3" />
      <circle cx="20" cy="20" r="6" fill="#FFB703" />
      <rect x="18.5" y="24" width="3" height="12" rx="1.5" fill="#4ECB71" />
    </svg>
  );
}

export function SproutIcon({ size = 40, className }: NatureIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" className={className} aria-hidden>
      <path d="M20 34V18" stroke="#2E9E52" strokeWidth="3" strokeLinecap="round" />
      <path d="M20 20c0-7-6-10-12-9 0 7 5 11 12 9z" fill="#4ECB71" />
      <path d="M20 16c0-6 5-9 11-8 0 6-5 10-11 8z" fill="#6FDB8C" />
    </svg>
  );
}

export function SunIcon({ size = 40, className }: NatureIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" className={className} aria-hidden>
      <circle cx="20" cy="20" r="9" fill="#FFD166" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <rect
          key={deg}
          x="19"
          y="2"
          width="2"
          height="7"
          rx="1"
          fill="#FFB703"
          transform={`rotate(${deg} 20 20)`}
        />
      ))}
    </svg>
  );
}

export function CloudIcon({ size = 40, className }: NatureIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" className={className} aria-hidden>
      <ellipse cx="16" cy="22" rx="9" ry="7" fill="#CBD5E1" />
      <ellipse cx="25" cy="19" rx="10" ry="8" fill="#E2E8F0" />
      <ellipse cx="22" cy="25" rx="11" ry="6" fill="#F1F5F9" />
    </svg>
  );
}

export function RainIcon({ size = 40, className }: NatureIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" className={className} aria-hidden>
      <ellipse cx="20" cy="14" rx="11" ry="8" fill="#94A3B8" />
      {[12, 20, 28].map((x, i) => (
        <path
          key={x}
          d={`M${x} 24c-2 3-2 6 0 8s2-5 0-8z`}
          fill="#60B8FF"
          opacity={0.5 + i * 0.2}
        />
      ))}
    </svg>
  );
}

export function WaterDropIcon({ size = 40, className }: NatureIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" className={className} aria-hidden>
      <path d="M20 4c6 9 11 15 11 21a11 11 0 1 1-22 0c0-6 5-12 11-21z" fill="#60B8FF" />
      <ellipse cx="16" cy="24" rx="3" ry="4" fill="#BFE3FF" opacity="0.7" />
    </svg>
  );
}

export function FootprintIcon({ size = 40, className }: NatureIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" className={className} aria-hidden>
      <ellipse cx="20" cy="26" rx="7" ry="10" fill="#8B5E34" />
      <circle cx="14" cy="12" r="3" fill="#8B5E34" />
      <circle cx="20" cy="9" r="3.3" fill="#8B5E34" />
      <circle cx="26" cy="12" r="3" fill="#8B5E34" />
    </svg>
  );
}

export function RecycleBinIcon({ size = 40, className }: NatureIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" className={className} aria-hidden>
      <rect x="10" y="14" width="20" height="20" rx="3" fill="#4ECB71" />
      <rect x="8" y="10" width="24" height="4" rx="2" fill="#2E9E52" />
      <rect x="16" y="6" width="8" height="4" rx="1.5" fill="#2E9E52" />
      <path
        d="M20 18l3 4h-2l0 6h-2v-6h-2l3-4z"
        fill="#F0FFF4"
      />
    </svg>
  );
}

export function BottleIcon({ size = 40, className }: NatureIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" className={className} aria-hidden>
      <rect x="16" y="4" width="8" height="6" rx="1.5" fill="#60B8FF" />
      <path d="M15 10h10l3 6v18a3 3 0 0 1-3 3H15a3 3 0 0 1-3-3V16l3-6z" fill="#93D5FF" />
      <rect x="13" y="20" width="14" height="8" fill="#60B8FF" opacity="0.6" />
    </svg>
  );
}

export function BirdIcon({ size = 40, className }: NatureIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" className={className} aria-hidden>
      <ellipse cx="19" cy="21" rx="11" ry="9" fill="#60B8FF" />
      <circle cx="27" cy="15" r="5" fill="#60B8FF" />
      <path d="M31 15l5 2-5 1z" fill="#FFB703" />
      <circle cx="29" cy="13.5" r="1" fill="#1F2937" />
      <path d="M10 22c-3 1-5 4-4 7 3-1 5-3 6-6z" fill="#FFD166" />
    </svg>
  );
}

export function FishIcon({ size = 40, className }: NatureIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" className={className} aria-hidden>
      <ellipse cx="18" cy="20" rx="12" ry="8" fill="#60B8FF" />
      <path d="M30 20l7-6v12l-7-6z" fill="#3D9CE0" />
      <circle cx="12" cy="18" r="1.6" fill="#1F2937" />
      <path d="M6 20c2-2 4-2 6 0-2 2-4 2-6 0z" fill="#93D5FF" />
    </svg>
  );
}

export function AnimalHomeIcon({ size = 40, className }: NatureIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" className={className} aria-hidden>
      <path d="M20 5l15 12v3H5v-3z" fill="#8B5E34" />
      <rect x="9" y="20" width="22" height="14" rx="2" fill="#C69A6D" />
      <rect x="17" y="24" width="6" height="10" rx="1" fill="#5C3A21" />
    </svg>
  );
}

/**
 * Returns true if a dedicated nature illustration exists for this emoji.
 * Callers rendering a group of items (e.g. a grid of options) should check
 * this for every item first, and only use the illustration when every item
 * in the group has one — otherwise fall back to emoji for the whole group
 * to keep visual consistency (see EmojiAsset's forceEmoji prop).
 */
export function hasNatureIconFor(emoji: string | undefined): boolean {
  return getNatureIcon(emoji) !== null;
}

/**
 * Resolves a gameplay emoji to a matching nature illustration component.
 * Falls back to null (caller should render the emoji glyph) when there's
 * no dedicated illustration yet — keeps this additive and safe.
 */
export function getNatureIcon(emoji: string | undefined): React.ComponentType<NatureIconProps> | null {
  switch (emoji) {
    case "🍃":
    case "🍂":
    case "🍁":
      return LeafIcon;
    case "🌳":
    case "🌲":
      return TreeIcon;
    case "🌸":
    case "🌻":
    case "🌷":
      return FlowerIcon;
    case "🌱":
    case "🌰":
      return SproutIcon;
    case "☀️":
    case "🌞":
      return SunIcon;
    case "☁️":
    case "🌤️":
      return CloudIcon;
    case "🌧️":
    case "☔":
      return RainIcon;
    case "💧":
    case "🌊":
      return WaterDropIcon;
    case "🐾":
    case "👣":
    case "🦶":
      return FootprintIcon;
    case "♻️":
      return RecycleBinIcon;
    case "🥤":
    case "🍾":
      return BottleIcon;
    case "🐦":
    case "🐤":
      return BirdIcon;
    case "🐟":
    case "🐠":
    case "🐬":
      return FishIcon;
    case "🏠":
    case "🏚️":
      return AnimalHomeIcon;
    default:
      return null;
  }
}
