"use client";

import { Children, useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
  type Variants,
} from "motion/react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/cn";

const EASE = [0.22, 1, 0.36, 1] as const;
/** Kept clear under a pinned rail for the phone action bar */
const BAR_ALLOWANCE = 72;
/** A card photograph never shrinks below this, however short the screen */
const MIN_IMG_H = 130;
const pad = (n: number) => String(n).padStart(2, "0");

/* Desktop entrance: the same clip-wipe stagger as the services grid */
const list: Variants = { show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } } };
const reveal: Variants = {
  hidden: { clipPath: "inset(22% 0% 0% 0% round 18px)", y: 28, opacity: 0.001 },
  show: {
    clipPath: "inset(0% 0% 0% 0% round 18px)",
    y: 0,
    opacity: 1,
    transition: { duration: 1.15, ease: EASE },
  },
};

type Geometry = { overflow: number; top: number };

/**
 * ≥768px: every item in one grid, all visible together.
 * Phones: one item per screen. While the frame is pinned, native vertical scroll
 * moves the row sideways — the offers-track model (scroll progress → x through the
 * same light spring). No swipe, no wheel handlers, no horizontally scrollable box.
 * Reduced motion: a plain vertical stack.
 */
export function ScrollRail({
  children,
  label,
  gridClassName,
  tone = "light",
}: {
  /** One child per item */
  children: React.ReactNode;
  /** Accessible name of the list */
  label: string;
  /** Grid columns/gaps from 768px up */
  gridClassName: string;
  /** Counter colours for rails on a night ground */
  tone?: "light" | "dark";
}) {
  const items = Children.toArray(children);
  const n = items.length;
  const reduce = useMediaQuery("(prefers-reduced-motion: reduce)");
  const phone = useMediaQuery("(max-width: 767px)");
  /* Phone layout is CSS (max-md:), so it paints correctly before hydration */
  const rail = !reduce;
  const pinned = phone && rail;

  const zoneRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const geom = useRef<Geometry>({ overflow: 0, top: 0 });
  const imgH = useRef(0);
  const [layout, setLayout] = useState<{ zoneH: number; top: number; offsets: number[] } | null>(null);
  const [active, setActive] = useState(0);
  const progress = useMotionValue(0);
  const overflowMV = useMotionValue(0);
  const viewportW = useMotionValue(1);
  const { scrollY } = useScroll();

  /* 0 when the frame pins, 1 when it releases */
  const sync = useCallback(() => {
    const zone = zoneRef.current;
    const { overflow, top } = geom.current;
    if (!zone || overflow <= 0) return progress.set(0);
    const p = (top - zone.getBoundingClientRect().top) / overflow;
    progress.set(Math.min(1, Math.max(0, p)));
  }, [progress]);

  useEffect(() => {
    const frame = frameRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!pinned || !frame || !viewport || !track) {
      geom.current = { overflow: 0, top: 0 };
      overflowMV.set(0);
      progress.set(0);
      setLayout(null);
      return;
    }

    const measure = () => {
      const vw = viewport.clientWidth;
      const overflow = Math.max(0, track.offsetWidth - vw);
      const navH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--nav-h")) || 72;
      const room = window.innerHeight - navH - BAR_ALLOWANCE;

      /* Cards that size their photograph from `--offer2-img-max` (the offer card)
         give it up first, so a whole card — buttons included — fits one screen.
         Cards that ignore the variable are unaffected. */
      const cardW = (track.children[0] as HTMLElement | undefined)?.offsetWidth ?? vw;
      const current = imgH.current || cardW * 0.75;
      const next = Math.round(Math.min(cardW * 0.75, Math.max(MIN_IMG_H, current + room - frame.offsetHeight)));
      if (Math.abs(next - imgH.current) > 1) {
        imgH.current = next;
        frame.style.setProperty("--offer2-img-max", `${next}px`);
      }

      const frameH = frame.offsetHeight;
      const top = Math.round(navH + Math.max(12, (room - frameH) / 2));
      const offsets = (Array.from(track.children) as HTMLElement[]).map((el) => el.offsetLeft);
      geom.current = { overflow, top };
      overflowMV.set(overflow);
      viewportW.set(vw);
      setLayout((prev) =>
        prev && prev.zoneH === frameH + overflow && prev.top === top && prev.offsets.join() === offsets.join()
          ? prev
          : { zoneH: frameH + overflow, top, offsets },
      );
      sync();
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(frame);
    ro.observe(viewport);
    ro.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [pinned, overflowMV, viewportW, progress, sync]);

  useMotionValueEvent(scrollY, "change", sync);
  useMotionValueEvent(progress, "change", (v) => {
    setActive(Math.min(n - 1, Math.max(0, Math.round(v * (n - 1)))));
  });

  const rawX = useTransform(() => -progress.get() * overflowMV.get());
  const x = useSpring(rawX, { stiffness: 180, damping: 34, mass: 0.5, restDelta: 0.5 });

  /* Keyboard users: scroll the page so the focused item is the one on screen */
  const ensureVisible = (i: number) => {
    const zone = zoneRef.current;
    const { overflow, top } = geom.current;
    if (!pinned || !zone || overflow <= 0 || n < 2) return;
    const zoneTop = zone.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: zoneTop - top + (i / (n - 1)) * overflow, behavior: "auto" });
  };

  return (
    <div ref={zoneRef} className="relative" style={pinned && layout ? { height: layout.zoneH } : undefined}>
      <div ref={frameRef} className={cn(pinned && "sticky")} style={pinned && layout ? { top: layout.top } : undefined}>
        <div ref={viewportRef} className={cn(rail && "max-md:-mx-[var(--gutter)] max-md:overflow-hidden")}>
          <motion.ul
            ref={trackRef}
            aria-label={label}
            style={{ x: pinned ? x : 0 }}
            initial={reduce ? false : "hidden"}
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={list}
            className={cn(
              "grid gap-4",
              gridClassName,
              rail && "max-md:flex max-md:w-max max-md:px-[var(--gutter)]",
            )}
          >
            {items.map((child, i) => (
              <RailItem
                key={i}
                index={i}
                left={layout?.offsets[i] ?? 0}
                x={x}
                viewportW={viewportW}
                pinned={pinned}
                onFocus={ensureVisible}
                className={cn(rail && "max-md:w-[calc(100vw_-_2*var(--gutter))] max-md:shrink-0")}
              >
                {child}
              </RailItem>
            ))}
          </motion.ul>
        </div>
        {rail && n > 1 && <Counter active={active} n={n} progress={progress} tone={tone} />}
      </div>
    </div>
  );
}

