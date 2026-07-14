/**
 * InquisLogoMark — the INQUIS brand mark.
 *
 * Replaces the bare "Q" letter placeholder previously used across the
 * loading screens, landing page, login page, and demo page. Combines a
 * magnifying glass silhouette (inquiry, observation, curiosity) with a
 * small leaf accent (environmental character theme) in a simple, flat,
 * rounded style consistent with the rest of the product's visual language.
 *
 * Renders at any size via the `size` prop; color is controlled by the
 * `fill`/`accentFill` props so it can sit on the existing gradient
 * containers used throughout the app without change.
 */

interface InquisLogoMarkProps {
  size?: number;
  className?: string;
  /** Main glass/handle color. Defaults to white, for use on the app's colored gradient badges. */
  fill?: string;
  /** Leaf accent color. */
  accentFill?: string;
}

export function InquisLogoMark({
  size = 40,
  className,
  fill = "#FFFFFF",
  accentFill = "#B8F0C8",
}: InquisLogoMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      className={className}
      role="img"
      aria-label="INQUIS"
    >
      {/* Magnifying glass ring — inquiry & observation */}
      <circle
        cx="20"
        cy="20"
        r="13"
        fill="none"
        stroke={fill}
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      {/* Handle */}
      <path
        d="M29.5 29.5L38 38"
        stroke={fill}
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      {/* Leaf accent inside the glass — environmental character theme */}
      <path
        d="M20 13c4 1 6 5 5 9-3.5 0.5-7-1.5-7.5-5.5C17.2 14.8 18.2 13.3 20 13z"
        fill={accentFill}
      />
    </svg>
  );
}
