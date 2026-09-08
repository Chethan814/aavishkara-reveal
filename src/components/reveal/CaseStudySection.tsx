import { motion } from "motion/react";
import type { CaseStudy } from "@/data/caseStudies";
import { EASE } from "@/lib/motion";


function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function SectionDivider() {
  return (
    <motion.div
      aria-hidden
      initial={{ scaleX: 0, opacity: 0 }}
      animate={{ scaleX: 1, opacity: 1 }}
      transition={{ duration: 0.9, ease: EASE }}
      style={{ transformOrigin: "left" }}
      className="mx-auto h-px w-full max-w-6xl bg-gradient-to-r from-transparent via-primary to-transparent shadow-[var(--glow-gold)]"
    />
  );
}

/** A single case study, animated in on mount (used by the button-driven deck). */
export function CaseStudyPanel({ study, index }: { study: CaseStudy; index: number }) {
  return (
    <div className="mx-auto w-full max-w-5xl">
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.08, ease: EASE }}
        className="display text-xs tracking-[0.4em] text-accent sm:text-sm"
      >
        {study.category}
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.55, delay: 0.14, ease: EASE }}
        className="display text-glow-gold mt-1 text-2xl leading-tight text-primary sm:text-4xl lg:text-5xl"
      >
        <span className="text-gold-soft/70">{pad(index + 1)}</span>{" "}
        <span>{study.title}</span>
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.18, ease: EASE }}
        className="mt-3 max-w-4xl sm:mt-3.5"
      >
        <h3 className="display text-xs tracking-[0.35em] text-primary sm:text-sm">Context</h3>
        <p className="mt-1 text-sm leading-relaxed text-foreground/80 sm:text-base">
          {study.context}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.24, ease: EASE }}
        className="mt-3 max-w-4xl border-l-2 border-primary bg-card/70 py-2.5 pl-4 pr-4 shadow-[0_0_50px_-25px_var(--gold)] sm:mt-3.5 sm:border-l-4 sm:py-3 sm:pl-5"
      >
        <h3 className="display text-xs tracking-[0.35em] text-primary sm:text-sm">
          Problem Statement
        </h3>
        <p className="mt-1 text-base font-medium leading-snug text-foreground sm:text-lg lg:text-xl">{study.problem}</p>
      </motion.div>

      <div className="mt-3 sm:mt-3.5">
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35, delay: 0.28 }}
          className="display text-xs tracking-[0.35em] text-primary sm:text-sm"
        >
          Requirements &amp; Constraints
        </motion.h3>
        <ul className="mt-1.5 grid gap-1.5 lg:grid-cols-2">
          {study.requirements.map((item, i) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.32 + i * 0.05, ease: EASE }}
              className="flex gap-2.5 text-xs leading-relaxed text-foreground/85 sm:text-sm"
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span>{item}</span>
            </motion.li>
          ))}
        </ul>
      </div>

      <div className="mt-3 sm:mt-3.5">
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35, delay: 0.36 }}
          className="display text-xs tracking-[0.35em] text-primary sm:text-sm"
        >
          Evaluation Focus
        </motion.h3>
        <div className="mt-1.5 grid gap-3 md:grid-cols-2">
          {[
            ["Real-World Impact", study.impact],
            ["Technical Depth", study.technical],
          ].map(([title, points], i) => (
            <motion.div
              key={title as string}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.4 + i * 0.07, ease: EASE }}
              className="rounded-md border border-accent/40 bg-card/60 p-3 shadow-[0_0_50px_-25px_var(--neon)] sm:p-3.5"
            >
              <h4 className="display text-xs tracking-[0.25em] text-accent sm:text-sm">
                {title as string}
              </h4>
              <ul className="mt-1.5 space-y-1">
                {(points as string[]).map((p) => (
                  <li
                    key={p}
                    className="flex gap-2 text-xs leading-relaxed text-foreground/85 sm:text-sm"
                  >
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
