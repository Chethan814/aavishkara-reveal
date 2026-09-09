import { useCallback, useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, SkipForward, Play, ShieldCheck } from "lucide-react";

import {
  BOOT_SESSION_KEY,
  HOLD_FALLBACK_DURATION,
  PHASE_1_DURATION,
  TOTAL_ACTIVATION_DURATION,
  WIPE_DURATION,
} from "@/lib/motion";
import { warmBootPreload } from "@/lib/boot-preload";

const LOG_POOL = [
  "> init /sys/aavishkara/core.boot",
  "> mount volume: case-study-vault",
  "> handshake: ibm://presenter-node ... ok",
  "> verify signature 0x9F2A::AVK26",
  "> decrypt payload chunk 04/12",
  "> allocate 512MB render buffer",
  "> spin up particle field :: density 0.86",
  "> link established -> soundarya.iic",
  "> checksum verified [12/12 modules]",
  "> load font atlas: display/condensed",
  "> warm shader cache ... complete",
  "> negotiating display refresh 60Hz",
  "> unlock sequence stage II accepted",
  "> stream manifest: 12 problem statements",
  "> integrity scan: no anomalies found",
  "> priming portal transition matrix",
  "> cache warm: hero / sponsors / deck",
  "> route table synced :: 1 surface",
  "> telemetry channel muted by policy",
  "> awaiting final calibration token",
];

const PHASE_1_STATUS = [
  "5-POINT BIOMETRIC LOCK CONFIRMED",
  "POWERING UP CORE SYSTEMS",
  "AUTHENTICATING IDENTITY...",
];
const PHASE_2_STATUS = [
  "LOADING CASE STUDY ENGINE...",
  "CALIBRATING DISPLAY MATRIX...",
  "SYSTEMS READY",
];

function shuffled<T>(items: T[]) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j]!, copy[i]!];
  }
  return copy;
}

type Ripple = { id: number; x: number; y: number; big: boolean };
type TouchPoint = { id: number; x: number; y: number };

const FINGER_NAMES = [
  { id: 0, label: "THUMB", code: "TMB" },
  { id: 1, label: "INDEX", code: "IDX" },
  { id: 2, label: "MIDDLE", code: "MID" },
  { id: 3, label: "RING", code: "RNG" },
  { id: 4, label: "PINKY", code: "PNK" },
];

