/**
 * Per-world visual identity — makes each of the 4 worlds feel distinct
 * beyond a color swap, without touching gameplay mechanics or state.
 *
 * Consumed by ActivityPlayer to vary: explore-grid composition, animation
 * pacing/character, and companion card framing. All values are purely
 * presentational; none affect scoring, progression, or data.
 */

export interface WorldVisualIdentity {
  /** Explore grid layout: "flow" = organic wrapping row (breezy), "grid" = orderly uniform grid (methodical), "focus" = denser investigative grid (purposeful). */
  exploreLayout: "flow" | "grid" | "focus";
  /** Spring stiffness for entrance animations — higher = snappier/more energetic, lower = softer/floatier. */
  springStiffness: number;
  /** Stagger delay between item entrances, in seconds. */
  staggerDelay: number;
  /** Companion card corner treatment, varies the silhouette per world. */
  cardRadius: string;
  /** Short atmosphere descriptor shown nowhere in UI text, just documents intent. */
  mood: string;
}

export const WORLD_VISUAL_IDENTITY: Record<string, WorldVisualIdentity> = {
  "world-1": {
    // Pattern Explorer — breezy, natural, unhurried observation
    exploreLayout: "flow",
    springStiffness: 200,
    staggerDelay: 0.09,
    cardRadius: "rounded-[1.75rem]",
    mood: "breezy-natural",
  },
  "world-2": {
    // Sorting Explorer — orderly, deliberate, methodical categorizing
    exploreLayout: "grid",
    springStiffness: 260,
    staggerDelay: 0.06,
    cardRadius: "rounded-2xl",
    mood: "orderly-grounded",
  },
  "world-3": {
    // Prediction Explorer — anticipatory, airy, sky-gazing
    exploreLayout: "flow",
    springStiffness: 220,
    staggerDelay: 0.1,
    cardRadius: "rounded-full",
    mood: "anticipatory-airy",
  },
  "world-4": {
    // Little Scientist — focused, snappy, purposeful investigation
    exploreLayout: "focus",
    springStiffness: 320,
    staggerDelay: 0.045,
    cardRadius: "rounded-xl",
    mood: "focused-purposeful",
  },
};

export function getWorldVisualIdentity(worldId: string): WorldVisualIdentity {
  return WORLD_VISUAL_IDENTITY[worldId] ?? WORLD_VISUAL_IDENTITY["world-1"];
}
