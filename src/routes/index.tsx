import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import { ChevronDown, Lock } from "lucide-react";

import { SmoothScroll } from "@/components/reveal/SmoothScroll";
import { Ambience } from "@/components/reveal/Ambience";
import { SparkBurst } from "@/components/reveal/SparkBurst";
import { ScrollProgress } from "@/components/reveal/ScrollProgress";
import { Typewriter } from "@/components/reveal/Typewriter";
import { CaseStudyDeck } from "@/components/reveal/CaseStudyDeck";
import { Sponsors } from "@/components/reveal/Sponsors";
import { CustomCursor } from "@/components/reveal/CustomCursor";
import { SoundToggle } from "@/components/reveal/SoundToggle";
import { MagneticButton } from "@/components/reveal/MagneticButton";
import { caseStudies } from "@/data/caseStudies";
import { EASE, HERO_LOGO_DELAY } from "@/lib/motion";
import titleCard from "@/assets/aavishkara-title-card.png.asset.json";
import akMark from "@/assets/aavishkara-ak-mark.png.asset.json";
import trustLogo from "@/assets/soundarya-trust.png.asset.json";
import iicLogo from "@/assets/iic-logo.png.asset.json";
import doorway from "@/assets/doorway.jpg";
import { BootSequence } from "@/components/reveal/BootSequence";
import { registerBootPreload } from "@/lib/boot-preload";

/* warm every downstream image while the boot sequence plays */
registerBootPreload([titleCard.url, akMark.url, trustLogo.url, iicLogo.url, doorway]);


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
  const [booting, setBooting] = useState(true);

  const beginStudies = () => {
    const deck = document.getElementById("case-deck");
    if (!deck) return;
    const lenis = (window as unknown as { __lenis?: { scrollTo: (target: Element, options?: object) => void } }).__lenis;
    if (lenis) lenis.scrollTo(deck, { duration: 1.1 });
    else deck.scrollIntoView({ behavior: "smooth" });
  };

  if (booting) return <BootSequence onDone={() => setBooting(false)} />;

  return (
    <main className="relative w-full overflow-x-hidden bg-background text-foreground">
      <SmoothScroll />
      <Ambience />
      <SparkBurst />
      <ScrollProgress />
      <CustomCursor />
      <SoundToggle />

      {/* 1 — OPENING */}
      <Section>
        {/* corner institution logos */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: HERO_LOGO_DELAY, duration: 1.1, ease: EASE }}
          className="absolute left-5 top-5 sm:left-10 sm:top-10"
        >
          <img
            src={trustLogo.url}
            alt="Soundarya Educational Trust"
            className="hero-logo h-14 w-auto sm:h-20 lg:h-24"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: HERO_LOGO_DELAY + 0.15, duration: 1.1, ease: EASE }}
          className="absolute right-5 top-5 sm:right-10 sm:top-10"
        >
          <img
            src={iicLogo.url}
            alt="Institution's Innovation Council"
            className="hero-logo h-10 w-auto mix-blend-screen sm:h-14 lg:h-16"
          />
        </motion.div>


        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1.4, ease: EASE }}
          className="display mb-8 text-[0.65rem] tracking-[0.55em] text-muted-foreground sm:text-xs"
        >
          Soundarya Institute of Management and Science
        </motion.p>

        <motion.div
          initial={{ opacity: 0, filter: "blur(18px)", scale: 0.96 }}
          animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
          transition={{ delay: 0.9, duration: 2.2, ease: EASE }}
          className="mouse-depth"
        >
          <h1 className="sr-only">Aavishkara &rsquo;26</h1>
          <img
            src={titleCard.url}
            alt="Aavishkara '26"
            className="w-[min(90vw,40rem)] sm:w-[min(85vw,52rem)] lg:w-[min(78vw,62rem)]"
            style={{ filter: "drop-shadow(0 0 40px rgba(245,184,0,0.22))" }}
          />
        </motion.div>


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
          initial={{ opacity: 0, y: 24, filter: "blur(14px)", scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.6, ease: EASE }}
          className="flex flex-col items-center"
        >
          <img
            src={akMark.url}
            alt="Aavishkara AK monogram"
            className="w-28 sm:w-36 lg:w-44"
            style={{ filter: "drop-shadow(0 0 40px rgba(245,184,0,0.35))" }}
          />
        </motion.div>

        <Sponsors />
      </Section>

      {/* 3 — BUILD-UP */}
      <Section className="overflow-hidden">
        <motion.img
          src={doorway}
          alt=""
          aria-hidden
          loading="lazy"
          width={1536}
          height={1024}
          initial={{ opacity: 0, scale: 1.08 }}
          whileInView={{ opacity: 0.16, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 2, ease: EASE }}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_72%)]"
        />
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

        <div className="mouse-depth relative w-full max-w-5xl">
          <div aria-hidden className="title-grid-scan absolute -inset-32" />
          {/* gold light sweep */}
          <motion.div
            aria-hidden
            initial={{ x: "-60%", opacity: 0 }}
            whileInView={{ x: "120%", opacity: [0, 1, 1, 0] }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1.7, delay: 0.25, ease: EASE }}
            className="absolute inset-y-0 left-0 z-20 w-40 bg-gradient-to-r from-transparent via-primary to-transparent blur-md"
          />

          <h2 className="display text-glow-gold text-4xl leading-[0.95] text-primary sm:text-6xl md:text-7xl" aria-label="Twelve Problems">
            {"Twelve Problems.".split("").map((letter, index) => (
              <motion.span
                key={`${letter}-${index}`}
                initial={{ opacity: 0, filter: "brightness(3) blur(8px)" }}
                whileInView={{ opacity: [0, 1, 0.45, 1], filter: "brightness(1) blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.25 + index * 0.045, ease: EASE }}
              >
                {letter === " " ? "\u00a0" : letter}
              </motion.span>
            ))}
          </h2>

          <motion.h3
            initial={{ opacity: 0, y: 14, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.2, delay: 0.9, ease: EASE }}
            className="display mt-6 text-xl leading-tight text-foreground/85 sm:text-3xl"
          >
            One Weekend to Answer Them.
          </motion.h3>



          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1.4, delay: 1.3, ease: EASE }}
            className="title-divider mx-auto mt-10 h-px w-full max-w-xl bg-gradient-to-r from-transparent via-primary to-transparent shadow-[var(--glow-gold)]"
          />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, delay: 1.55, ease: EASE }}
            className="mt-9 flex flex-col items-center gap-6"
          >
            <div className="flex items-center gap-3" aria-label="12 challenges ahead">
              {Array.from({ length: 12 }, (_, index) => (
                <motion.span
                  key={index}
                  initial={{ scaleY: 0, opacity: 0 }}
                  whileInView={{ scaleY: 1, opacity: index % 3 === 0 ? 1 : 0.45 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 1.6 + index * 0.045, ease: EASE }}
                  className="h-5 w-px origin-bottom bg-primary"
                />
              ))}
              <span className="display ml-3 text-xs tracking-[0.38em] text-foreground/70 sm:text-sm">12 Challenges Ahead</span>
            </div>
            <MagneticButton onClick={beginStudies} ariaLabel="Begin the case studies">
              Begin
              <ChevronDown className="h-5 w-5" />
            </MagneticButton>
          </motion.div>
        </div>
      </Section>

      {/* 5 — THE 12 CASE STUDIES (button-controlled) */}
      <CaseStudyDeck studies={caseStudies} />

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
