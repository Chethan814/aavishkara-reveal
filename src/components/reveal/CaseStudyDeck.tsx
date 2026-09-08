import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { CaseStudyPanel } from "./CaseStudySection";
import { MagneticButton } from "./MagneticButton";
import { PortalTransition } from "./PortalTransition";
import { EASE, PORTAL_SWAP, PORTAL_TOTAL } from "@/lib/motion";
import { playSound } from "@/lib/sound";
import type { CaseStudy } from "@/data/caseStudies";

export function CaseStudyDeck({ studies }: { studies: CaseStudy[] }) {
  const [index, setIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const fitAreaRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);
  const busyRef = useRef(false);
  const inViewRef = useRef(false);
  const timersRef = useRef<number[]>([]);

  indexRef.current = index;
  inViewRef.current = inView;

  /* every animation timer is tracked so nothing fires after unmount */
  const track = useCallback((id: number) => {
    timersRef.current.push(id);
  }, []);

  useEffect(
    () => () => {
      timersRef.current.forEach(window.clearTimeout);
      timersRef.current = [];
    },
    [],
  );

  const go = useCallback(
    (dir: 1 | -1) => {
      if (busyRef.current) return;
      const next = indexRef.current + dir;
      if (next < 0 || next >= studies.length) return;
      busyRef.current = true;
      playSound("portal");
      setTransitioning(true);
      track(window.setTimeout(() => setIndex(next), PORTAL_SWAP));
      track(
        window.setTimeout(() => {
          setTransitioning(false);
          busyRef.current = false;
          timersRef.current = [];
        }, PORTAL_TOTAL),
      );
    },
    [studies.length, track],
  );

  const jumpTo = useCallback(
    (target: number) => {
      if (busyRef.current || target === indexRef.current) return;
      if (target < 0 || target >= studies.length) return;
      busyRef.current = true;
      playSound("portal");
      setTransitioning(true);
      track(window.setTimeout(() => setIndex(target), PORTAL_SWAP));
      track(
        window.setTimeout(() => {
          setTransitioning(false);
          busyRef.current = false;
          timersRef.current = [];
        }, PORTAL_TOTAL),
      );
    },
    [studies.length, track],
  );

  /* Reset scroll position to top whenever index changes */
  useEffect(() => {
    const area = fitAreaRef.current;
    if (area) {
      area.scrollTop = 0;
    }
  }, [index]);



  /* pin the deck: once it enters, lock scrolling until the sequence is done */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const lenis = () => (window as unknown as { __lenis?: any }).__lenis;

    let stopTimer = 0;
    const enter = () => {
      if (inViewRef.current) return;
      setInView(true);
      inViewRef.current = true;
      const l = lenis();
      if (l) {
        l.scrollTo(el, { duration: 0.8, lock: true });
        window.clearTimeout(stopTimer);
        stopTimer = window.setTimeout(() => l.stop(), 850);
      } else {
        el.scrollIntoView({ behavior: "smooth" });
      }
    };

    const release = () => {
      if (!inViewRef.current || busyRef.current) return;
      window.clearTimeout(stopTimer);
      setInView(false);
      inViewRef.current = false;
      lenis()?.start();
    };


    const onScroll = () => {
      if (inViewRef.current) return;
      const r = el.getBoundingClientRect();
      if (r.top <= window.innerHeight * 0.45 && r.bottom > window.innerHeight * 0.5) enter();
    };

    let released = 0;
    const onWheel = (e: WheelEvent) => {
      if (!inViewRef.current) return;
      const down = e.deltaY > 0;

      /* when the panel is taller than the screen, the wheel scrolls it first */
      const area = fitAreaRef.current;
      if (needsScrollRef.current && area) {
        const atTop = area.scrollTop <= 0;
        const atBottom = area.scrollTop + area.clientHeight >= area.scrollHeight - 1;
        if ((down && !atBottom) || (!down && !atTop)) {
          e.preventDefault();
          e.stopPropagation();
          area.scrollTop += e.deltaY;
          return;
        }
      }

      const canLeave =
        (down && indexRef.current === studies.length - 1) ||
        (!down && indexRef.current === 0);
      if (canLeave && Date.now() - released > 600) {
        released = Date.now();
        release();
      } else {
        e.preventDefault();
        e.stopPropagation();
      }
    };


    let startY = 0;
    const onTouchStart = (e: TouchEvent) => {
      startY = e.touches[0]?.clientY ?? 0;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!inViewRef.current) return;
      const y = e.touches[0]?.clientY ?? 0;
      const down = startY - y > 0;

      /* let a tall panel scroll under the finger before leaving the deck */
      const area = fitAreaRef.current;
      if (needsScrollRef.current && area) {
        const atTop = area.scrollTop <= 0;
        const atBottom = area.scrollTop + area.clientHeight >= area.scrollHeight - 1;
        if ((down && !atBottom) || (!down && !atTop)) return;
      }

      const canLeave =
        (down && indexRef.current === studies.length - 1) ||
        (!down && indexRef.current === 0);
      if (canLeave && Math.abs(startY - y) > 80) release();
      else e.preventDefault();
    };


    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", onWheel, { passive: false, capture: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true, capture: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false, capture: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", onWheel, true);
      window.removeEventListener("touchstart", onTouchStart, true);
      window.removeEventListener("touchmove", onTouchMove, true);
      lenis()?.start();
    };
  }, [studies.length]);

  /* presenter remote / keyboard */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!inViewRef.current || busyRef.current) return;
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        e.preventDefault();
        go(1);
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        go(-1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  /* swipe */
  const touch = useRef({ x: 0, y: 0 });
  const onTouchStart = (e: React.TouchEvent) => {
    touch.current = { x: e.touches[0]?.clientX ?? 0, y: e.touches[0]?.clientY ?? 0 };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (busyRef.current) return;
    const t = e.changedTouches[0];
    if (!t) return;
    const dx = t.clientX - touch.current.x;
    const dy = t.clientY - touch.current.y;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1);
  };

  const study = studies[index];
  if (!study) return null;
  const isFirst = index === 0;
  const isLast = index === studies.length - 1;

  return (
    <section
      ref={sectionRef}
      id="case-deck"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      className="relative z-10 flex h-screen min-h-[100dvh] w-full flex-col justify-between overflow-hidden px-4 py-4 sm:px-8 sm:py-6 lg:px-16"
    >
      <PortalTransition active={transitioning} />

      {/* progress indicator — updates with the swap, not before */}
      <div className="pointer-events-none absolute right-4 top-4 z-40 flex items-center gap-2.5 rounded-full border border-primary/40 bg-card/80 px-3.5 py-1.5 backdrop-blur-sm sm:right-8 sm:top-5">
        <span className="display text-xs tracking-[0.3em] text-primary sm:text-sm">
          Case Study {String(index + 1).padStart(2, "0")}
        </span>
        <span className="h-3.5 w-px bg-border" />
        <span className="display text-xs tracking-[0.3em] text-muted-foreground sm:text-sm">
          {String(studies.length).padStart(2, "0")}
        </span>
      </div>

      <motion.div
        ref={fitAreaRef}
        animate={
          transitioning
            ? { scale: 0.985, opacity: 0.25, filter: "blur(6px)", x: [0, -3, 3, 0] }
            : { scale: 1, opacity: 1, filter: "blur(0px)" }
        }
        transition={{ duration: transitioning ? 0.25 : 0.5, ease: EASE }}
        className="flex min-h-0 w-full flex-1 justify-center items-start overflow-y-auto overflow-x-hidden case-study-scrollbar px-1 sm:px-3 pt-8 sm:pt-4 pb-2"
      >
        <AnimatePresence mode="wait">
          <div
            key={index}
            ref={contentRef}
            className="w-full"
          >
            <CaseStudyPanel study={study} index={index} />
          </div>
        </AnimatePresence>
      </motion.div>


      {/* navigation */}
      <div className="mx-auto mt-2 flex w-full max-w-5xl shrink-0 flex-col items-center gap-2 sm:mt-3 sm:gap-2.5 z-30">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/70 to-transparent shadow-[var(--glow-gold)]" />
        <div className="flex w-full flex-wrap items-center justify-between gap-2.5">
          <MagneticButton
            variant="ghost"
            onClick={() => go(-1)}
            disabled={isFirst || transitioning}
            ariaLabel="Previous case study"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden xs:inline">Previous</span>
          </MagneticButton>

          {/* Quick jump pills - scrollable horizontally on ALL screen sizes */}
          <div className="flex max-w-[65vw] sm:max-w-md lg:max-w-xl items-center gap-1 overflow-x-auto py-1 px-1 scrollbar-none">
            {studies.map((s, idx) => (
              <button
                key={s.code || idx}
                type="button"
                onClick={() => jumpTo(idx)}
                disabled={transitioning}
                title={`${s.code}: ${s.title}`}
                className={`rounded shrink-0 px-2 py-0.5 font-mono text-[0.68rem] transition-all cursor-pointer ${
                  idx === index
                    ? "bg-primary font-bold text-primary-foreground shadow-[0_0_12px_var(--gold)] scale-105"
                    : "border border-border/50 bg-card/60 text-muted-foreground hover:border-primary/50 hover:text-foreground"
                }`}
              >
                {s.code || String(idx + 1).padStart(2, "0")}
              </button>
            ))}
          </div>

          <MagneticButton
            onClick={() => go(1)}
            disabled={isLast || transitioning}
            ariaLabel="Next case study"
          >
            <span className="hidden xs:inline">{isLast ? "All Twenty Revealed" : "Next Case Study"}</span>
            <span className="xs:hidden">{isLast ? "Done" : "Next"}</span>
            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </MagneticButton>
        </div>
        <p className="display text-[0.6rem] tracking-[0.35em] text-muted-foreground sm:text-xs">
          {isLast
            ? "Scroll down to continue"
            : "Use buttons, swipe, arrow keys or problem tags"}
        </p>
      </div>
    </section>
  );
}
