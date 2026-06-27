"use client";

/**
 * AudioProvider — FND-014 / FR-008
 * Global narration management via React Context.
 * Supports: narration queue, replay, mute, volume (tech-stack.md)
 * Uses HTML5 Audio API as primary implementation.
 */

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

interface AudioContextValue {
  /** Play a single audio file */
  play: (src: string) => Promise<void>;
  /** Queue multiple audio files to play in sequence */
  queue: (srcs: string[]) => void;
  /** Stop current and clear queue */
  stop: () => void;
  /** Replay the last played track */
  replay: () => void;
  /** Toggle mute */
  toggleMute: () => void;
  /** Set volume 0–1 */
  setVolume: (volume: number) => void;
  isMuted: boolean;
  volume: number;
  isPlaying: boolean;
}

const AudioContext = createContext<AudioContextValue | null>(null);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const queueRef = useRef<string[]>([]);
  const lastSrcRef = useRef<string | null>(null);

  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolumeState] = useState(0.8);
  const [isPlaying, setIsPlaying] = useState(false);

  // Initialize audio element on mount (client only)
  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.volume = volume;

    const audio = audioRef.current;

    const handleEnded = () => {
      setIsPlaying(false);
      // Play next in queue
      if (queueRef.current.length > 0) {
        const next = queueRef.current.shift()!;
        playInternal(next);
      }
    };

    audio.addEventListener("ended", handleEnded);
    return () => {
      audio.removeEventListener("ended", handleEnded);
      audio.pause();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const playInternal = useCallback((src: string) => {
    if (!audioRef.current) return;
    lastSrcRef.current = src;
    audioRef.current.src = src;
    audioRef.current.currentTime = 0;
    setIsPlaying(true);
    audioRef.current.play().catch(() => {
      // Autoplay may be blocked — fail silently, UI provides replay button
      setIsPlaying(false);
    });
  }, []);

  const play = useCallback(
    async (src: string): Promise<void> => {
      queueRef.current = [];
      playInternal(src);
    },
    [playInternal]
  );

  const queue = useCallback(
    (srcs: string[]) => {
      if (srcs.length === 0) return;
      const [first, ...rest] = srcs;
      queueRef.current = rest;
      playInternal(first);
    },
    [playInternal]
  );

  const stop = useCallback(() => {
    queueRef.current = [];
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
  }, []);

  const replay = useCallback(() => {
    if (lastSrcRef.current) {
      playInternal(lastSrcRef.current);
    }
  }, [playInternal]);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      if (audioRef.current) audioRef.current.muted = next;
      return next;
    });
  }, []);

  const setVolume = useCallback((vol: number) => {
    const clamped = Math.max(0, Math.min(1, vol));
    setVolumeState(clamped);
    if (audioRef.current) audioRef.current.volume = clamped;
  }, []);

  return (
    <AudioContext.Provider
      value={{ play, queue, stop, replay, toggleMute, setVolume, isMuted, volume, isPlaying }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio(): AudioContextValue {
  const ctx = useContext(AudioContext);
  if (!ctx) throw new Error("useAudio must be used within <AudioProvider>");
  return ctx;
}
