import { motion } from "motion/react";
import type { CaseStudy } from "@/data/caseStudies";

const EASE = [0.22, 1, 0.36, 1] as const;

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
    <div className="mx-auto w-full max-w-6xl">
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: EASE }}
        className="display text-sm tracking-[0.5em] text-accent sm:text-base"
      >
        {study.category}
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.6, ease: EASE }}
        className="display text-glow-gold mt-4 text-4xl leading-[1] text-primary sm:text-6xl lg:text-7xl"
      >
        <span className="text-gold-soft/70">{pad(index + 1)}</span>{" "}
        <span>{study.title}</span>
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.18, ease: EASE }}
        className="mt-8 max-w-4xl"
      >
        <h3 className="display text-sm tracking-[0.4em] text-primary sm:text-base">Context</h3>
        <p className="mt-3 text-lg leading-relaxed text-foreground/85 sm:text-xl">
          {study.context}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.26, ease: EASE }}
        className="mt-8 max-w-4xl border-l-4 border-primary bg-card/70 py-5 pl-6 pr-5 shadow-[0_0_60px_-30px_var(--gold)]"
      >
        <h3 className="display text-sm tracking-[0.4em] text-primary sm:text-base">
          Problem Statement
        </h3>
        <p className="mt-3 text-xl leading-relaxed text-foreground sm:text-2xl">{study.problem}</p>
      </motion.div>

      <div className="mt-8">
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.32 }}
          className="display text-sm tracking-[0.4em] text-primary sm:text-base"
        >
          Requirements &amp; Constraints
        </motion.h3>
        <ul className="mt-4 grid gap-3 lg:grid-cols-2">
          {study.requirements.map((item, i) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, delay: 0.36 + i * 0.06, ease: EASE }}
              className="flex gap-3 text-lg leading-relaxed text-foreground/85 sm:text-xl"
            >
              <span className="mt-3 h-2 w-2 shrink-0 rounded-full bg-primary" />
              <span>{item}</span>
            </motion.li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.42 }}
          className="display text-sm tracking-[0.4em] text-primary sm:text-base"
        >
          Evaluation Focus
        </motion.h3>
        <div className="mt-4 grid gap-5 md:grid-cols-2">
          {[
            ["Real-World Impact", study.impact],
            ["Technical Depth", study.technical],
          ].map(([title, points], i) => (
            <motion.div
              key={title as string}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.48 + i * 0.08, ease: EASE }}
              className="rounded-md border border-accent/40 bg-card/60 p-6 shadow-[0_0_70px_-30px_var(--neon)]"
            >
              <h4 className="display text-sm tracking-[0.3em] text-accent sm:text-base">
                {title as string}
              </h4>
              <ul className="mt-3 space-y-2">
                {(points as string[]).map((p) => (
                  <li
                    key={p}
                    className="flex gap-3 text-base leading-relaxed text-foreground/85 sm:text-lg"
                  >
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
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
