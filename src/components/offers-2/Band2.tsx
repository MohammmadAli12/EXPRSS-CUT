"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import type { Section2 } from "@/data/offers-2";
import { cn } from "@/lib/cn";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Card2, KingsCard2 } from "./Card2";
import { MobileBand2 } from "./MobileBand2";
import { TAB_H } from "./TabBar2";

/* Empty parent variants: the card owns its animation, this only passes the state down */
const relay = { hidden: {}, show: {} };

/** Page scroll spent on one card of sideways travel */
const STEP_VH = 0.6;
/** The photograph never shrinks below this, however short the screen */
const MIN_IMG = 120;
/** Below the shared navigation and this page's tab bar */
const UNDER_CHROME = `calc(var(--nav-h) + ${TAB_H}px)`;

/** Every band fills the screen under the navigation and the tab bar */
const STAGE = `calc(100svh - var(--nav-h) - ${TAB_H}px)`;

/**
 * One offer band: a tall zone, a sticky frame, and native vertical scroll mapped
 * through a spring to sideways travel. Two cards fill the track from 1024px and
 * one below it, so a step advances exactly one card.
 *
 * The stage measures itself and caps the photograph (`--offer2-img-max`) so a
 * card — buttons included — always fits. Off-stage cards are fully hidden.
 *
 * Bands that fit (2 cards on desktop, King's Ritual) are not pinned; they still
 * fill the screen and animate in. Reduced motion → a plain grid.
 */
export function Band2({ section }: { section: Section2 }) {
  const reduce = useMediaQuery("(prefers-reduced-motion: reduce)");
  const wide = useMediaQuery("(min-width: 1024px)");
  const single = section.offers.length === 1;
  const perView = wide ? 2 : 1;

  /* Phones get their own band: the intro scrolls away, then one card at a time
     holds inside a pinned frame. Desktop keeps the two-up track below, untouched. */
  if (!wide && !single) return <MobileBand2 section={section} reduce={reduce} />;

  if (single || reduce || section.offers.length <= perView) {
    return (
      <Shell section={section}>
        {single ? (
          <motion.div
            initial={reduce ? false : "hidden"}
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={relay}
          >
            <KingsCard2 offer={section.offers[0]} />
          </motion.div>
        ) : (
          <ul aria-label={`${section.title} offers`} className="grid gap-5 sm:grid-cols-2">
            {section.offers.map((offer, i) => (
              <motion.li
                key={offer.id}
                initial={reduce ? false : "hidden"}
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                variants={relay}
                /* Card 1 lands first, then card 2 arrives beside it */
                transition={reduce ? undefined : { delayChildren: i * 0.28 }}
                className="min-w-0"
              >
                <Card2 offer={offer} />
              </motion.li>
            ))}
          </ul>
        )}
      </Shell>
    );
  }

  return <Pinned key={perView} section={section} perView={perView} />;
}

/* ───────────────────────── Shared pieces ───────────────────────── */

function Panel({ section, className }: { section: Section2; className?: string }) {
  const dark = section.tone === "dark";
  return (
    <div className={cn("flex flex-col", className)}>
      <span className="tabular grid size-10 place-items-center rounded-[8px] bg-[linear-gradient(180deg,#a57a4d,#7a5230)] text-[15px] font-bold text-white">
        {section.number}
      </span>
      <h2
        id={`${section.id}-title`}
        className={cn(
          "mt-4 font-[family-name:var(--font-o2-serif)] text-[clamp(26px,2.6vw,34px)] font-semibold uppercase leading-[1.1] tracking-[0.01em]",
          dark ? "text-[#f3ece1]" : "text-[#1a1612]",
        )}
      >
        {section.title}
      </h2>
      <p className={cn("mt-3 max-w-[30ch] text-[14.5px] leading-snug", dark ? "text-[#bfb4a5]" : "text-[#4a423b]")}>
        {section.description}
      </p>
      <span aria-hidden className="mt-6 block h-px w-12 bg-[#b0834f]" />
      <p
        aria-hidden
        className="mt-4 text-[11px] font-semibold uppercase leading-[1.9] tracking-[0.24em] text-[#b0834f]"
      >
        {section.accent[0]}
        <br />
        {section.accent[1]}
      </p>
    </div>
  );
}

