import { useEffect, useMemo } from "react";

/** Faint circuit grid + drifting particles. Purely decorative, low opacity. */
export function Ambience() {
  const particles = useMemo(
    () =>
      Array.from({ length: 22 }, (_, i) => ({
        id: i,
        left: (i * 37) % 100,
        top: (i * 53) % 100,
        size: 1 + ((i * 7) % 3),
        delay: (i % 10) * 1.1,
        duration: 9 + ((i * 3) % 9),
        gold: i % 3 === 0,
      })),
    [],
  );

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const root = document.documentElement;
    let rafId: number | null = null;
    let pendingEvent: PointerEvent | null = null;

    const updatePointer = () => {
      if (!pendingEvent) return;
      root.style.setProperty("--pointer-x", `${(pendingEvent.clientX / window.innerWidth - 0.5) * 18}px`);
      root.style.setProperty("--pointer-y", `${(pendingEvent.clientY / window.innerHeight - 0.5) * 18}px`);
      rafId = null;
    };

    const onMove = (event: PointerEvent) => {
      pendingEvent = event;
      if (rafId === null) {
        rafId = requestAnimationFrame(updatePointer);
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden contain-strict">
      <div className="circuit-grid ambient-grid absolute inset-0 will-change-transform" />
      <div className="ambient-glow absolute left-1/2 top-0 h-[60vh] w-[70vw] -translate-x-1/2 rounded-full bg-accent/8 blur-[80px] will-change-transform" />
      <div className="ambient-glow-delayed absolute bottom-0 right-0 h-[50vh] w-[50vw] rounded-full bg-primary/6 blur-[90px] will-change-transform" />
      {particles.map((p) => (
        <span
          key={p.id}
          className={`ambient-particle absolute rounded-full ${p.gold ? "bg-primary/50" : "bg-accent/50"} will-change-transform`}
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
