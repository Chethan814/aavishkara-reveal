import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { CaseStudyPanel } from "./CaseStudySection";
import { MagneticButton } from "./MagneticButton";
import { PortalTransition, PORTAL_SWAP, PORTAL_TOTAL } from "./PortalTransition";
import type { CaseStudy } from "@/data/caseStudies";

const EASE = [0.22, 1, 0.36, 1] as const;

export function CaseStudyDeck({ studies }: { studies: CaseStudy[] }) {
  const [index, setIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const indexRef = useRef(0);
  const busyRef = useRef(false);
  const inViewRef = useRef(false);

  indexRef.current = index;
  inViewRef.current = inView;

  const go = useCallback(
    (dir: 1 | -1) => {
      if (busyRef.current) return;
      const next = indexRef.current + dir;
      if (next < 0 || next >= studies.length) return;
      busyRef.current = true;
      setTransitioning(true);
      window.setTimeout(() => setIndex(next), PORTAL_SWAP);
      window.setTimeout(() => {
        setTransitioning(false);
        busyRef.current = false;
      }, PORTAL_TOTAL);
    },
    [studies.length],
  );

  /* track whether the deck owns the viewport */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setInView(!!entry && entry.intersectionRatio > 0.55),
      { threshold: [0, 0.55, 0.9] },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* lock free scrolling inside the sequence */
  useEffect(() => {
    const blocked = (down: boolean) =>
      inViewRef.current &&
      (down ? indexRef.current < studies.length - 1 : indexRef.current > 0);

    const onWheel = (e: WheelEvent) => {
      if (blocked(e.deltaY > 0)) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    let startY = 0;
    const onTouchStart = (e: TouchEvent) => {
      startY = e.touches[0]?.clientY ?? 0;
    };
    const onTouchMove = (e: TouchEvent) => {
      const y = e.touches[0]?.clientY ?? 0;
      if (blocked(startY - y > 0)) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    window.addEventListener("wheel", onWheel, { passive: false, capture: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true, capture: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false, capture: true });
    return () => {
      window.removeEventListener("wheel", onWheel, true);
      window.removeEventListener("touchstart", onTouchStart, true);
      window.removeEventListener("touchmove", onTouchMove, true);
    };
  }, [studies.length]);

  /* presenter remote / keyboard */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!inViewRef.current) return;
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
    const t = e.changedTouches[0];
    if (!t) return;
    const dx = t.clientX - touch.current.x;
    const dy = t.clientY - touch.current.y;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1);
  };

  const study = studies[index]!;
  const isFirst = index === 0;
  const isLast = index === studies.length - 1;

  return (
    <section
      ref={sectionRef}
      id="case-deck"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      className="relative z-10 flex min-h-screen w-full flex-col justify-center overflow-hidden px-6 py-16 sm:px-10 lg:px-20"
    >
      <PortalTransition active={transitioning} />

      {/* progress indicator — updates with the swap, not before */}
      <div className="pointer-events-none absolute right-4 top-6 z-40 flex items-center gap-3 rounded-full border border-primary/40 bg-card/80 px-5 py-2 backdrop-blur-sm sm:right-10 sm:top-10">
        <span className="display text-sm tracking-[0.3em] text-primary sm:text-base">
          Case Study {String(index + 1).padStart(2, "0")}
        </span>
        <span className="h-4 w-px bg-border" />
        <span className="display text-sm tracking-[0.3em] text-muted-foreground sm:text-base">
          {String(studies.length).padStart(2, "0")}
        </span>
      </div>

      <motion.div
        animate={
          transitioning
            ? { scale: 1.06, opacity: 0, filter: "blur(8px)" }
            : { scale: 1, opacity: 1, filter: "blur(0px)" }
        }
        transition={{ duration: transitioning ? 0.9 : 0.7, ease: EASE }}
        className="w-full"
      >
        <AnimatePresence mode="wait">
          <div key={index} className="w-full">
            <CaseStudyPanel study={study} index={index} />
          </div>
        </AnimatePresence>
      </motion.div>

      {/* navigation */}
      <div className="mx-auto mt-10 flex w-full max-w-6xl flex-col items-center gap-5">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/70 to-transparent shadow-[var(--glow-gold)]" />
        <div className="flex w-full flex-wrap items-center justify-between gap-4">
          <MagneticButton
            variant="ghost"
            onClick={() => go(-1)}
            disabled={isFirst || transitioning}
            ariaLabel="Previous case study"
          >
            <ArrowLeft className="h-4 w-4" />
            Previous
          </MagneticButton>

          <MagneticButton
            onClick={() => go(1)}
            disabled={isLast || transitioning}
            ariaLabel="Next case study"
          >
            {isLast ? "All Twelve Revealed" : "Next Case Study"}
            <ArrowRight className="h-5 w-5" />
          </MagneticButton>
        </div>
        <p className="display text-[0.6rem] tracking-[0.35em] text-muted-foreground sm:text-xs">
          {isLast
            ? "Scroll down to continue"
            : "Use the buttons, arrow keys, spacebar or swipe"}
        </p>
      </div>
    </section>
  );
}
