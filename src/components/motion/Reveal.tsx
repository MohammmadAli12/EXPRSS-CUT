"use client";

import { motion, type Variants } from "motion/react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const EASE = [0.22, 1, 0.36, 1] as const;

const VARIANTS: Record<"clip" | "rise", Variants> = {
  clip: {
    /* Never fully clipped: a zero-area clip hides the element from IntersectionObserver */
    hidden: { clipPath: "inset(14% 10% 14% 10% round 18px)" },
    show: { clipPath: "inset(0% 0% 0% 0% round 18px)", transition: { duration: 1.3, ease: EASE } },
  },
  rise: {
    hidden: { opacity: 0.001, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 1.1, ease: EASE } },
  },
};

export function Reveal({
  children,
  variant = "rise",
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  variant?: "clip" | "rise";
  className?: string;
  delay?: number;
}) {
  const reduce = useMediaQuery("(prefers-reduced-motion: reduce)");
  return (
    <motion.div
      className={className}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      variants={VARIANTS[variant]}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
