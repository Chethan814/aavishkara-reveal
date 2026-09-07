import { useEffect, useMemo, useState } from "react";

import { HERO_SPARK_DURATION } from "@/lib/motion";

/**
 * One-time opening flourish: gold streaks fly in from both edges past the
 * centre, then fade out individually. Unmounts itself after the burst.
 */
export function SparkBurst() {
  const [done, setDone] = useState(false);

  const sparks = useMemo(
    () =>
      Array.from({ length: 26 }, (_, i) => {
        const fromLeft = i % 2 === 0;
        const top = 6 + ((i * 17) % 88);
        const length = 90 + ((i * 23) % 180);
        const duration = 1.1 + ((i * 7) % 13) / 10;
        const delay = ((i * 11) % 22) / 10;
        return { id: i, fromLeft, top, length, duration, delay, thin: i % 3 === 0 };
      }),
    [],
  );

  useEffect(() => {
    const t = window.setTimeout(() => setDone(true), HERO_SPARK_DURATION);
    return () => window.clearTimeout(t);
  }, []);

  if (done) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[5] overflow-hidden">
      {sparks.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-full"
          style={{
            top: `${s.top}%`,
            left: s.fromLeft ? 0 : "auto",
            right: s.fromLeft ? "auto" : 0,
            width: s.length,
            height: s.thin ? 2 : 3,
            background: s.fromLeft
              ? "linear-gradient(90deg, transparent, var(--gold))"
              : "linear-gradient(270deg, transparent, var(--gold))",
            boxShadow: "0 0 16px 2px oklch(0.82 0.16 85 / 0.7)",
            opacity: 0,
            animation: `${s.fromLeft ? "spark-right" : "spark-left"} ${s.duration}s cubic-bezier(0.22,1,0.36,1) ${s.delay}s both`,
          }}
        />
      ))}
    </div>
  );
}
