import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Volume2, VolumeX, SkipForward, Play, ShieldCheck } from "lucide-react";
import { EASE } from "@/lib/motion";

interface CinematicTeaserProps {
  onDone: () => void;
  videoSrc?: string;
}

export function CinematicTeaser({ onDone, videoSrc = "/aavishkara-short.mp4" }: CinematicTeaserProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(20);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showUnmuteHint, setShowUnmuteHint] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  // Attempt unmuted autoplay on mount
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    v.muted = false;
    const playPromise = v.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          setShowUnmuteHint(false);
        })
        .catch(() => {
          // If browser policy blocked audio, fall back to muted autoplay and notify user
          v.muted = true;
          setMuted(true);
          setShowUnmuteHint(true);
          v.play().catch(() => setIsPlaying(false));
        });
    }
  }, []);

  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (!v) return;
    const cur = v.currentTime;
    const dur = v.duration || 20;
    setCurrentTime(cur);
    setDuration(dur);
    setProgress((cur / dur) * 100);
  };

  const handleEnd = () => {
    if (isClosing) return;
    setIsClosing(true);
    setTimeout(() => {
      onDone();
    }, 400);
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    setShowUnmuteHint(false);
  };

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setIsPlaying(true);
    } else {
      v.pause();
      setIsPlaying(false);
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${String(s).padStart(2, "0")}`;
  };

  return (
    <AnimatePresence>
      {!isClosing && (
        <motion.div
          key="teaser-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(12px)" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-black select-none overflow-hidden"
        >
          {/* Ambient tech scanline background */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(218,165,32,0.12)_0%,rgba(0,0,0,0.95)_75%)]" />
          <div className="pointer-events-none absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:100%_4px]" />

          {/* Top HUD bar */}
          <div className="absolute top-0 inset-x-0 z-30 flex items-center justify-between p-4 sm:p-6 bg-gradient-to-b from-black/90 via-black/40 to-transparent">
            <div className="flex items-center gap-2.5">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
              </span>
              <div className="flex flex-col">
                <span className="font-mono text-xs font-bold tracking-[0.25em] text-primary">
                  AAVISHKARA &apos;26 // TRANSMISSION
                </span>
                <span className="font-mono text-[0.65rem] tracking-wider text-muted-foreground">
                  AUTHENTICATED BIOMETRIC FEED
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {showUnmuteHint && (
                <button
                  onClick={toggleMute}
                  className="flex items-center gap-1.5 rounded border border-primary/60 bg-primary/20 px-3 py-1 text-xs font-mono text-primary shadow-[0_0_15px_-3px_var(--gold)] hover:bg-primary/30 transition-colors animate-pulse"
                >
                  <VolumeX className="h-3.5 w-3.5" />
                  <span>TAP TO UNMUTE</span>
                </button>
              )}

              <button
                onClick={handleEnd}
                className="group flex items-center gap-1.5 rounded-full border border-primary/40 bg-black/60 px-4 py-1.5 text-xs font-mono tracking-widest text-primary/90 backdrop-blur-md transition-all hover:border-primary hover:bg-primary hover:text-black hover:shadow-[0_0_20px_var(--gold)]"
                aria-label="Skip video"
              >
                <span>SKIP INTRO</span>
                <SkipForward className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>

          {/* Main Video Container */}
          <div
            className="relative w-full h-full max-w-6xl max-h-[85vh] flex items-center justify-center p-2 sm:p-6 cursor-pointer"
            onClick={togglePlay}
          >
            <video
              ref={videoRef}
              src={videoSrc}
              playsInline
              autoPlay
              onTimeUpdate={handleTimeUpdate}
              onEnded={handleEnd}
              className="w-full h-full object-contain rounded-lg shadow-[0_0_80px_rgba(218,165,32,0.25)] border border-primary/30 bg-black"
            />

            {/* Play/Pause center overlay when paused */}
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm pointer-events-none">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-primary bg-primary/20 text-primary shadow-[0_0_30px_var(--gold)]">
                  <Play className="h-8 w-8 translate-x-0.5 fill-primary" />
                </div>
              </div>
            )}
          </div>

          {/* Bottom HUD Controls */}
          <div className="absolute bottom-0 inset-x-0 z-30 flex flex-col gap-2 p-4 sm:p-6 bg-gradient-to-t from-black/95 via-black/60 to-transparent">
            {/* Scrubber / Progress Bar */}
            <div className="relative w-full h-1.5 bg-card/60 rounded-full overflow-hidden border border-primary/20">
              <motion.div
                className="h-full bg-gradient-to-r from-primary via-gold-soft to-primary shadow-[0_0_12px_var(--gold)]"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Time & Audio controls */}
            <div className="flex items-center justify-between font-mono text-xs text-muted-foreground mt-1">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMute();
                  }}
                  className="rounded p-1.5 hover:text-primary transition-colors border border-transparent hover:border-primary/30"
                  aria-label={muted ? "Unmute audio" : "Mute audio"}
                >
                  {muted ? (
                    <VolumeX className="h-4 w-4 text-accent" />
                  ) : (
                    <Volume2 className="h-4 w-4 text-primary" />
                  )}
                </button>
                <span className="text-foreground tracking-wider">
                  {formatTime(currentTime)} <span className="text-muted-foreground/60">/</span> {formatTime(duration)}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                <span className="text-[0.7rem] tracking-widest text-primary/80">
                  ROUND-2 CASE STUDY REVEAL
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
