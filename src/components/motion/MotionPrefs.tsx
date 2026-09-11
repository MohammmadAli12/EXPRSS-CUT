"use client";

import { MotionConfig } from "motion/react";

/**
 * Motion follows the OS reduced-motion setting (transform animations become
 * instant). Components read the preference through useMediaQuery, which is
 * hydration-safe, instead of useReducedMotion.
 */
export function MotionPrefs({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
