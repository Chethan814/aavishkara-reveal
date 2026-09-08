import { useCallback, useEffect, useRef, useState } from "react";
import { Hand } from "lucide-react";

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
  "MULTI-POINT INPUT DETECTED",
  "POWERING UP CORE SYSTEMS",
  "AUTHENTICATING...",
];
const PHASE_2_STATUS = [
  "LOADING CASE STUDY ENGINE...",
  "CALIBRATING DISPLAY...",
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

export function BootSequence({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(true);
  const [active, setActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<0 | 1 | 2>(0);
  const [status, setStatus] = useState("STANDBY");
  const [lines, setLines] = useState<string[]>([]);
  const [glitch, setGlitch] = useState(false);
  const [wipe, setWipe] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const rippleId = useRef(0);
  const activeRef = useRef(false);
  const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
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
      doneRef.current();
    }
  }, []);

  /* warm every downstream asset the moment the boot screen mounts */
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

      /* phase change beat + glitch bursts in phase 2 */
      [PHASE_1_DURATION, PHASE_1_DURATION + p2 * 0.35, PHASE_1_DURATION + p2 * 0.68].forEach(
        (at, i) => {
          later(() => {
            setGlitch(true);
            later(() => setGlitch(false), 120 + i * 40);
          }, at);
        },
      );

      /* log typing — accelerates as it goes */
      let li = 0;
      const pushLine = () => {
        const line = pool[li % pool.length]!;
        li += 1;
        setLines((prev) => [...prev.slice(-11), line]);
        const elapsed = performance.now() - start;
        const t = Math.min(1, elapsed / TOTAL_ACTIVATION_DURATION);
        if (elapsed < TOTAL_ACTIVATION_DURATION - 400) {
          later(pushLine, 460 - t * 340);
        }
      };
      pushLine();

      /* progress */
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
        doneRef.current();
      }, TOTAL_ACTIVATION_DURATION + WIPE_DURATION);
    },
    [addRipple],
  );

  /* input handling */
  useEffect(() => {
    if (!visible) return;

    const onTouchStart = (e: TouchEvent) => {
      if (activeRef.current) return;
      if (e.touches.length >= 2) {
        activate(
          Array.from(e.touches).map((t) => ({ x: t.clientX, y: t.clientY })),
        );
      } else {
        const t = e.touches[0];
        if (t) addRipple(t.clientX, t.clientY, false);
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      console.log("[boot] mousedown", activeRef.current);
      if (activeRef.current) return;
      addRipple(e.clientX, e.clientY, false);
      holdTimer.current = setTimeout(
        () => activate([{ x: e.clientX, y: e.clientY }]),
        HOLD_FALLBACK_DURATION,
      );
    };
    const cancelHold = () => {
      if (holdTimer.current) clearTimeout(holdTimer.current);
      holdTimer.current = null;
    };

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", cancelHold);
    window.addEventListener("mouseleave", cancelHold);
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", cancelHold);
      window.removeEventListener("mouseleave", cancelHold);
      cancelHold();
    };
  }, [visible, activate, addRipple]);

  useEffect(
    () => () => {
      timers.current.forEach(clearTimeout);
      cancelAnimationFrame(rafRef.current);
    },
    [],
  );

  if (!visible) return null;

  const finale = active && progress > 86;

  return (
    <div
      className="boot-root fixed inset-0 z-[90] flex select-none items-center justify-center overflow-hidden bg-background"
      style={{ animation: wipe ? `boot-wipe ${WIPE_DURATION}ms var(--ease-cinematic) forwards` : undefined }}
    >
      {/* parallax circuit layer (slower than text) */}
      <div className={`boot-grid absolute inset-0 ${active ? "boot-grid-hot" : ""}`} />
      <div className={`boot-scan absolute inset-0 ${active ? "boot-scan-hot" : ""}`} />

      <div
        className={`boot-frame relative z-10 w-[min(92vw,54rem)] rounded-lg border border-primary/30 bg-card/40 p-6 backdrop-blur-sm sm:p-10 ${
          glitch ? "boot-glitch" : ""
        }`}
        style={{
          boxShadow: `0 0 ${20 + progress * 0.9}px oklch(0.82 0.16 85 / ${0.12 + progress * 0.0035})`,
          transform: finale ? `scale(${1 + (progress - 86) * 0.004})` : undefined,
          transition: "transform 200ms linear",
        }}
      >
        {!active ? (
          <div className="flex flex-col items-center gap-7 py-10 text-center">
            <Hand className="boot-hand h-16 w-16 text-primary sm:h-20 sm:w-20" strokeWidth={1.25} />
            <p className="display text-xs tracking-[0.42em] text-foreground/85 sm:text-base">
              Place your hand on screen to begin
            </p>
            <p className="text-[0.6rem] tracking-[0.3em] text-muted-foreground">
              Two or more points of contact required
            </p>
          </div>
        ) : (
          <div className="text-left">
            <p className="display text-sm tracking-[0.35em] text-primary sm:text-lg">{status}</p>

            <div className="mt-6 h-40 overflow-hidden font-mono text-[0.68rem] leading-relaxed text-accent/80 sm:h-48 sm:text-xs">
              {lines.map((l, i) => (
                <div key={`${l}-${i}`} className="boot-line">
                  {l}
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

            <p className="mt-3 text-[0.6rem] tracking-[0.32em] text-muted-foreground">
              {phase === 1 ? "PHASE 01 — POWER-UP" : "PHASE 02 — BOOST"}
            </p>
          </div>
        )}
      </div>

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
