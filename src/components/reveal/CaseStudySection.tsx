import { useState } from "react";
import { motion } from "motion/react";
import { Check, Copy, Sparkles, Terminal, Wrench, ShieldAlert } from "lucide-react";
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

/** Single case study detail panel (used in Deck View) */
export function CaseStudyPanel({
  study,
  index,
  total,
}: {
  study: CaseStudy;
  index: number;
  total?: number;
}) {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    if (!study.code) return;
    navigator.clipboard.writeText(study.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mx-auto w-full max-w-5xl rounded-2xl border border-primary/25 bg-card/85 p-4 sm:p-7 md:p-9 shadow-[0_0_60px_-25px_var(--gold)] backdrop-blur-md">
      {/* Top Header Row: Badges & Copy button */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 pb-4 border-b border-border/50">
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
          {study.code && (
            <button
              type="button"
              onClick={copyCode}
              title="Click to copy problem code"
              className="group flex items-center gap-1.5 rounded-md border border-primary/60 bg-primary/20 px-2.5 py-1 font-mono text-xs font-bold tracking-widest text-primary shadow-[0_0_15px_-4px_var(--gold)] transition-all hover:bg-primary hover:text-primary-foreground cursor-pointer"
            >
              <span>{study.code}</span>
              {copied ? (
                <Check className="h-3.5 w-3.5 text-green-400" />
              ) : (
                <Copy className="h-3 w-3 opacity-60 group-hover:opacity-100" />
              )}
            </button>
          )}

          {study.language && (
            <span className="rounded-md border border-accent/40 bg-accent/15 px-2.5 py-1 font-mono text-xs tracking-wider text-accent">
              {study.language}
            </span>
          )}

          <span className="display text-xs tracking-[0.25em] text-muted-foreground">
            {study.category}
          </span>
        </div>

        {total && (
          <div className="display text-xs tracking-[0.3em] text-primary/80 font-mono">
            {pad(index + 1)} / {pad(total)}
          </div>
        )}
      </div>

      {/* Main Title */}
      <motion.h2
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.05, ease: EASE }}
        className="display text-glow-gold mt-4 text-2xl font-bold leading-snug text-primary sm:text-3xl md:text-4xl"
      >
        <span className="text-gold-soft/60 mr-2 sm:mr-3">{pad(index + 1)}.</span>
        <span>{study.title}</span>
      </motion.h2>

      {/* Problem Statement Highlight Box */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.12, ease: EASE }}
        className="mt-5 rounded-xl border-l-4 border-primary bg-gradient-to-r from-primary/15 via-primary/5 to-transparent p-4 sm:p-5 shadow-[0_0_35px_-20px_var(--gold)]"
      >
        <div className="flex items-center gap-2 text-primary">
          <ShieldAlert className="h-4 w-4 shrink-0" />
          <h3 className="display text-xs tracking-[0.3em] font-semibold text-primary uppercase">
            Problem Statement
          </h3>
        </div>
        <p className="mt-2 text-sm sm:text-base md:text-lg font-medium leading-relaxed text-foreground">
          {study.problem}
        </p>
      </motion.div>

      {/* Brief */}
      {(study.brief || study.context) && (
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.18, ease: EASE }}
          className="mt-5"
        >
          <h3 className="display text-xs tracking-[0.3em] text-primary uppercase">Brief</h3>
          <p className="mt-1.5 text-xs sm:text-sm md:text-base leading-relaxed text-foreground/85">
            {study.brief || study.context}
          </p>
        </motion.div>
      )}

      {/* Key Features Chips */}
      {study.keyFeatures && study.keyFeatures.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.22, ease: EASE }}
          className="mt-5"
        >
          <div className="flex items-center gap-1.5 text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            <h3 className="display text-xs tracking-[0.3em] text-primary uppercase">Key Features</h3>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {study.keyFeatures.map((kf) => (
              <span
                key={kf}
                className="rounded-full border border-primary/35 bg-primary/10 px-3 py-1 text-xs text-foreground/90 shadow-[0_0_10px_-4px_var(--gold)]"
              >
                {kf}
              </span>
            ))}
          </div>
        </motion.div>
      )}

      {/* Constraints Grid */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.26, ease: EASE }}
        className="mt-6"
      >
        <h3 className="display text-xs tracking-[0.3em] text-primary uppercase">Constraints</h3>
        <ul className="mt-2.5 grid grid-cols-1 gap-2.5 md:grid-cols-2">
          {(study.constraints || study.requirements).map((item) => (
            <li
              key={item}
              className="flex items-start gap-2.5 rounded-lg border border-border/40 bg-background/50 p-3 text-xs sm:text-sm leading-relaxed text-foreground/85"
            >
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary shadow-[0_0_8px_var(--gold)]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Expected Outcome & Tools Side-by-Side */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.32, ease: EASE }}
        className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2"
      >
        {/* Outcome */}
        <div className="rounded-xl border border-primary/40 bg-card/60 p-4 sm:p-5 shadow-[0_0_40px_-25px_var(--gold)]">
          <div className="flex items-center gap-2 text-primary">
            <Terminal className="h-4 w-4 shrink-0" />
            <h4 className="display text-xs tracking-[0.25em] font-semibold text-primary uppercase">
              Outcome
            </h4>
          </div>
          <ul className="mt-3 space-y-2">
            {(study.outcome || study.impact).map((p) => (
              <li
                key={p}
                className="flex items-start gap-2 text-xs sm:text-sm leading-relaxed text-foreground/85"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tools & Technologies */}
        <div className="rounded-xl border border-accent/40 bg-card/60 p-4 sm:p-5 shadow-[0_0_40px_-25px_var(--neon)]">
          <div className="flex items-center gap-2 text-accent">
            <Wrench className="h-4 w-4 shrink-0" />
            <h4 className="display text-xs tracking-[0.25em] font-semibold text-accent uppercase">
              Tools & Technologies
            </h4>
          </div>
          <ul className="mt-3 space-y-2">
            {(study.tools || study.technical).map((t) => (
              <li
                key={t}
                className="flex items-start gap-2 text-xs sm:text-sm leading-relaxed text-foreground/85"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
}

/** Compact card for Grid Catalog view */
export function CaseStudyGridCard({
  study,
  index,
  onSelect,
}: {
  study: CaseStudy;
  index: number;
  onSelect: () => void;
}) {
  return (
    <div
      onClick={onSelect}
      className="group relative flex flex-col justify-between rounded-xl border border-primary/25 bg-card/80 p-4 sm:p-5 shadow-[0_0_20px_-10px_var(--gold)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/70 hover:shadow-[0_0_35px_-10px_var(--gold)] cursor-pointer"
    >
      <div>
        {/* Badges */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="rounded border border-primary/60 bg-primary/20 px-2 py-0.5 font-mono text-[0.7rem] font-bold tracking-widest text-primary">
            {study.code}
          </span>
          <span className="rounded border border-accent/40 bg-accent/15 px-2 py-0.5 font-mono text-[0.68rem] tracking-wider text-accent">
            {study.language}
          </span>
        </div>

        {/* Category & Title */}
        <p className="mt-2 text-[0.68rem] font-mono tracking-widest text-muted-foreground uppercase">
          {study.category}
        </p>
        <h3 className="display mt-1 text-lg font-bold leading-snug text-foreground group-hover:text-primary transition-colors">
          <span className="text-gold-soft/60 mr-1.5">{pad(index + 1)}.</span>
          {study.title}
        </h3>

        {/* Problem Snippet */}
        <p className="mt-2.5 line-clamp-3 text-xs leading-relaxed text-foreground/75">
          {study.problem}
        </p>

        {/* Key Feature tags preview */}
        {study.keyFeatures && study.keyFeatures.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {study.keyFeatures.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded bg-primary/10 px-2 py-0.5 text-[0.65rem] text-primary/90"
              >
                {tag}
              </span>
            ))}
            {study.keyFeatures.length > 3 && (
              <span className="rounded bg-muted/40 px-1.5 py-0.5 text-[0.65rem] text-muted-foreground">
                +{study.keyFeatures.length - 3}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Footer CTA */}
      <div className="mt-4 flex items-center justify-between border-t border-border/40 pt-3">
        <span className="font-mono text-[0.7rem] text-muted-foreground">
          #{pad(index + 1)} of 20
        </span>
        <span className="text-xs font-semibold text-primary group-hover:translate-x-1 transition-transform flex items-center gap-1">
          Open Problem →
        </span>
      </div>
    </div>
  );
}