export function BootSequence({ onDone }: { onDone: (fromScan?: boolean) => void }) {
  const [visible, setVisible] = useState(true);
  const [active, setActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<0 | 1 | 2>(0);
  const [status, setStatus] = useState("STANDBY");
  const [lines, setLines] = useState<{ id: number; text: string }[]>([]);
  const [glitch, setGlitch] = useState(false);
  const [wipe, setWipe] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [charge, setCharge] = useState(0); // 0–1 hold charge
  const [activeTouches, setActiveTouches] = useState<TouchPoint[]>([]);
  const [lockedFingers, setLockedFingers] = useState<boolean[]>([false, false, false, false, false]);
  const [deviceMode, setDeviceMode] = useState<"desktop" | "mobile" | "multitouch">("desktop");

  const rippleId = useRef(0);
  const activeRef = useRef(false);
  const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const holdStart = useRef(0);
  const chargeRaf = useRef(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const rafRef = useRef(0);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  const later = (fn: () => void, ms: number) => {
    timers.current.push(setTimeout(fn, ms));
  };

  const addRipple = useCallback((x: number, y: number, big: boolean) => {
    const id = (rippleId.current += 1);
    setRipples((r) => [...r, { id, x, y, big }]);
    setTimeout(() => setRipples((r) => r.filter((p) => p.id !== id)), big ? 1100 : 700);
  }, []);

  /* already played this session — hand off instantly */
  useEffect(() => {
    if (sessionStorage.getItem(BOOT_SESSION_KEY) === "1") {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      setVisible(false);
      doneRef.current(false);
    }
  }, []);

  /* detect client device capabilities (mobile phones, non-touch laptops, multi-touch kiosks) */
  useEffect(() => {
    const detectMode = () => {
      if (typeof window === "undefined") return;
      const isMobile =
        window.innerWidth < 768 ||
        /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      if (isMobile) {
        setDeviceMode("mobile");
        return;
      }
      const maxTouch = navigator.maxTouchPoints || 0;
      if (maxTouch >= 5) {
        setDeviceMode("multitouch");
      } else {
        setDeviceMode("desktop");
      }
    };
    detectMode();
    window.addEventListener("resize", detectMode);
    return () => window.removeEventListener("resize", detectMode);
  }, []);

  /* warm downstream assets on mount */
  useEffect(() => {
    if (!visible) return;
    warmBootPreload();
  }, [visible]);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const videoContainerRef = useRef<HTMLDivElement | null>(null);
  const [muted, setMuted] = useState(false);

  /** Prime video for unmuted playback — call during a real user gesture */
  const primeVideo = useCallback(() => {
    const v = videoRef.current;
    if (!v || activeRef.current) return;
    v.muted = false;
    v.volume = 1.0;
    const p = v.play();
    if (p) {
      p.then(() => {
        v.pause();
        v.currentTime = 0;
      }).catch(() => {});
    }
  }, []);
  const [videoDuration, setVideoDuration] = useState(20);
  const [currentTime, setCurrentTime] = useState(0);

  const finishBoot = useCallback(() => {
    setWipe(true);
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    setTimeout(() => {
      sessionStorage.setItem(BOOT_SESSION_KEY, "1");
      setVisible(false);
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      doneRef.current(true);
    }, WIPE_DURATION);
  }, []);

  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (!v) return;
    const cur = v.currentTime;
    const dur = v.duration || 20;
    setCurrentTime(cur);
    setVideoDuration(dur);
    const p = Math.min(100, Math.round((cur / dur) * 100));
    setProgress(p);

    if (p < 20) {
      setStatus("BIOMETRIC ACCESS GRANTED // INITIALIZING CORE");
    } else if (p < 50) {
      setStatus("DECRYPTING 20 HACKATHON CHALLENGES...");
    } else if (p < 75) {
      setStatus("CALIBRATING JAVA & PYTHON BENCHMARKS...");
    } else if (p < 95) {
      setStatus("SYNCHRONIZING CASE STUDY MATRIX...");
    } else {
      setStatus("REVEAL ENGINE OPERATIONAL");
    }
  };

  const toggleMute = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${String(s).padStart(2, "0")}`;
  };

  const activate = useCallback(
    (points: { x: number; y: number }[]) => {
      if (activeRef.current) return;
      activeRef.current = true;
      setActive(true);
      setPhase(1);
      setLockedFingers([true, true, true, true, true]);
      points.forEach((p) => addRipple(p.x, p.y, true));
      setStatus("BIOMETRIC ACCESS GRANTED // INITIALIZING");

      // Play the primed video with sound
      const v = videoRef.current;
      if (v) {
        v.muted = false;
        v.volume = 1.0;
        v.currentTime = 0;
        v.play().catch(() => {
          // If browser still blocks unmuted play, fall back to muted
          v.muted = true;
          setMuted(true);
          v.play().catch(() => {});
        });
      }
    },
    [addRipple],
  );

  const handleTrigger = useCallback(() => {
    if (activeRef.current) return;
    primeVideo();
    const cx = typeof window !== "undefined" ? window.innerWidth / 2 : 200;
    const cy = typeof window !== "undefined" ? window.innerHeight / 2 : 200;
    addRipple(cx, cy, true);
    activate([{ x: cx, y: cy }]);
  }, [activate, addRipple, primeVideo]);

  /* Keyboard shortcut for desktop users (Space or Enter to launch instantly) */
  useEffect(() => {
    if (!visible || active) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "Enter") {
        e.preventDefault();
        handleTrigger();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [visible, active, handleTrigger]);

  /* Compute which fingers to lock based on touches and charge */
  const updateFingerStates = useCallback((touchesCount: number, currentCharge: number) => {
    // If charge is progressing (from holding single finger or mouse), lock fingers sequentially
    const chargeLocked = Math.min(5, Math.floor(currentCharge * 5.5));
    const count = Math.max(touchesCount, chargeLocked);

    setLockedFingers([
      count >= 1, // Thumb
      count >= 2, // Index
      count >= 3, // Middle
      count >= 4, // Ring
      count >= 5, // Pinky
    ]);
  }, []);

  /* Input Handling: Adaptive for Mobile, Desktop & Multi-Touch */
  useEffect(() => {
    if (!visible) return;

    const startCharge = (points: { x: number; y: number }[], durationMs: number) => {
      holdStart.current = performance.now();
      const tick = () => {
        const elapsed = performance.now() - holdStart.current;
        const t = Math.min(1, elapsed / durationMs);
        setCharge(t);
        updateFingerStates(points.length, t);

        if (t < 1 && !activeRef.current) {
          chargeRaf.current = requestAnimationFrame(tick);
        }
      };
      chargeRaf.current = requestAnimationFrame(tick);
      holdTimer.current = setTimeout(() => {
        activate(points);
      }, durationMs);
    };

    const cancelCharge = () => {
      if (holdTimer.current) clearTimeout(holdTimer.current);
      holdTimer.current = null;
      cancelAnimationFrame(chargeRaf.current);
      setCharge(0);
      holdStart.current = 0;
    };

    const onTouchStart = (e: TouchEvent) => {
      if (activeRef.current) return;
      primeVideo();

      if (deviceMode === "mobile") {
        const t = e.touches[0];
        const pt = t
          ? { id: t.identifier, x: t.clientX, y: t.clientY }
          : { id: 0, x: window.innerWidth / 2, y: window.innerHeight / 2 };
        addRipple(pt.x, pt.y, true);
        activate([pt]);
        return;
      }

      const touches = Array.from(e.touches).map((t) => ({
        id: t.identifier,
        x: t.clientX,
        y: t.clientY,
      }));
      setActiveTouches(touches);

      touches.forEach((t) => addRipple(t.x, t.y, false));

      const fingerCount = touches.length;
      updateFingerStates(fingerCount, 0);

      // Instant 5-finger activation: all 5 biometric nodes touched!
      if (fingerCount >= 5) {
        cancelCharge();
        activate(touches);
        return;
      }

      // If 3 or 4 fingers placed: short 500ms confirmation hold to activate
      if (fingerCount >= 3) {
        cancelCharge();
        startCharge(touches, 600);
        return;
      }

      // 1 or 2 fingers: start hold-charge fallback while waiting for more fingers
      cancelCharge();
      startCharge(touches, HOLD_FALLBACK_DURATION);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (activeRef.current || deviceMode === "mobile") return;
      const touches = Array.from(e.touches).map((t) => ({
        id: t.identifier,
        x: t.clientX,
        y: t.clientY,
      }));
      setActiveTouches(touches);

      const fingerCount = touches.length;
      updateFingerStates(fingerCount, charge);

      if (fingerCount >= 5) {
        cancelCharge();
        activate(touches);
      }
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (deviceMode === "mobile") return;
      const remainingTouches = Array.from(e.touches).map((t) => ({
        id: t.identifier,
        x: t.clientX,
        y: t.clientY,
      }));
      setActiveTouches(remainingTouches);

      if (remainingTouches.length === 0) {
        cancelCharge();
        setLockedFingers([false, false, false, false, false]);
      } else {
        updateFingerStates(remainingTouches.length, charge);
      }
    };

    /* Mouse fallback for desktop users */
    const onMouseDown = (e: MouseEvent) => {
      if (activeRef.current) return;
      primeVideo();

      if (deviceMode === "desktop") {
        // Desktop / non-touch laptop: single click launches immediately!
        addRipple(e.clientX, e.clientY, true);
        activate([{ x: e.clientX, y: e.clientY }]);
        return;
      }

      const pt = { id: 999, x: e.clientX, y: e.clientY };
      setActiveTouches([pt]);
      addRipple(e.clientX, e.clientY, false);
      cancelCharge();
      startCharge([pt], HOLD_FALLBACK_DURATION);
    };

    const onMouseMove = (e: MouseEvent) => {
      if (activeRef.current || holdTimer.current === null || deviceMode === "desktop") return;
      setActiveTouches([{ id: 999, x: e.clientX, y: e.clientY }]);
    };

    const onMouseUp = () => {
      if (activeRef.current || deviceMode === "desktop") return;
      setActiveTouches([]);
      cancelCharge();
      setLockedFingers([false, false, false, false, false]);
    };

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);
    window.addEventListener("touchcancel", onTouchEnd);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mouseleave", onMouseUp);

    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mouseleave", onMouseUp);
      cancelCharge();
    };
  }, [visible, activate, addRipple, charge, updateFingerStates, deviceMode, primeVideo]);

  useEffect(
    () => () => {
      timers.current.forEach(clearTimeout);
      cancelAnimationFrame(rafRef.current);
      cancelAnimationFrame(chargeRaf.current);
    },
    [],
  );

  if (!visible) return null;

  /* Move video element into the video container when it becomes active */
  const videoContainerCallback = useCallback((node: HTMLDivElement | null) => {
    videoContainerRef.current = node;
    if (node && videoRef.current) {
      node.prepend(videoRef.current);
    }
  }, []);

  const finale = active && progress > 86;
  const activeCount = lockedFingers.filter(Boolean).length;

  return (
    <div
      className="boot-root fixed inset-0 z-[90] flex select-none items-center justify-center overflow-hidden bg-background"
      style={{ animation: wipe ? `boot-wipe ${WIPE_DURATION}ms var(--ease-cinematic) forwards` : undefined }}
    >
      {/* parallax circuit background */}
      <div className={`boot-grid absolute inset-0 ${active ? "boot-grid-hot" : ""}`} />
      <div className={`boot-scan absolute inset-0 ${active ? "boot-scan-hot" : ""}`} />

      {/* FLOATING OUTLINE RETICLES AROUND EACH PHYSICAL FINGER TOUCH (ONLY IN MULTITOUCH MODE) */}
      {deviceMode === "multitouch" &&
        activeTouches.map((touch, i) => (
          <div
            key={touch.id}
            className="pointer-events-none fixed z-[100] -translate-x-1/2 -translate-y-1/2 transition-transform duration-75"
            style={{ left: touch.x, top: touch.y }}
          >
            <div className="relative flex h-24 w-24 items-center justify-center sm:h-28 sm:w-28">
              {/* Outer rotating bracket ring around the finger */}
              <div className="finger-reticle-spin absolute inset-0 rounded-full border border-dashed border-primary/80" />
              <div className="finger-reticle-spin-fast absolute inset-2 rounded-full border border-dotted border-accent/60" />

              {/* Pulse ping ring expanding from finger contact point */}
              <div className="finger-pulse-ring absolute inset-3 rounded-full border-2 border-primary" />

              {/* Center contact lock */}
              <div className="h-4 w-4 rounded-full border border-accent bg-accent/30 shadow-[0_0_20px_var(--neon)]" />
              <div className="h-1.5 w-1.5 rounded-full bg-primary shadow-[var(--glow-gold)]" />

              {/* Holographic corner outline brackets */}
              <div className="absolute -left-1 -top-1 h-3.5 w-3.5 border-l-2 border-t-2 border-primary shadow-[var(--glow-gold)]" />
              <div className="absolute -right-1 -top-1 h-3.5 w-3.5 border-r-2 border-t-2 border-primary shadow-[var(--glow-gold)]" />
              <div className="absolute -bottom-1 -left-1 h-3.5 w-3.5 border-b-2 border-l-2 border-primary shadow-[var(--glow-gold)]" />
              <div className="absolute -bottom-1 -right-1 h-3.5 w-3.5 border-b-2 border-r-2 border-primary shadow-[var(--glow-gold)]" />

              {/* High-tech node identification badge */}
              <div className="display absolute -bottom-7 whitespace-nowrap rounded border border-primary/60 bg-card/95 px-2.5 py-0.5 text-[0.65rem] font-semibold tracking-[0.25em] text-primary shadow-[0_0_15px_rgba(245,184,0,0.35)] backdrop-blur-md">
                FINGER 0{i + 1} :: LOCKED
              </div>
            </div>
          </div>
        ))}

      {/* LASER ENERGY CONNECTION LINES BETWEEN MULTIPLE TOUCHES (ONLY IN MULTITOUCH MODE) */}
      {deviceMode === "multitouch" && activeTouches.length >= 2 && (
        <svg className="pointer-events-none fixed inset-0 z-[95] h-full w-full">
          {activeTouches.slice(0, -1).map((p1, idx) => {
            const p2 = activeTouches[idx + 1]!;
            return (
              <g key={`${p1.id}-${p2.id}`}>
                <line
                  x1={p1.x}
                  y1={p1.y}
                  x2={p2.x}
                  y2={p2.y}
                  stroke="oklch(0.82 0.16 85 / 85%)"
                  strokeWidth="2.5"
                  strokeDasharray="6 4"
                  style={{ filter: "drop-shadow(0 0 8px oklch(0.82 0.16 85 / 90%))" }}
                />
                <circle
                  cx={(p1.x + p2.x) / 2}
                  cy={(p1.y + p2.y) / 2}
                  r="3.5"
                  fill="oklch(0.82 0.16 85)"
                  style={{ filter: "drop-shadow(0 0 10px oklch(0.82 0.16 85))" }}
                />
              </g>
            );
          })}
        </svg>
      )}

      {/* MAIN BOOT FRAME */}
      <div
        className={`boot-frame relative z-10 ${
          active ? "w-[min(96vw,58rem)] p-3.5 sm:p-5" : "w-[min(94vw,56rem)] p-5 sm:p-9"
        } rounded-lg border border-primary/30 bg-card/40 backdrop-blur-md ${
          glitch ? "boot-glitch" : ""
        }`}
        style={{
          boxShadow: `0 0 ${20 + progress * 0.9}px oklch(0.82 0.16 85 / ${0.12 + progress * 0.0035})`,
          transform: finale ? `scale(${1 + (progress - 86) * 0.004})` : undefined,
          transition: "transform 200ms linear",
        }}
      >
        {!active ? (
          deviceMode === "desktop" ? (
            /* 1. DESKTOP WORKSTATION / NON-TOUCH SCREEN LAPTOP INTERFACE */
            <div className="boot-idle-content flex flex-col items-center gap-5 py-4 text-center sm:gap-6 sm:py-6 max-w-xl mx-auto">
              {/* HUD HEADER */}
              <div className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-ping" />
                <p className="display text-xs tracking-[0.4em] text-primary sm:text-sm font-semibold">
                  SYSTEM TERMINAL // PRESENTATION ACCESS
                </p>
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-ping" />
              </div>

              {/* CYBERNETIC CORE REACTOR GRAPHIC (REPLACES 5-FINGER HAND) */}
              <div className="relative flex items-center justify-center p-3 sm:p-5">
                {/* Outer pulsing scanning rings */}
                <div className="absolute h-48 w-48 rounded-full border border-primary/25 boot-hand-ring sm:h-56 sm:w-56" />
                <div
                  className="absolute h-56 w-56 rounded-full border border-accent/20 boot-hand-ring sm:h-64 sm:w-64"
                  style={{ animationDelay: "0.8s" }}
                />
                <div
                  className="absolute h-64 w-64 rounded-full border border-dashed border-primary/20 animate-spin sm:h-72 sm:w-72"
                  style={{ animationDuration: "24s" }}
                />

                {/* Central Holographic Core */}
                <div className="relative flex h-28 w-28 items-center justify-center rounded-full border-2 border-primary/60 bg-primary/10 shadow-[0_0_35px_rgba(245,184,0,0.3)] backdrop-blur-md sm:h-32 sm:w-32">
                  <div
                    className="absolute inset-1.5 rounded-full border border-accent/40 border-dotted animate-spin"
                    style={{ animationDuration: "12s" }}
                  />
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 shadow-[0_0_20px_var(--neon)] sm:h-20 sm:w-20">
                    <ShieldCheck className="h-8 w-8 text-primary sm:h-10 sm:w-10" />
                  </div>
                </div>
              </div>

              {/* TELEMETRY SPECS */}
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                <div className="flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-[0.68rem] font-mono tracking-[0.2em] text-primary">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary animate-ping" />
                  <span>IBM PRESENTER NODE</span>
                  <span className="font-bold">:: ONLINE</span>
                </div>
                <div className="flex items-center gap-1.5 rounded-full border border-border/60 bg-card/40 px-3 py-1 text-[0.68rem] font-mono tracking-[0.2em] text-muted-foreground">
                  <span>20 HACKATHON CHALLENGES</span>
                  <span className="text-primary font-bold">READY</span>
                </div>
                <div className="flex items-center gap-1.5 rounded-full border border-border/60 bg-card/40 px-3 py-1 text-[0.68rem] font-mono tracking-[0.2em] text-muted-foreground">
                  <span>DISPLAY ENGINE</span>
                  <span className="text-primary font-bold">CALIBRATED</span>
                </div>
              </div>

              {/* PROMINENT LAUNCH BUTTON */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleTrigger();
                }}
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-primary/70 bg-gradient-to-r from-primary/20 via-primary/35 to-primary/20 px-8 py-4 font-mono text-sm tracking-[0.25em] text-primary shadow-[0_0_30px_rgba(245,184,0,0.35)] backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-primary hover:bg-primary hover:text-black hover:shadow-[0_0_50px_rgba(245,184,0,0.7)] cursor-pointer active:scale-95"
              >
                <Play className="h-4 w-4 fill-current transition-transform group-hover:scale-125" />
                <span className="font-bold">INITIALIZE REVEAL</span>
                <span className="h-2 w-2 rounded-full bg-primary group-hover:bg-black animate-ping" />
              </button>

              {/* INSTRUCTION */}
              <div className="space-y-1">
                <p className="display boot-hand-shimmer text-xs tracking-[0.38em] text-foreground/90 sm:text-sm">
                  CLICK BUTTON OR PRESS [SPACE] / [ENTER] TO LAUNCH
                </p>
                <p className="font-mono text-[0.65rem] tracking-[0.25em] text-primary/80">
                  [ DESKTOP WORKSTATION AUTHENTICATED // SOUNDARYA IIC &times; IBM ]
                </p>
              </div>
            </div>
          ) : deviceMode === "mobile" ? (
            /* 2. MOBILE PHONE INTERFACE (ALL PHONES — NO 5-FINGER HAND) */
            <div className="boot-idle-content flex flex-col items-center gap-4 py-3 text-center sm:gap-5 sm:py-5 max-w-sm mx-auto">
              {/* HUD HEADER */}
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-ping" />
                <p className="display text-xs tracking-[0.3em] text-primary font-semibold">
                  AAVISHKARA &apos;26 // MOBILE ACCESS
                </p>
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-ping" />
              </div>

              {/* COMPACT MOBILE BEACON GRAPHIC */}
              <div className="relative flex items-center justify-center p-2">
                <div className="absolute h-36 w-36 rounded-full border border-primary/25 boot-hand-ring" />
                <div
                  className="absolute h-44 w-44 rounded-full border border-accent/20 boot-hand-ring"
                  style={{ animationDelay: "0.8s" }}
                />

                {/* Central Glowing Shield Core */}
                <div className="relative flex h-20 w-20 items-center justify-center rounded-full border-2 border-primary/60 bg-primary/15 shadow-[0_0_25px_rgba(245,184,0,0.35)] backdrop-blur-md">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/25">
                    <ShieldCheck className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </div>

              {/* MOBILE BADGES */}
              <div className="flex flex-wrap items-center justify-center gap-2">
                <div className="flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-[0.62rem] font-mono tracking-[0.18em] text-primary">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary animate-ping" />
                  <span>MOBILE NODE ONLINE</span>
                </div>
                <div className="flex items-center gap-1.5 rounded-full border border-border/60 bg-card/40 px-3 py-1 text-[0.62rem] font-mono tracking-[0.18em] text-muted-foreground">
                  <span>IBM HACKATHON REVEAL</span>
                </div>
              </div>

              {/* PROMINENT MOBILE TAP BUTTON */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleTrigger();
                }}
                className="group relative flex w-full max-w-[280px] items-center justify-center gap-2.5 rounded-full border border-primary/70 bg-gradient-to-r from-primary/25 via-primary/35 to-primary/25 px-6 py-3.5 font-mono text-xs tracking-[0.22em] text-primary shadow-[0_0_25px_rgba(245,184,0,0.4)] active:scale-95 transition-all cursor-pointer"
              >
                <Play className="h-4 w-4 fill-current" />
                <span className="font-bold">TAP TO ENTER REVEAL</span>
              </button>

              {/* INSTRUCTION */}
              <div className="space-y-1">
                <p className="display boot-hand-shimmer text-xs tracking-[0.3em] text-foreground/90">
                  TAP BUTTON OR ANYWHERE TO BEGIN
                </p>
                <p className="font-mono text-[0.6rem] tracking-[0.2em] text-primary/80">
                  [ AUDIO &amp; VIDEO TRANSMISSION READY ]
                </p>
              </div>
            </div>
          ) : (
            /* 3. MULTI-TOUCH STAGE DISPLAY / KIOSK (>= 5 TOUCH POINTS) */
            <div className="boot-idle-content flex flex-col items-center gap-5 py-4 text-center sm:gap-6 sm:py-6">
              {/* HUD HEADER */}
              <div className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-ping" />
                <p className="display text-xs tracking-[0.4em] text-primary sm:text-sm">
                  BIOMETRIC TOUCH MATRIX // 5-FINGER RECOGNITION
                </p>
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-ping" />
              </div>

              {/* 5-FINGER BIOMETRIC SCANNER GRAPHIC */}
              <div className="relative flex items-center justify-center p-2">
                {/* Outer pulsing scanning rings */}
                <div className="absolute h-64 w-64 rounded-full border border-primary/25 boot-hand-ring" />
                <div className="absolute h-64 w-64 rounded-full border border-accent/20 boot-hand-ring" style={{ animationDelay: "0.8s" }} />

                {/* Charge SVG indicator */}
                {charge > 0 && (
                  <svg className="absolute h-72 w-72 pointer-events-none" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="47"
                      fill="none"
                      stroke="oklch(0.82 0.16 85 / 80%)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeDasharray={`${charge * 295} 295`}
                      transform="rotate(-90 50 50)"
                      style={{ filter: "drop-shadow(0 0 8px oklch(0.82 0.16 85 / 75%))" }}
                    />
                  </svg>
                )}

                {/* FUTURISTIC BIOMETRIC HAND SVG WITH 5 INDEPENDENT FINGERS */}
                <svg
                  viewBox="0 0 240 280"
                  className="h-56 w-56 sm:h-64 sm:w-64 select-none drop-shadow-[0_0_20px_rgba(245,184,0,0.15)]"
                >
                  <defs>
                    {/* Cybernetic grid fill */}
                    <pattern id="bio-grid" width="10" height="10" patternUnits="userSpaceOnUse">
                      <path d="M 10 0 L 0 0 0 10" fill="none" stroke="oklch(0.82 0.16 85 / 15%)" strokeWidth="0.5" />
                    </pattern>
                    {/* Palm core gradient */}
                    <radialGradient id="core-glow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="oklch(0.82 0.16 85 / 50%)" />
                      <stop offset="70%" stopColor="oklch(0.82 0.16 85 / 10%)" />
                      <stop offset="100%" stopColor="transparent" />
                    </radialGradient>
                  </defs>

                  {/* PALM SKELETON BASE */}
                  <path
                    d="M 66 175 C 56 215 72 250 120 255 C 168 250 184 215 174 175 L 166 160 L 140 152 L 120 152 L 100 152 L 74 160 Z"
                    className={`bio-finger-path ${
                      activeCount >= 3 ? "bio-finger-active" : "bio-finger-inactive"
                    }`}
                    strokeWidth="2"
                  />

                  {/* 1. THUMB (LEFT) */}
                  <g id="finger-thumb">
                    <path
                      d="M 76 182 L 48 162 C 34 148 24 134 32 118 C 40 104 56 108 68 124 L 84 152 Z"
                      className={`bio-finger-path ${
                        lockedFingers[0] ? "bio-finger-active" : "bio-finger-inactive"
                      }`}
                      strokeWidth="2"
                    />
                    {/* Joint notches */}
                    <line x1="44" y1="138" x2="58" y2="148" stroke="currentColor" strokeWidth="1" opacity="0.5" />
                    {/* Fingertip target */}
                    <circle
                      cx="44"
                      cy="120"
                      r={lockedFingers[0] ? "6" : "4"}
                      className={`bio-finger-path ${lockedFingers[0] ? "fill-primary" : "fill-none stroke-primary/50"}`}
                      strokeWidth="1.5"
                    />
                    {lockedFingers[0] && (
                      <circle cx="44" cy="120" r="10" fill="none" stroke="oklch(0.82 0.16 85)" strokeWidth="1" strokeDasharray="3 2" className="animate-spin" />
                    )}
                  </g>

                  {/* 2. INDEX FINGER */}
                  <g id="finger-index">
                    <path
                      d="M 68 152 L 68 76 C 68 56 90 56 90 76 L 90 152 Z"
                      className={`bio-finger-path ${
                        lockedFingers[1] ? "bio-finger-active" : "bio-finger-inactive"
                      }`}
                      strokeWidth="2"
                    />
                    {/* Joint notches */}
                    <line x1="68" y1="118" x2="90" y2="118" stroke="currentColor" strokeWidth="1" opacity="0.5" />
                    <line x1="68" y1="90" x2="90" y2="90" stroke="currentColor" strokeWidth="1" opacity="0.5" />
                    {/* Fingertip target */}
                    <circle
                      cx="79"
                      cy="68"
                      r={lockedFingers[1] ? "6" : "4"}
                      className={`bio-finger-path ${lockedFingers[1] ? "fill-primary" : "fill-none stroke-primary/50"}`}
                      strokeWidth="1.5"
                    />
                    {lockedFingers[1] && (
                      <circle cx="79" cy="68" r="10" fill="none" stroke="oklch(0.82 0.16 85)" strokeWidth="1" strokeDasharray="3 2" className="animate-spin" />
                    )}
                  </g>

                  {/* 3. MIDDLE FINGER */}
                  <g id="finger-middle">
                    <path
                      d="M 103 152 L 103 46 C 103 26 127 26 127 46 L 127 152 Z"
                      className={`bio-finger-path ${
                        lockedFingers[2] ? "bio-finger-active" : "bio-finger-inactive"
                      }`}
                      strokeWidth="2"
                    />
                    {/* Joint notches */}
                    <line x1="103" y1="114" x2="127" y2="114" stroke="currentColor" strokeWidth="1" opacity="0.5" />
                    <line x1="103" y1="80" x2="127" y2="80" stroke="currentColor" strokeWidth="1" opacity="0.5" />
                    {/* Fingertip target */}
                    <circle
                      cx="115"
                      cy="38"
                      r={lockedFingers[2] ? "6" : "4"}
                      className={`bio-finger-path ${lockedFingers[2] ? "fill-primary" : "fill-none stroke-primary/50"}`}
                      strokeWidth="1.5"
                    />
                    {lockedFingers[2] && (
                      <circle cx="115" cy="38" r="10" fill="none" stroke="oklch(0.82 0.16 85)" strokeWidth="1" strokeDasharray="3 2" className="animate-spin" />
                    )}
                  </g>

                  {/* 4. RING FINGER */}
                  <g id="finger-ring">
                    <path
                      d="M 140 152 L 140 76 C 140 56 162 56 162 76 L 162 152 Z"
                      className={`bio-finger-path ${
                        lockedFingers[3] ? "bio-finger-active" : "bio-finger-inactive"
                      }`}
                      strokeWidth="2"
                    />
                    {/* Joint notches */}
                    <line x1="140" y1="118" x2="162" y2="118" stroke="currentColor" strokeWidth="1" opacity="0.5" />
                    <line x1="140" y1="90" x2="162" y2="90" stroke="currentColor" strokeWidth="1" opacity="0.5" />
                    {/* Fingertip target */}
                    <circle
                      cx="151"
                      cy="68"
                      r={lockedFingers[3] ? "6" : "4"}
                      className={`bio-finger-path ${lockedFingers[3] ? "fill-primary" : "fill-none stroke-primary/50"}`}
                      strokeWidth="1.5"
                    />
                    {lockedFingers[3] && (
                      <circle cx="151" cy="68" r="10" fill="none" stroke="oklch(0.82 0.16 85)" strokeWidth="1" strokeDasharray="3 2" className="animate-spin" />
                    )}
                  </g>

                  {/* 5. PINKY FINGER */}
                  <g id="finger-pinky">
                    <path
                      d="M 172 160 L 172 108 C 172 90 192 90 192 108 L 192 170 Z"
                      className={`bio-finger-path ${
                        lockedFingers[4] ? "bio-finger-active" : "bio-finger-inactive"
                      }`}
                      strokeWidth="2"
                    />
                    {/* Joint notches */}
                    <line x1="172" y1="134" x2="192" y2="134" stroke="currentColor" strokeWidth="1" opacity="0.5" />
                    {/* Fingertip target */}
                    <circle
                      cx="182"
                      cy="100"
                      r={lockedFingers[4] ? "6" : "4"}
                      className={`bio-finger-path ${lockedFingers[4] ? "fill-primary" : "fill-none stroke-primary/50"}`}
                      strokeWidth="1.5"
                    />
                    {lockedFingers[4] && (
                      <circle cx="182" cy="100" r="10" fill="none" stroke="oklch(0.82 0.16 85)" strokeWidth="1" strokeDasharray="3 2" className="animate-spin" />
                    )}
                  </g>

                  {/* PALM CORE BIOMETRIC SENSOR */}
                  <g id="palm-sensor" transform="translate(115, 202)">
                    <circle r="26" fill="url(#core-glow)" />
                    <circle r="24" fill="none" stroke="oklch(0.82 0.16 85 / 40%)" strokeWidth="1.5" strokeDasharray="4 2" />
                    <circle r="16" fill="none" stroke="oklch(0.82 0.16 85 / 60%)" strokeWidth="1" />
                    <circle r="8" fill="none" stroke="oklch(0.82 0.16 85 / 80%)" strokeWidth="1.5" />
                    <circle r="3" fill="oklch(0.82 0.16 85)" />

                    {/* Rotating radar sweep ray */}
                    <line
                      x1="0"
                      y1="0"
                      x2="24"
                      y2="0"
                      stroke="oklch(0.82 0.16 85)"
                      strokeWidth="1.5"
                      className="palm-radar-sweep"
                    />
                  </g>
                </svg>
              </div>

              {/* 5-FINGER BIOMETRIC NODES STATUS BADGES */}
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                {FINGER_NAMES.map((f) => {
                  const isLocked = lockedFingers[f.id];
                  return (
                    <div
                      key={f.id}
                      className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.62rem] font-mono tracking-[0.2em] transition-all duration-300 sm:px-3 sm:text-xs ${
                        isLocked
                          ? "border-primary bg-primary/20 text-primary shadow-[0_0_12px_rgba(245,184,0,0.4)] scale-105"
                          : "border-border/60 bg-card/40 text-muted-foreground"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                          isLocked ? "bg-primary shadow-[var(--glow-gold)] animate-ping" : "bg-muted-foreground/40"
                        }`}
                      />
                      <span>{f.label}</span>
                      <span className="font-bold">{isLocked ? "✓" : "○"}</span>
                    </div>
                  );
                })}
              </div>

              {/* INSTRUCTION & REAL-TIME TOUCH STATUS */}
              <div className="space-y-1">
                <p className="display boot-hand-shimmer text-xs tracking-[0.38em] text-foreground/90 sm:text-base">
                  {activeCount === 0
                    ? "TOUCH SCREEN WITH ALL 5 FINGERS OR HOLD PALM"
                    : activeCount === 5
                    ? "ALL 5 BIOMETRIC NODES LOCKED — ACCESS GRANTED"
                    : `${activeCount} / 5 FINGERS DETECTED — PLACE REMAINING FINGERS`}
                </p>
                <p className="font-mono text-[0.65rem] tracking-[0.25em] text-primary/80">
                  {activeCount > 0
                    ? `[ SENSING TOUCH POINTS: ${activeTouches.length || activeCount} / 5 NODES ]`
                    : "[ MULTI-TOUCH BIOMETRIC SCANNER READY ]"}
                </p>
              </div>

              {/* STAGE TOUCHSCREEN BYPASS FALLBACK */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleTrigger();
                }}
                className="mt-1 text-[0.7rem] font-mono text-muted-foreground/70 hover:text-primary underline tracking-widest cursor-pointer transition-colors"
              >
                [ OR TAP TO INITIALIZE REVEAL ]
              </button>
            </div>
          )
        ) : (
          /* ACTIVE VIDEO LOADING TRANSMISSION (20 SECONDS) */
          <div className="flex flex-col w-full text-left">
            {/* Header HUD */}
            <div className="flex flex-wrap items-center justify-between border-b border-primary/30 pb-3 gap-2">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary animate-ping" />
                <p className="display text-xs tracking-[0.25em] text-primary sm:text-sm">{status}</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={toggleMute}
                  className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                >
                  {muted ? <VolumeX className="h-3.5 w-3.5 text-accent" /> : <Volume2 className="h-3.5 w-3.5 text-primary" />}
                  <span className="hidden sm:inline">{muted ? "MUTED" : "UNMUTE"}</span>
                </button>
                <button
                  type="button"
                  onClick={finishBoot}
                  className="flex items-center gap-1.5 rounded-full border border-primary/50 bg-primary/20 px-3 py-1 font-mono text-[0.7rem] text-primary hover:bg-primary hover:text-black transition-all cursor-pointer shadow-[0_0_12px_var(--gold)]"
                >
                  <span>SKIP LOADING</span>
                  <SkipForward className="h-3 w-3" />
                </button>
              </div>
            </div>

            {/* Video Player */}
            <div ref={videoContainerCallback} className="relative mt-3 aspect-video w-full overflow-hidden rounded-lg border border-primary/40 bg-black shadow-[0_0_40px_rgba(218,165,32,0.2)]">
              {/* Video element gets moved here via ref callback when active */}
              <div className="pointer-events-none absolute inset-0 z-10 opacity-15 bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:100%_4px]" />
            </div>

            {/* Footer Progress Bar */}
            <div className="mt-3.5 flex items-center gap-4">
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-border/60 border border-primary/20">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary via-gold-soft to-primary shadow-[var(--glow-gold)]"
                  style={{ width: `${progress}%`, transition: "width 120ms linear" }}
                />
              </div>
              <span className="font-mono text-xs text-primary font-bold tracking-wider">{progress}%</span>
            </div>

            <div className="mt-2 flex items-center justify-between font-mono text-[0.65rem] tracking-[0.25em] text-muted-foreground">
              <span>{formatTime(currentTime)} / {formatTime(videoDuration)}</span>
              <span>AAVISHKARA &apos;26 // CASE STUDY REVEAL</span>
            </div>
          </div>
        )}
      </div>

      {/* Video element — always in DOM so it can be primed during user gestures.
          Moves into the video container via ref callback when active. Hidden off-screen otherwise. */}
      <video
        ref={videoRef}
        src="/aavishkara-short.mp4"
        playsInline
        preload="auto"
        onTimeUpdate={handleTimeUpdate}
        onEnded={finishBoot}
        className="h-full w-full object-contain"
        style={!active ? {
          position: 'fixed',
          top: -9999,
          left: -9999,
          width: 0,
          height: 0,
          opacity: 0,
          pointerEvents: 'none',
        } : undefined}
      />

      {/* RIPPLE EFFECTS */}
      {ripples.map((r) => (
        <span
          key={r.id}
          aria-hidden
          className={r.big ? "boot-ripple boot-ripple-big" : "boot-ripple"}
          style={{ left: r.x, top: r.y }}
        />
      ))}
    </div>
  );
}
