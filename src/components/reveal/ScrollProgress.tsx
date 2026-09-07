import { motion, useScroll, useSpring } from "motion/react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });

  return (
    <div
      aria-hidden
      className="fixed right-5 top-1/2 z-50 hidden h-40 w-px -translate-y-1/2 bg-border md:block"
    >
      <motion.div
        style={{ scaleY, transformOrigin: "top" }}
        className="h-full w-px bg-primary shadow-[0_0_12px_var(--gold)]"
      />
    </div>
  );
}
