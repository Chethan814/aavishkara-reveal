import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ChevronDown, Lock } from "lucide-react";

import { SmoothScroll } from "@/components/reveal/SmoothScroll";
import { Ambience } from "@/components/reveal/Ambience";
import { ScrollProgress } from "@/components/reveal/ScrollProgress";
import { Typewriter } from "@/components/reveal/Typewriter";
import { CaseStudySection, SectionDivider } from "@/components/reveal/CaseStudySection";
import { DeckProgress } from "@/components/reveal/DeckProgress";
import { caseStudies } from "@/data/caseStudies";
import akMark from "@/assets/aavishkara-ak-mark.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aavishkara '26 — Case Study Reveal" },
      {
        name: "description",
        content:
          "The official case study reveal for Aavishkara '26, a national-level hackathon by Soundarya Institute of Management and Science, presented by IBM.",
      },
      { property: "og:title", content: "Aavishkara '26 — Case Study Reveal" },
      {
        property: "og:description",
        content:
          "Ideate. Innovate. Impact. The national-level hackathon case study, presented by IBM.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Reveal,
});

const EASE = [0.22, 1, 0.36, 1] as const;

function Section({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`relative z-10 flex min-h-screen w-full flex-col items-center justify-center px-6 py-24 text-center ${className}`}
    >
      {children}
    </section>
  );
}