function Script({ text, className }: { text: string; className?: string }) {
  return (
    <p
      aria-hidden
      className={cn(
        "shrink-0 font-[family-name:var(--font-o2-script)] text-[clamp(26px,2.4vw,34px)] leading-[1.25] text-[#7a6a58]",
        className,
      )}
    >
      {text.split(" ").map((word) => (
        <span key={word} className="block">
          {word}
        </span>
      ))}
    </p>
  );
}

/** Non-pinned band: still a full screen, content centred. */
function Shell({ section, children }: { section: Section2; children: React.ReactNode }) {
  const dark = section.tone === "dark";
  return (
    <section
      id={section.id}
      aria-labelledby={`${section.id}-title`}
      style={{ scrollMarginTop: UNDER_CHROME, ["--stage" as string]: STAGE }}
      className={cn(
        "flex items-center py-10 lg:min-h-[var(--stage)] lg:py-8",
        dark ? "bg-[#1a1612]" : "bg-[#f6f1e9]",
      )}
    >
      <div className="mx-auto flex w-full max-w-[1240px] flex-col gap-7 px-5 sm:px-6 lg:flex-row lg:items-center lg:gap-10">
        <Panel section={section} className="lg:w-[270px] lg:shrink-0" />
        <div className="min-w-0 flex-1">{children}</div>
        {section.script && <Script text={section.script} className="hidden text-right xl:block" />}
      </div>
    </section>
  );
}

/* ───────────────────────── Pinned track ───────────────────────── */

