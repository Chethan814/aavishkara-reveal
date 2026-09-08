import { useCallback, useEffect, useRef, useState } from "react";

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
      setVisible(false);
      doneRef.current(false);
    }
  }, []);

  /* warm downstream assets on mount */
  useEffect(() => {
    if (!visible) return;
    warmBootPreload();
  }, [visible]);

  const activate = useCallback(
    (points: { x: number; y: number }[]) => {
      if (activeRef.current) return;
      activeRef.current = true;
      setActive(true);
      setPhase(1);
      setLockedFingers([true, true, true, true, true]);
      points.forEach((p) => addRipple(p.x, p.y, true));

      const pool = shuffled(LOG_POOL);
      const start = performance.now();

      /* status beats */
      PHASE_1_STATUS.forEach((text, i) =>
        later(() => setStatus(text), (PHASE_1_DURATION / PHASE_1_STATUS.length) * i + 60),
      );
      later(() => setPhase(2), PHASE_1_DURATION);
      const p2 = TOTAL_ACTIVATION_DURATION - PHASE_1_DURATION;
      PHASE_2_STATUS.forEach((text, i) =>
        later(() => setStatus(text), PHASE_1_DURATION + (p2 / PHASE_2_STATUS.length) * i + 60),
      );

      /* glitch bursts */
      [PHASE_1_DURATION, PHASE_1_DURATION + p2 * 0.35, PHASE_1_DURATION + p2 * 0.68].forEach(
        (at, i) => {
          later(() => {
            setGlitch(true);
            later(() => setGlitch(false), 120 + i * 40);
          }, at);
        },
      );

      /* log stream */
      let li = 0;
      const pushLine = () => {
        const line = pool[li % pool.length]!;
        li += 1;
        setLines((prev) => [...prev.slice(-11), { id: li, text: line }]);
        const elapsed = performance.now() - start;
        const t = Math.min(1, elapsed / TOTAL_ACTIVATION_DURATION);
        if (elapsed < TOTAL_ACTIVATION_DURATION - 400) {
          later(pushLine, 460 - t * 340);
        }
      };
      pushLine();

      /* progress counter */
      const tick = () => {
        const t = Math.min(1, (performance.now() - start) / TOTAL_ACTIVATION_DURATION);
        const eased = t < 0.5 ? t * 1.5 : 0.75 + (t - 0.5) * 0.5;
        setProgress(Math.min(100, Math.round((t < 0.98 ? eased : 1) * 100)));
        if (t < 1) rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);

      /* hand off to the site */
      later(() => setWipe(true), TOTAL_ACTIVATION_DURATION);
      later(() => {
        sessionStorage.setItem(BOOT_SESSION_KEY, "1");
        setVisible(false);
        doneRef.current(true);
      }, TOTAL_ACTIVATION_DURATION + WIPE_DURATION);
    },
    [addRipple],
  );

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

  /* Input Handling: Multi-Touch & Multi-Finger Scanner */
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
      if (activeRef.current) return;
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
      const pt = { id: 999, x: e.clientX, y: e.clientY };
      setActiveTouches([pt]);
      addRipple(e.clientX, e.clientY, false);
      cancelCharge();
      startCharge([pt], HOLD_FALLBACK_DURATION);
    };

    const onMouseMove = (e: MouseEvent) => {
      if (activeRef.current || holdTimer.current === null) return;
      setActiveTouches([{ id: 999, x: e.clientX, y: e.clientY }]);
    };

    const onMouseUp = () => {
      if (activeRef.current) return;
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
  }, [visible, activate, addRipple, charge, updateFingerStates]);

  useEffect(
    () => () => {
      timers.current.forEach(clearTimeout);
      cancelAnimationFrame(rafRef.current);
      cancelAnimationFrame(chargeRaf.current);
    },
    [],
  );

  if (!visible) return null;

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

      {/* FLOATING OUTLINE RETICLES AROUND EACH PHYSICAL FINGER TOUCH */}
      {activeTouches.map((touch, i) => (
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

      {/* LASER ENERGY CONNECTION LINES BETWEEN MULTIPLE TOUCHES */}
      {activeTouches.length >= 2 && (
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
        className={`boot-frame relative z-10 w-[min(94vw,56rem)] rounded-lg border border-primary/30 bg-card/40 p-5 backdrop-blur-md sm:p-9 ${
          glitch ? "boot-glitch" : ""
        }`}
        style={{
          boxShadow: `0 0 ${20 + progress * 0.9}px oklch(0.82 0.16 85 / ${0.12 + progress * 0.0035})`,
          transform: finale ? `scale(${1 + (progress - 86) * 0.004})` : undefined,
          transition: "transform 200ms linear",
        }}
      >
        {!active ? (
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
          </div>
        ) : (
          /* ACTIVE BOOT TERMINAL */
          <div className="text-left">
            <div className="flex items-center justify-between border-b border-primary/20 pb-3">
              <p className="display text-sm tracking-[0.35em] text-primary sm:text-lg">{status}</p>
              <span className="font-mono text-xs text-primary/70">5/5 NODES VERIFIED</span>
            </div>

            <div className="mt-5 h-40 overflow-hidden font-mono text-[0.68rem] leading-relaxed text-accent/85 sm:h-48 sm:text-xs">
              {lines.map((l) => (
                <div key={l.id} className="boot-line">
                  {l.text}
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-4">
              <div className="h-[3px] flex-1 overflow-hidden rounded-full bg-border">
                <div
                  className="h-full rounded-full bg-primary shadow-[var(--glow-gold)]"
                  style={{ width: `${progress}%`, transition: "width 120ms linear" }}
                />
              </div>
              <span className="display w-14 text-right text-xs text-primary">{progress}%</span>
            </div>

            <div className="mt-3 flex items-center justify-between text-[0.6rem] tracking-[0.32em] text-muted-foreground">
              <span>{phase === 1 ? "PHASE 01 — POWER-UP" : "PHASE 02 — BOOST"}</span>
              <span>AVK26_CORE_READY</span>
            </div>
          </div>
        )}
      </div>

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
