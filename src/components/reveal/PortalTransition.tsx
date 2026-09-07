import { AnimatePresence, motion } from "motion/react";

import { EASE, PORTAL_SWAP, PORTAL_TOTAL } from "@/lib/motion";

export { PORTAL_SWAP, PORTAL_TOTAL };


export function PortalTransition({ active }: { active: boolean }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[60] flex items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          {/* current scene compresses into darkness */}
          <motion.div
            className="absolute inset-0 bg-background"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.72, 0.9, 0.58, 0] }}
            transition={{ duration: PORTAL_TOTAL / 1000, times: [0, 0.14, 0.5, 0.76, 1], ease: EASE }}
          />

          {/* vertical portal bar expands, peaks at the swap, and seals again */}
          <motion.div
            className="portal-impact relative h-[120vh]"
            initial={{ width: "2px", opacity: 0, scaleY: 0.25 }}
            animate={{
              width: ["2px", "12px", "32vw", "130vw", "18vw", "2px"],
              opacity: [0, 1, 1, 1, 0],
              scaleY: [0.25, 1, 1, 1, 1, 0.25],
            }}
            transition={{ duration: PORTAL_TOTAL / 1000, times: [0, 0.14, 0.36, 0.5, 0.78, 1], ease: EASE }}
            style={{
              background:
                "linear-gradient(90deg, transparent, oklch(0.82 0.16 85 / 0.72) 18%, oklch(0.98 0.01 90) 50%, oklch(0.82 0.16 85 / 0.72) 82%, transparent)",
              boxShadow: "0 0 90px 22px oklch(0.82 0.16 85 / 0.48)",
              filter: "blur(1px)",
            }}
          />

          {/* white burst at the peak */}
          <motion.div
            className="absolute inset-0 bg-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 0.72, 0.08, 0] }}
            transition={{ duration: PORTAL_TOTAL / 1000, times: [0, 0.42, 0.5, 0.64, 1], ease: EASE }}
          />

          {/* tight central flare gives the sweep motion blur */}
          <motion.div
            className="absolute inset-y-0 left-1/2 w-5 -translate-x-1/2 bg-foreground blur-md"
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
            transition={{ duration: PORTAL_TOTAL / 1000, times: [0, 0.3, 0.7, 1], ease: EASE }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
