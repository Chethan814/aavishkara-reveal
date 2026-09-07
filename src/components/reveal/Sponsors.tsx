import { motion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

const partners = [
  "HackCulture",
  "Instacks",
  "NICT Computer Education",
  "BeyondEducations",
  "Sri Tulasi Edtech",
];

export function Sponsors() {
  return (
    <div className="relative mt-20 flex w-full max-w-[1500px] flex-col items-center">
      <div aria-hidden className="sponsor-aurora absolute -top-32 left-1/2 h-72 w-[42rem] max-w-[90vw] -translate-x-1/2 rounded-full bg-primary/8 blur-[100px]" />
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="display text-[0.7rem] tracking-[0.55em] text-primary sm:text-sm"
      >
        Co-Sponsored By
      </motion.p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-5 lg:flex-nowrap lg:gap-x-8">
        {partners.map((name, i) => (
          <motion.div
            key={name}
            initial={{ opacity: 0, y: 18, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.12 + i * 0.09, ease: EASE }}
            className="sponsor-card display flex h-14 shrink-0 items-center whitespace-nowrap rounded-md border border-border/70 px-5 text-sm tracking-[0.22em] text-foreground/70 brightness-90 transition duration-300 hover:border-primary/50 hover:text-foreground hover:brightness-125 sm:text-base"
            style={{ animationDelay: `${i * -1.2}s` }}
          >
            {name}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
