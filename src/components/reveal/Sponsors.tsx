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
    <div className="mt-20 flex w-full max-w-6xl flex-col items-center">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="display text-[0.7rem] tracking-[0.55em] text-primary sm:text-sm"
      >
        Co-Sponsored By
      </motion.p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 sm:gap-x-14">
        {partners.map((name, i) => (
          <motion.div
            key={name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.12 + i * 0.09, ease: EASE }}
            className="display flex h-14 items-center rounded-md border border-border/70 px-6 text-base tracking-[0.25em] text-foreground/70 brightness-90 transition duration-300 hover:border-primary/50 hover:text-foreground hover:brightness-125 sm:text-lg"
          >
            {name}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
