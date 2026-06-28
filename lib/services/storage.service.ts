/**
 * StorageService — FND-017
 * Manages access to Supabase Storage assets (audio, illustrations, activity assets).
 */

import { publicEnv } from "@/lib/env.public";

const STORAGE_BASE = `${publicEnv.supabaseUrl}/storage/v1/object/public`;

type Bucket = "audio" | "illustrations" | "activities" | "certificates";

function getPublicUrl(bucket: Bucket, path: string): string {
  return `${STORAGE_BASE}/${bucket}/${path}`;
}

// ─────────────────────────────────────────────
// Audio
// ─────────────────────────────────────────────

export const AudioAssets = {
  /**
   * Narration for an activity step
   * Naming convention: narration/{worldId}/{activityId}/step-{n}.mp3
   */
  narration(worldId: string, activityId: string, step: number): string {
    return getPublicUrl("audio", `narration/${worldId}/${activityId}/step-${step}.mp3`);
  },

  /** World intro narration */
  worldIntro(worldId: string): string {
    return getPublicUrl("audio", `narration/${worldId}/intro.mp3`);
  },

  /** Companion reactions */
  companionReaction(type: "correct" | "hint" | "celebrate" | "encourage"): string {
    return getPublicUrl("audio", `companion/${type}.mp3`);
  },

  /** UI sound effects */
  sfx(name: "click" | "success" | "unlock" | "whoosh" | "pop"): string {
    return getPublicUrl("audio", `sfx/${name}.mp3`);
  },
};

// ─────────────────────────────────────────────
// Illustrations
// ─────────────────────────────────────────────

export const IllustrationAssets = {
  /** World background images */
  worldBackground(worldId: string): string {
    return getPublicUrl("illustrations", `worlds/${worldId}/background.webp`);
  },

  /** Companion character images */
  companion(companionName: string, state: "idle" | "happy" | "thinking" | "celebrate"): string {
    return getPublicUrl("illustrations", `companions/${companionName}/${state}.webp`);
  },

  /** Avatar options for child profiles */
  avatar(avatarId: string): string {
    return getPublicUrl("illustrations", `avatars/${avatarId}.webp`);
  },
};

// ─────────────────────────────────────────────
// Activity Assets
// ─────────────────────────────────────────────

export const ActivityAssets = {
  /** Activity-specific images */
  image(worldId: string, activityId: string, assetName: string): string {
    return getPublicUrl("activities", `${worldId}/${activityId}/${assetName}`);
  },
};

// ─────────────────────────────────────────────
// Certificates
// ─────────────────────────────────────────────

export const CertificateAssets = {
  /** World completion certificate template */
  worldTemplate(worldNumber: number): string {
    return getPublicUrl("certificates", `world-${worldNumber}-template.webp`);
  },
};
