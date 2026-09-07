import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export function DeckProgress({ total }: { total: number }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[id^='case-']"),
    );
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          const idx = sections.indexOf(visible.target as HTMLElement);
          if (idx >= 0) setCurrent(idx + 1);
        }
      },
      { threshold: [0.35, 0.6] },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {current > 0 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.4 }}
          className="fixed right-4 top-6 z-50 flex items-center gap-3 rounded-full border border-primary/40 bg-card/80 px-5 py-2 backdrop-blur-sm sm:right-10 sm:top-10"
        >
          <span className="display text-sm tracking-[0.3em] text-primary sm:text-base">
            Case Study {String(current).padStart(2, "0")}
          </span>
          <span className="h-4 w-px bg-border" />
          <span className="display text-sm tracking-[0.3em] text-muted-foreground sm:text-base">
            {String(total).padStart(2, "0")}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
