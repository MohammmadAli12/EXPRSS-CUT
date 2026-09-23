"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { cn } from "@/lib/cn";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const pad = (n: number) => String(n).padStart(2, "0");

export type GalleryItemRender = (args: {
  index: number;
  /** Sideways image drift for the card's photograph; undefined when static */
  imageX?: MotionValue<string>;
  /** First screenful: load eagerly so the pin never opens on blank frames */
  eager: boolean;
}) => React.ReactNode;

type Tone = "light" | "dark";

/**
 * Scroll-driven horizontal gallery — the same model as the approved Grooming
 * Packages and Hair "Cuts Made For You" tracks: a tall zone, a sticky frame, and
 * native vertical scroll mapped to sideways travel through a light spring.
 * No wheel handlers, no drag, no swipe and no horizontally scrollable box.
 *
 * Card width comes from `cardClassName` (CSS), so layout is correct before
 * hydration. `header` renders inside the pinned frame so the section title stays
 * on screen for the whole progression. Reduced motion → a static grid.
 */
export function PinnedGallery({
  count,
  renderItem,
  label,
  header,
  cardClassName,
  gridClassName,
  tone = "light",
  pace = 0.66,
  id,
  perView,
  itemNoun = "style",
  accent = false,
}: {
  count: number;
  renderItem: GalleryItemRender;
  /** Accessible name of the list */
  label: string;
  /** Champagne progress bar and "next" arrow, spaced "01 – 02" counter (light tone) */
  accent?: boolean;
  header?: React.ReactNode;
  /** Card width rules for the pinned track (per breakpoint) */
  cardClassName: string;
  /** Grid columns for the reduced-motion layout */
  gridClassName: string;
  tone?: Tone;
  /** Page scroll bought per pixel of sideways travel; alignment is unaffected */
  pace?: number;
  /** id for the track, used by the step buttons' aria-controls */
  id: string;
  /** Cards per screen (below / from 768px): the counter and step buttons move a screen at a time */
  perView?: { base: number; md: number };
  /** Singular noun for the step buttons' labels */
  itemNoun?: string;
}) {
  const reduce = useMediaQuery("(prefers-reduced-motion: reduce)");

  if (reduce) {
    return (
      <div className="pb-16 pt-16 lg:pb-20 lg:pt-20">
        {header && <div className="shell">{header}</div>}
        <ul aria-label={label} className={cn("shell mt-10 grid gap-4 md:gap-6", gridClassName)}>
          {Array.from({ length: count }, (_, i) => (
            <li key={i}>{renderItem({ index: i, eager: false })}</li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <Pinned
      count={count}
      renderItem={renderItem}
      label={label}
      header={header}
      cardClassName={cardClassName}
      tone={tone}
      pace={pace}
      id={id}
      perView={perView}
      itemNoun={itemNoun}
      accent={accent}
    />
  );
}

type Geometry = { overflow: number; offsets: number[]; cardW: number };

function Pinned({
  count: n,
  renderItem,
  label,
  header,
  cardClassName,
  tone,
  pace,
  id,
  perView,
  itemNoun,
  accent,
}: {
  count: number;
  renderItem: GalleryItemRender;
  label: string;
  header?: React.ReactNode;
  cardClassName: string;
  tone: Tone;
  pace: number;
  id: string;
  perView?: { base: number; md: number };
  itemNoun: string;
  accent: boolean;
}) {
  const isMd = useMediaQuery("(min-width: 768px)");
  const per = perView ? (isMd ? perView.md : perView.base) : 1;
  /* Screens of travel; with one card per screen this is simply the card count */
  const pages = Math.max(1, Math.ceil(n / per));
  const zoneRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const [geom, setGeom] = useState<Geometry>({ overflow: 0, offsets: [], cardW: 0 });
  const [active, setActive] = useState(0);
  const overflowMV = useMotionValue(0);
  const viewportW = useMotionValue(1);

  useEffect(() => {
    const frame = frameRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!frame || !viewport || !track) return;

    const measure = () => {
      const items = Array.from(track.children) as HTMLElement[];
      const cardW = items[0]?.offsetWidth ?? 0;
      const overflow = Math.max(0, track.offsetWidth - viewport.clientWidth);
      const offsets = items.map((el) => el.offsetLeft);
      overflowMV.set(overflow);
      viewportW.set(viewport.clientWidth);
      /* Never writes layout, and bails when nothing changed — no observer loop */
      setGeom((prev) =>
        prev.overflow === overflow && prev.cardW === cardW && prev.offsets.join() === offsets.join()
          ? prev
          : { overflow, offsets, cardW },
      );
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(frame);
    ro.observe(viewport);
    ro.observe(track);
    return () => ro.disconnect();
  }, [overflowMV, viewportW]);

  const { scrollYProgress } = useScroll({ target: zoneRef, offset: ["start start", "end end"] });
  const rawX = useTransform(() => -scrollYProgress.get() * overflowMV.get());
  const x = useSpring(rawX, { stiffness: 180, damping: 34, mass: 0.5, restDelta: 0.5 });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(pages - 1, Math.max(0, Math.round(v * (pages - 1)))));
  });

  const scrollToProgress = useCallback((p: number, smooth: boolean) => {
    const el = zoneRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const distance = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + Math.min(1, Math.max(0, p)) * distance, behavior: smooth ? "smooth" : "auto" });
  }, []);

  const step = (dir: -1 | 1) => scrollToProgress((active + dir) / Math.max(1, pages - 1), true);

  /* Keyboard users: bring a focused off-screen card into the track viewport */
  const ensureVisible = (index: number) => {
    const { overflow, offsets, cardW } = geom;
    if (overflow <= 0) return;
    const vw = viewportW.get();
    const offset = offsets[index] ?? 0;
    const left = offset + x.get();
    if (left >= 0 && left + cardW <= vw) return;
    scrollToProgress((offset - (vw - cardW) / 2) / overflow, false);
  };

  const dark = tone === "dark";
  const stepCls = cn(
    "grid place-items-center rounded-full border transition-colors duration-300 disabled:pointer-events-none disabled:opacity-35",
    accent ? "size-12" : "size-11",
    dark
      ? "border-ivory/30 text-ivory hover:border-ivory hover:bg-ivory hover:text-ink"
      : accent
        ? "border-champagne text-ink hover:bg-ink hover:border-ink hover:text-ivory disabled:border-ink/25"
        : "border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-ivory",
  );
  const range =
    per > 1
      ? `${pad(active * per + 1)}${accent ? " – " : "–"}${pad(Math.min(n, (active + 1) * per))}`
      : pad(active + 1);

  return (
    <div ref={zoneRef} className="relative" style={{ height: `calc(100svh + ${Math.round(geom.overflow * pace)}px)` }}>
      <div
        ref={frameRef}
        className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden pb-6 pt-[var(--nav-h)]"
      >
        {header && <div className="shell pb-6 lg:pb-8">{header}</div>}

        <div
          ref={viewportRef}
          /* Focusing a clipped card makes the browser set scrollLeft on this box,
             which would desync it from the transform. Snap it back. */
          onScroll={(e) => {
            e.currentTarget.scrollLeft = 0;
            e.currentTarget.scrollTop = 0;
          }}
          className="cuts-viewport relative min-w-0 overflow-hidden pb-6 pt-1"
        >
          <motion.ul ref={trackRef} id={id} aria-label={label} style={{ x }} className="px-shell flex w-max gap-4 md:gap-6">
            {Array.from({ length: n }, (_, i) => (
              <Card
                key={i}
                index={i}
                left={geom.offsets[i] ?? 0}
                x={x}
                viewportW={viewportW}
                onFocus={ensureVisible}
                className={cardClassName}
                renderItem={renderItem}
              />
            ))}
          </motion.ul>
        </div>

        <div className="shell flex items-center justify-between gap-6">
          <div className={cn("flex items-center", accent ? "gap-5 md:gap-7" : "gap-4")} aria-hidden>
            <p className={cn("tabular", accent ? "text-[15px]" : "text-[13.5px]", dark ? "text-ivory-muted" : "text-ink-muted")}>
              <span className={cn("font-semibold", dark ? "text-ivory" : "text-ink")}>{range}</span> / {pad(n)}
            </p>
            <div
              className={cn(
                "relative overflow-hidden rounded-full",
                accent ? "h-[3px] w-28 md:w-40" : "h-px w-24",
                dark ? "bg-ivory/20" : accent ? "bg-line" : "bg-ink/15",
              )}
            >
              <motion.span
                className={cn("absolute inset-0 origin-left", dark ? "bg-ivory" : accent ? "bg-champagne" : "bg-ink")}
                style={{ scaleX: scrollYProgress }}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              className={stepCls}
              onClick={() => step(-1)}
              disabled={active === 0}
              aria-controls={id}
              aria-label={`Previous ${itemNoun}`}
            >
              <ArrowLeft aria-hidden className="size-4" strokeWidth={1.6} />
            </button>
            <button
              type="button"
              className={stepCls}
              onClick={() => step(1)}
              disabled={active === pages - 1}
              aria-controls={id}
              aria-label={`Next ${itemNoun}`}
            >
              <ArrowRight aria-hidden className="size-4" strokeWidth={1.6} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Card({
  index,
  left,
  x,
  viewportW,
  onFocus,
  className,
  renderItem,
}: {
  index: number;
  /** Card's measured offsetLeft inside the track viewport */
  left: number;
  x: MotionValue<number>;
  viewportW: MotionValue<number>;
  onFocus: (i: number) => void;
  className: string;
  renderItem: GalleryItemRender;
}) {
  /* 0 = card at the viewport's left edge, 1 = at its right edge */
  const pos = useTransform(() => (left + x.get()) / Math.max(1, viewportW.get()));
  const scale = useTransform(pos, [-0.4, 0.04, 0.7, 1.05], [0.93, 1, 1, 0.95]);
  const opacity = useTransform(pos, [-0.3, 0.03, 0.82, 1.08], [0, 1, 1, 0.5]);
  const imageX = useTransform(pos, [-0.4, 1.1], ["-4%", "4%"]);

  return (
    <motion.li
      style={{ scale, opacity }}
      className={cn("shrink-0", className)}
      onFocusCapture={() => onFocus(index)}
    >
      {renderItem({ index, imageX, eager: index < 3 })}
    </motion.li>
  );
}
