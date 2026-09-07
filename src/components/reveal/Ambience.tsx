import { useMemo } from "react";

/** Faint circuit grid + drifting particles. Purely decorative, low opacity. */
export function Ambience() {
  const particles = useMemo(
    () =>
      Array.from({ length: 34 }, (_, i) => ({
        id: i,
        left: (i * 37) % 100,
        top: (i * 53) % 100,
        size: 1 + ((i * 7) % 3),
        delay: (i % 12) * 0.9,
        duration: 9 + ((i * 3) % 9),
        gold: i % 3 === 0,
      })),
    [],
  );

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="circuit-grid absolute inset-0" />
      <div className="absolute left-1/2 top-0 h-[60vh] w-[70vw] -translate-x-1/2 rounded-full bg-accent/8 blur-[140px]" />
      <div className="absolute bottom-0 right-0 h-[50vh] w-[50vw] rounded-full bg-primary/6 blur-[160px]" />
      {particles.map((p) => (
        <span
          key={p.id}
          className={`absolute rounded-full ${p.gold ? "bg-primary/50" : "bg-accent/50"}`}
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            animation: `float-particle ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
