import { useRef, useState } from "react";
import { motion } from "motion/react";

export function MagneticButton({
  children,
  onClick,
  disabled,
  variant = "primary",
  className = "",
  ariaLabel,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  variant?: "primary" | "ghost";
  className?: string;
  ariaLabel?: string;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setOffset({
      x: (e.clientX - (r.left + r.width / 2)) * 0.25,
      y: (e.clientY - (r.top + r.height / 2)) * 0.35,
    });
  };

  const base =
    variant === "primary"
      ? "display border border-primary/70 bg-primary/10 px-8 py-4 text-base tracking-[0.35em] text-primary sm:px-12 sm:py-5 sm:text-lg"
      : "display border border-border bg-transparent px-5 py-3 text-xs tracking-[0.3em] text-muted-foreground hover:text-foreground sm:text-sm";

  return (
    <motion.button
      ref={ref}
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      disabled={disabled}
      onMouseMove={handleMove}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
      className={`portal-button relative inline-flex items-center gap-3 overflow-hidden rounded-full uppercase transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${base} ${className}`}
      style={{
        animation: variant === "primary" ? "btn-pulse 2.6s ease-in-out infinite" : "none",
      }}
    >
      <span aria-hidden className="button-light-sweep" />
      <span className="relative z-10 inline-flex items-center gap-3">{children}</span>
    </motion.button>
  );
}
