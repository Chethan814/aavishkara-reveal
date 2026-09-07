import { AnimatePresence, motion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Total duration of the portal transition in ms. */
export const PORTAL_TOTAL = 2200;
/** Point at which the underlying content is swapped (peak of the light burst). */
export const PORTAL_SWAP = 1050;

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
          {/* darken */}
          <motion.div
            className="absolute inset-0 bg-background"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.75, 0.9, 0.5, 0] }}
            transition={{ duration: PORTAL_TOTAL / 1000, times: [0, 0.28, 0.48, 0.72, 1], ease: "easeInOut" }}
          />

          {/* doorway: opens from the centre, floods the screen, then closes */}
          <motion.div
            className="relative"
            initial={{ width: 0, height: "18vh", opacity: 0 }}
            animate={{
              width: ["0vw", "16vw", "220vw", "180vw", "0vw"],
              height: ["18vh", "70vh", "220vh", "180vh", "18vh"],
              opacity: [0, 1, 1, 1, 0],
            }}
            transition={{ duration: PORTAL_TOTAL / 1000, times: [0, 0.3, 0.52, 0.68, 1], ease: EASE }}
            style={{
              borderRadius: "9999px 9999px 0 0",
              background:
                "radial-gradient(closest-side, rgba(255,255,255,0.98), oklch(0.9 0.15 88 / 0.9) 45%, oklch(0.78 0.17 70 / 0.35) 72%, transparent 100%)",
              boxShadow: "0 0 160px 40px oklch(0.85 0.16 85 / 0.55)",
            }}
          />

          {/* white burst at the peak */}
          <motion.div
            className="absolute inset-0 bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 0.85, 0.1, 0] }}
            transition={{ duration: PORTAL_TOTAL / 1000, times: [0, 0.4, 0.5, 0.66, 1], ease: "easeInOut" }}
          />

          {/* horizontal light wipe */}
          <motion.div
            className="absolute inset-y-0 w-[35vw] bg-gradient-to-r from-transparent via-primary to-transparent blur-2xl"
            initial={{ x: "-60vw", opacity: 0 }}
            animate={{ x: ["-60vw", "120vw"], opacity: [0, 1, 0] }}
            transition={{ duration: 1.1, delay: 0.35, ease: EASE }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
