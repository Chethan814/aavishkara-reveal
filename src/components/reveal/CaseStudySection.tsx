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
    <div className="mx-auto w-full max-w-5xl px-1 sm:px-3 pb-6">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.08, ease: EASE }}
        className="flex flex-wrap items-center gap-2 sm:gap-3"
      >
        {study.code && (
          <span className="rounded border border-primary/60 bg-primary/20 px-2.5 py-0.5 font-mono text-[0.7rem] font-bold tracking-widest text-primary shadow-[0_0_15px_-4px_var(--gold)] sm:text-xs">
            {study.code}
          </span>
        )}
        {study.language && (
          <span className="rounded border border-accent/40 bg-accent/15 px-2.5 py-0.5 font-mono text-[0.7rem] tracking-wider text-accent sm:text-xs">
            {study.language}
          </span>
        )}
        <span className="display text-xs tracking-[0.3em] text-muted-foreground sm:text-sm">
          {study.category}
        </span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.55, delay: 0.14, ease: EASE }}
        className="display text-glow-gold mt-2 text-xl leading-snug text-primary sm:text-3xl lg:text-4xl"
      >
        <span className="text-gold-soft/70">{pad(index + 1)}</span>{" "}
        <span>{study.title}</span>
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.18, ease: EASE }}
        className="mt-3 max-w-4xl sm:mt-4"
      >
        <h3 className="display text-xs tracking-[0.35em] text-primary sm:text-sm">Brief</h3>
        <p className="mt-1 text-xs leading-relaxed text-foreground/85 sm:text-sm md:text-base">
          {study.brief || study.context}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.24, ease: EASE }}
        className="mt-3 max-w-4xl border-l-2 border-primary bg-card/70 py-2.5 pl-3.5 pr-3.5 shadow-[0_0_50px_-25px_var(--gold)] sm:mt-4 sm:border-l-4 sm:py-3.5 sm:pl-5 sm:pr-5 rounded-r"
      >
        <h3 className="display text-xs tracking-[0.35em] text-primary sm:text-sm">
          Problem Statement
        </h3>
        <p className="mt-1 text-sm font-medium leading-relaxed text-foreground sm:text-base md:text-lg">
          {study.problem}
        </p>
      </motion.div>

      {study.keyFeatures && study.keyFeatures.length > 0 && (
        <div className="mt-3 sm:mt-4">
          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35, delay: 0.26 }}
            className="display text-xs tracking-[0.35em] text-primary sm:text-sm"
          >
            Key Features
          </motion.h3>
          <div className="mt-1.5 flex flex-wrap gap-1.5 sm:gap-2">
            {study.keyFeatures.map((kf, i) => (
              <motion.span
                key={kf}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.28 + i * 0.02, ease: EASE }}
                className="rounded border border-primary/40 bg-primary/10 px-2 py-0.5 text-xs text-foreground/90 shadow-[0_0_10px_-4px_var(--gold)]"
              >
                {kf}
              </motion.span>
            ))}
          </div>
        </div>
      )}

      <div className="mt-3 sm:mt-4">
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35, delay: 0.3 }}
          className="display text-xs tracking-[0.35em] text-primary sm:text-sm"
        >
          Constraints
        </motion.h3>
        <ul className="mt-1.5 grid gap-2 grid-cols-1 md:grid-cols-2">
          {(study.constraints || study.requirements).map((item, i) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, delay: 0.32 + i * 0.03, ease: EASE }}
              className="flex gap-2 text-xs leading-relaxed text-foreground/85 sm:text-sm"
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span>{item}</span>
            </motion.li>
          ))}
        </ul>
      </div>

      <div className="mt-3 sm:mt-4 mb-2">
        <div className="grid gap-3 grid-cols-1 md:grid-cols-2">
          {[
            ["Outcome", study.outcome || study.impact],
            ["Tools & Technologies", study.tools || study.technical],
          ].map(([title, points], i) => (
            <motion.div
              key={title as string}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.38 + i * 0.05, ease: EASE }}
              className="rounded-md border border-accent/40 bg-card/60 p-3 shadow-[0_0_50px_-25px_var(--neon)] sm:p-4"
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