function IBMWordmark() {
  return (
    <div className="flex flex-col items-center gap-[3px]" aria-label="IBM">
      {[0, 1, 2, 3, 4, 5, 6].map((row) => (
        <div key={row} className="flex gap-[6px]">
          {[0, 1, 2].map((col) => (
            <span
              key={col}
              className="block h-[5px] bg-foreground/90"
              style={{
                width: col === 0 ? 34 : col === 1 ? 62 : 68,
                opacity: row % 2 === 0 ? 1 : 0.86,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function Reveal() {
  return (
    <main className="relative w-full overflow-x-hidden bg-background text-foreground">
      <SmoothScroll />
      <Ambience />
      <ScrollProgress />
      <DeckProgress total={caseStudies.length} />

      {/* 1 — OPENING */}
      <Section>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1.4, ease: EASE }}
          className="display mb-8 text-[0.65rem] tracking-[0.55em] text-muted-foreground sm:text-xs"
        >
          Soundarya Institute of Management and Science
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, filter: "blur(18px)", scale: 0.96 }}
          animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
          transition={{ delay: 0.9, duration: 2.2, ease: EASE }}
          className="display text-glow-gold text-5xl leading-[0.92] text-primary sm:text-7xl md:text-8xl lg:text-9xl"
        >
          Aavishkara <span className="text-gold-soft">&rsquo;26</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 2.2, duration: 1.2, ease: EASE }}
          className="mt-8 h-px w-52 bg-gradient-to-r from-transparent via-accent to-transparent shadow-[var(--glow-neon)] sm:w-72"
        />

        <div className="display mt-8 min-h-[1.6em] text-sm tracking-[0.4em] text-foreground/80 sm:text-lg">
          <Typewriter text="Ideate. Innovate. Impact." delay={2600} speed={65} />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 5, duration: 1.4 }}
          className="absolute bottom-10 flex flex-col items-center gap-3"
        >
          <span className="display text-[0.6rem] tracking-[0.35em] text-muted-foreground sm:text-xs">
            Scroll to reveal the case study
          </span>
          <motion.div
            animate={{ y: [0, 9, 0] }}
            transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="h-5 w-5 text-primary" />
          </motion.div>
        </motion.div>
      </Section>

      {/* 2 — SPONSOR CREDIT */}
      <Section>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.6, ease: EASE }}
          className="flex flex-col items-center"
        >
          <IBMWordmark />
          <div className="mt-10 h-px w-24 bg-border" />
          <p className="display mt-8 text-[0.65rem] tracking-[0.45em] text-muted-foreground sm:text-sm">
            Case Study Presented By
          </p>
        </motion.div>
      </Section>

      {/* 3 — BUILD-UP */}
      <Section>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.4, ease: EASE }}
          className="relative flex h-44 w-44 items-center justify-center"
        >
          <span
            className="absolute inset-0 rounded-full border border-accent/50"
            style={{ animation: "pulse-ring 3s ease-out infinite" }}
          />
          <span
            className="absolute inset-0 rounded-full border border-primary/40"
            style={{ animation: "pulse-ring 3s ease-out 1.5s infinite" }}
          />
          <motion.div
            animate={{
              boxShadow: [
                "0 0 30px oklch(0.65 0.21 295 / 25%)",
                "0 0 80px oklch(0.82 0.16 85 / 45%)",
                "0 0 30px oklch(0.65 0.21 295 / 25%)",
              ],
            }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            className="flex h-24 w-24 items-center justify-center rounded-full border border-primary/50 bg-card"
          >
            <Lock className="h-9 w-9 text-primary" />
          </motion.div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.4, delay: 0.3, ease: EASE }}
          className="display mt-14 text-3xl text-foreground sm:text-5xl"
        >
          The Challenge Awaits
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.6, delay: 0.8 }}
          className="mt-5 max-w-md text-sm text-muted-foreground sm:text-base"
        >
          Sealed until this moment. Keep scrolling.
        </motion.p>
      </Section>

      {/* 4 — THE REVEAL */}
      <Section className="overflow-hidden">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1, ease: EASE }}
          className="display mb-10 text-[0.6rem] tracking-[0.5em] text-accent sm:text-xs"
        >
          The Case Studies
        </motion.p>

        <div className="relative w-full max-w-5xl">
          {/* gold light sweep */}
          <motion.div
            aria-hidden
            initial={{ x: "-60%", opacity: 0 }}
            whileInView={{ x: "120%", opacity: [0, 1, 1, 0] }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1.7, delay: 0.25, ease: EASE }}
            className="absolute inset-y-0 left-0 z-20 w-40 bg-gradient-to-r from-transparent via-primary to-transparent blur-md"
          />

          <motion.h2
            initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0.2 }}
            whileInView={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1.6, delay: 0.35, ease: EASE }}
            className="display text-glow-gold text-4xl leading-[0.95] text-primary sm:text-6xl md:text-7xl"
          >
            Twelve Problems.
          </motion.h2>

          <motion.h3
            initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
            whileInView={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1.5, delay: 0.9, ease: EASE }}
            className="display mt-6 text-xl leading-tight text-foreground/85 sm:text-3xl"
          >
            One Weekend to Answer Them.
          </motion.h3>


          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1.4, delay: 1.3, ease: EASE }}
            className="mx-auto mt-10 h-px w-full max-w-xl bg-gradient-to-r from-transparent via-accent to-transparent shadow-[var(--glow-neon)]"
          />
        </div>
      </Section>

      {/* 5 — THE 12 CASE STUDIES */}
      {caseStudies.map((study, i) => (
        <div key={study.title}>
          <CaseStudySection study={study} index={i} />
          <SectionDivider />
        </div>
      ))}


      {/* 6 — CLOSING */}
      <Section>
        <motion.h2
          initial={{ opacity: 0, filter: "blur(14px)" }}
          whileInView={{ opacity: 1, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.8, ease: EASE }}
          className="display text-glow-gold text-4xl text-primary sm:text-6xl md:text-7xl"
        >
          Now Build the Future.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.6, delay: 0.7 }}
          className="mt-16 flex flex-col items-center gap-8"
        >
          <div className="h-px w-40 bg-gradient-to-r from-transparent via-accent to-transparent" />
          <p className="display text-[0.6rem] tracking-[0.45em] text-muted-foreground sm:text-xs">
            Aavishkara &rsquo;26 &nbsp;&middot;&nbsp; Soundarya Institute of Management and
            Science
          </p>
          <div className="flex items-center gap-8 opacity-70">
            <div className="scale-[0.45] origin-center">
              <IBMWordmark />
            </div>
            <span className="h-8 w-px bg-border" />
            <span className="display text-sm tracking-[0.3em] text-foreground/80">
              HackCulture
            </span>
          </div>
        </motion.div>
      </Section>
    </main>
  );
}