function RailItem({
  children,
  index,
  left,
  x,
  viewportW,
  pinned,
  onFocus,
  className,
}: {
  children: React.ReactNode;
  index: number;
  /** Item's measured offsetLeft inside the rail viewport */
  left: number;
  x: MotionValue<number>;
  viewportW: MotionValue<number>;
  pinned: boolean;
  onFocus: (i: number) => void;
  className?: string;
}) {
  /* ~0 = the item on screen, ±1 = one screen away */
  const pos = useTransform(() => (left + x.get()) / Math.max(1, viewportW.get()));
  const scale = useTransform(pos, [-1, 0.05, 1.05], [0.94, 1, 0.94]);
  const opacity = useTransform(pos, [-0.9, 0.05, 1.1], [0.4, 1, 0.4]);

  return (
    <motion.li
      style={{ scale: pinned ? scale : 1, opacity: pinned ? opacity : 1 }}
      className={className}
      onFocusCapture={() => onFocus(index)}
    >
      <motion.div variants={reveal} className="h-full">
        {children}
      </motion.div>
    </motion.li>
  );
}

function Counter({ active, n, progress, tone }: { active: number; n: number; progress: MotionValue<number>; tone: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <div aria-hidden className="mt-5 flex items-center justify-center gap-4 md:hidden">
      <p className={cn("tabular text-[13.5px]", dark ? "text-ivory-muted" : "text-ink-muted")}>
        <span className={cn("font-semibold", dark ? "text-ivory" : "text-ink")}>{pad(active + 1)}</span> / {pad(n)}
      </p>
      <div className={cn("relative h-px w-24", dark ? "bg-ivory/20" : "bg-ink/15")}>
        <motion.span className={cn("absolute inset-0 origin-left", dark ? "bg-ivory" : "bg-ink")} style={{ scaleX: progress }} />
      </div>
    </div>
  );
}
