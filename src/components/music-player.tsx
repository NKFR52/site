"use client";

import { Pause, Play, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { THEME } from "@/data/portfolio-data";
import { songs } from "@/data/songs";

export function MusicPlayer() {
  const tracks = songs;
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.85);
  const [muted, setMuted] = useState(false);
  const volumeBeforeMuteRef = useRef(0.85);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isPlayingRef = useRef(false);
  const syncSrcRef = useRef(false);

  const currentTrack = useMemo(() => tracks[trackIndex], [tracks, trackIndex]);
  const hasTracks = tracks.length > 0 && Boolean(currentTrack?.url?.trim());

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  const goNext = useCallback(() => {
    if (!tracks.length) return;
    setTrackIndex((prev) => {
      if (tracks.length <= 1) {
        queueMicrotask(() => {
          const el = audioRef.current;
          if (!el) return;
          el.currentTime = 0;
          void el.play().catch(() => setIsPlaying(false));
        });
        return prev;
      }
      return (prev + 1) % tracks.length;
    });
  }, [tracks.length]);

  const goPrev = useCallback(() => {
    if (!tracks.length) return;
    setTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
  }, [tracks.length]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack?.url) return;
    syncSrcRef.current = true;
    audio.src = currentTrack.url;
    audio.load();
    if (isPlayingRef.current) {
      void audio.play().catch(() => setIsPlaying(false));
    }
    const id = window.setTimeout(() => {
      syncSrcRef.current = false;
    }, 0);
    return () => window.clearTimeout(id);
  }, [trackIndex, currentTrack?.url]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = Math.max(0, Math.min(1, volume));
    audio.muted = muted;
  }, [volume, muted]);

  const handleAudioPlay = () => setIsPlaying(true);

  const handleAudioPause = () => {
    if (syncSrcRef.current) return;
    const audio = audioRef.current;
    if (!audio) return;
    const atEnd =
      audio.ended || (Number.isFinite(audio.duration) && audio.duration > 0 && audio.currentTime >= audio.duration - 0.25);
    if (atEnd) return;
    setIsPlaying(false);
  };

  const toggleMute = () => {
    if (!muted) {
      volumeBeforeMuteRef.current = volume > 0 ? volume : volumeBeforeMuteRef.current;
      setMuted(true);
      return;
    }
    setVolume(volumeBeforeMuteRef.current > 0 ? volumeBeforeMuteRef.current : 0.5);
    setMuted(false);
  };

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio || !currentTrack?.url) return;

    if (!audio.paused) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    try {
      await audio.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  const handleVolumeSlider = (value: number) => {
    const v = Math.max(0, Math.min(1, value));
    setVolume(v);
    if (v > 0 && muted) setMuted(false);
    if (v > 0) volumeBeforeMuteRef.current = v;
  };

  const handleEnded = () => {
    goNext();
  };

  if (!hasTracks) {
    return null;
  }

  const trackLabel = `${currentTrack.artist} - ${currentTrack.title}`;

  return (
    <div
      className="fixed bottom-4 left-4 z-20 flex max-w-[calc(100vw-2rem)] flex-wrap items-center justify-center gap-2 rounded-lg border px-3 py-2 text-center backdrop-blur-sm sm:gap-3"
      style={{
        borderColor: THEME.border,
        backgroundColor: "rgba(17, 19, 26, 0.92)",
        boxShadow: THEME.glow
      }}
    >
      <button
        type="button"
        onClick={() => goPrev()}
        className="rounded-md border p-2 transition hover:opacity-85"
        style={{ borderColor: THEME.border }}
        aria-label="Previous track"
      >
        <SkipBack size={16} />
      </button>

      <button
        type="button"
        onClick={() => void togglePlay()}
        className="rounded-md border p-2 transition hover:opacity-85"
        style={{ borderColor: THEME.border }}
        aria-label={isPlaying ? "Pause music" : "Play music"}
      >
        {isPlaying ? <Pause size={16} /> : <Play size={16} />}
      </button>

      <button
        type="button"
        onClick={() => goNext()}
        className="rounded-md border p-2 transition hover:opacity-85"
        style={{ borderColor: THEME.border }}
        aria-label="Next track"
      >
        <SkipForward size={16} />
      </button>

      <div className="min-w-0 max-w-[200px] flex-1 sm:max-w-[260px]">
        <p className="truncate text-xs text-[var(--text)]" title={trackLabel}>
          {trackLabel}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={toggleMute}
          className="rounded-md border p-2 transition hover:opacity-85"
          style={{ borderColor: THEME.border }}
          aria-label={muted ? "Unmute" : "Mute"}
        >
          {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
        <input
          type="range"
          min={0}
          max={100}
          value={Math.round(volume * 100)}
          onChange={(e) => handleVolumeSlider(Number(e.target.value) / 100)}
          aria-label="Volume"
          className="h-1 w-24 cursor-pointer sm:w-28"
          style={{ accentColor: THEME.accent }}
        />
      </div>

      <audio
        ref={audioRef}
        preload="metadata"
        onPlay={handleAudioPlay}
        onPause={handleAudioPause}
        onEnded={handleEnded}
      />
    </div>
  );
}