function Pinned({ section, perView }: { section: Section2; perView: number }) {
  const dark = section.tone === "dark";
  const n = section.offers.length;
  const zoneRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const imgH = useRef(0);
  const [overflow, setOverflow] = useState(0);
  const [offsets, setOffsets] = useState<number[]>([]);
  const overflowMV = useMotionValue(0);
  const viewportW = useMotionValue(1);

  useEffect(() => {
    const frame = frameRef.current;
    const content = contentRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!frame || !content || !viewport || !track) return;

    const measure = () => {
      const items = Array.from(track.children) as HTMLElement[];
      const cardW = items[0]?.offsetWidth ?? 0;

      /* Cap the photograph so the tallest card — buttons included — fits the frame */
      const cs = getComputedStyle(frame);
      const room = frame.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
      const current = imgH.current || cardW * 0.75;
      const capped = Math.round(Math.min(cardW * 0.75, Math.max(MIN_IMG, current + room - content.offsetHeight)));
      if (Math.abs(capped - imgH.current) > 1) {
        imgH.current = capped;
        frame.style.setProperty("--offer2-img-max", `${capped}px`);
      }

      const next = Math.max(0, track.offsetWidth - viewport.clientWidth);
      overflowMV.set(next);
      viewportW.set(viewport.clientWidth);
      setOverflow((prev) => (Math.abs(prev - next) > 1 ? next : prev));
      setOffsets((prev) => {
        const now = items.map((el) => el.offsetLeft);
        return prev.join() === now.join() ? prev : now;
      });
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(frame);
    ro.observe(content);
    ro.observe(viewport);
    ro.observe(track);
    return () => ro.disconnect();
  }, [overflowMV, viewportW]);

  const { scrollYProgress } = useScroll({ target: zoneRef, offset: ["start start", "end end"] });
  const rawX = useTransform(() => -scrollYProgress.get() * overflowMV.get());
  const x = useSpring(rawX, { stiffness: 190, damping: 34, mass: 0.5, restDelta: 0.5 });

  /* Keyboard users: scroll the page so a focused off-screen card is on stage */
  const ensureVisible = (index: number) => {
    const zone = zoneRef.current;
    if (!zone || overflow <= 0) return;
    const offset = offsets[index] ?? 0;
    const left = offset + x.get();
    const vw = viewportW.get();
    const cardW = (offsets[1] ?? vw) - (offsets[0] ?? 0) || vw;
    if (left >= -1 && left + cardW <= vw + 1) return;
    const top = zone.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + Math.min(1, Math.max(0, offset / overflow)) * (zone.offsetHeight - window.innerHeight) });
  };

  return (
    <section
      id={section.id}
      aria-labelledby={`${section.id}-title`}
      style={{ scrollMarginTop: UNDER_CHROME }}
      className={cn(dark ? "bg-[#1a1612]" : "bg-[#f6f1e9]")}
    >
      {/* One card of travel costs 60svh of page scroll: one flick advances one card */}
      <div
        ref={zoneRef}
        className="relative"
        style={{ height: `calc(100svh + ${(Math.max(1, n - perView) * STEP_VH).toFixed(2)} * 100svh)` }}
      >
        <div
          ref={frameRef}
          className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden pb-8 pt-[calc(var(--nav-h)+58px)]"
        >
          <div
            ref={contentRef}
            className="mx-auto flex w-full max-w-[1240px] flex-col gap-6 px-5 sm:px-6 lg:flex-row lg:items-center lg:gap-10"
          >
            <Panel section={section} className="lg:w-[270px] lg:shrink-0" />
            <div ref={viewportRef} className="@container relative min-w-0 flex-1 overflow-hidden py-2">
              <motion.ul
                ref={trackRef}
                id={`${section.id}-track`}
                aria-label={`${section.title} offers`}
                style={{ x }}
                className="flex w-max items-stretch gap-5"
              >
                {section.offers.map((offer, i) => (
                  <TrackCard
                    key={offer.id}
                    index={i}
                    left={offsets[i] ?? 0}
                    x={x}
                    viewportW={viewportW}
                    onFocus={ensureVisible}
                  >
                    <Card2 offer={offer} />
                  </TrackCard>
                ))}
              </motion.ul>
            </div>
            {section.script && <Script text={section.script} className="hidden text-right xl:block" />}
          </div>
        </div>
      </div>
    </section>
  );
}

function TrackCard({
  children,
  index,
  left,
  x,
  viewportW,
  onFocus,
}: {
  children: React.ReactNode;
  index: number;
  /** Measured offsetLeft inside the track viewport */
  left: number;
  x: MotionValue<number>;
  viewportW: MotionValue<number>;
  onFocus: (i: number) => void;
}) {
  /* 0 = card at the viewport's left edge, 1 = at its right edge */
  const pos = useTransform(() => (left + x.get()) / Math.max(1, viewportW.get()));
  const scale = useTransform(pos, [-0.5, 0.02, 0.55, 1.02], [0.94, 1, 1, 0.94]);
  const opacity = useTransform(pos, [-0.42, -0.22, 0.78, 0.95], [0, 1, 1, 0]);
  /* Off-stage cards leave the page entirely — no peeking edges or buttons */
  const visibility = useTransform(pos, (p) => (p < -0.42 || p > 0.95 ? "hidden" : "visible"));
  const pointerEvents = useTransform(pos, (p) => (p < -0.2 || p > 0.8 ? "none" : "auto"));

  return (
    <motion.li
      style={{ scale, opacity, visibility, pointerEvents }}
      onFocusCapture={() => onFocus(index)}
      /* One card per screen below 1024px, exactly two from 1024px */
      className="w-[100cqw] shrink-0 lg:w-[calc((100cqw-1.25rem)/2)]"
    >
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={relay}
        className="h-full"
      >
        {children}
      </motion.div>
    </motion.li>
  );
}
