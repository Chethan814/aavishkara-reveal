import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 240, damping: 26, mass: 0.55 });
  const ringY = useSpring(y, { stiffness: 240, damping: 26, mass: 0.55 });
  const [visible, setVisible] = useState(false);
  const [interactive, setInteractive] = useState(false);
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const rippleId = useRef(0);

  const isInteractiveRef = useRef(false);
  const isVisibleRef = useRef(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let rafId: number | null = null;
    let pendingEvent: PointerEvent | null = null;

    const processMove = () => {
      if (!pendingEvent) return;
      const event = pendingEvent;
      pendingEvent = null;
      rafId = null;

      x.set(event.clientX);
      y.set(event.clientY);

      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        setVisible(true);
      }

      const target = event.target;
      const nextInteractive =
        target instanceof Element &&
        Boolean(target.closest("button, a, [role='button'], input, select, textarea"));

      if (nextInteractive !== isInteractiveRef.current) {
        isInteractiveRef.current = nextInteractive;
        setInteractive(nextInteractive);
      }
    };

    const onMove = (event: PointerEvent) => {
      pendingEvent = event;
      if (rafId === null) {
        rafId = requestAnimationFrame(processMove);
      }
    };

    const onLeave = () => {
      isVisibleRef.current = false;
      setVisible(false);
    };

    const onDown = (event: PointerEvent) => {
      const id = ++rippleId.current;
      setRipples((current) => [...current, { id, x: event.clientX, y: event.clientY }]);
      window.setTimeout(() => {
        setRipples((current) => current.filter((ripple) => ripple.id !== id));
      }, 650);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    window.addEventListener("pointerdown", onDown, { passive: true });
    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [x, y]);

  return (
    <div aria-hidden className="custom-cursor-layer">
      <motion.span
        className="cursor-ring"
        style={{ x: ringX, y: ringY }}
        animate={{ opacity: visible ? 1 : 0, scale: interactive ? 1.48 : 1 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.span
        className="cursor-dot"
        style={{ x, y }}
        animate={{ opacity: visible ? 1 : 0, scale: interactive ? 1.25 : 1 }}
      />
      {ripples.map((ripple) => (
        <span key={ripple.id} className="cursor-ripple" style={{ left: ripple.x, top: ripple.y }} />
      ))}
    </div>
  );
}