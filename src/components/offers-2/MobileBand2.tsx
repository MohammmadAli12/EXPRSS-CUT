"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform, type MotionValue } from "motion/react";
import type { Offer2, Section2 } from "@/data/offers-2";
import { Card2 } from "./Card2";

/** Page scroll spent on one card: it rests for most of the step, then hands over */
const STEP_SVH = 75;
/** Shared navigation (72) + tab bar (58) */
const TOP = 130;
/** Share of a step spent changing cards (centred on the hand-over) — the rest is a full hold */
const SWAP = 0.3;
const HOLD = (1 - SWAP) / 2; /* 0.35: a card rests fully visible for 70% of its step */

/**
 * Phone layout for an offer band. The big intro scrolls away first; then the band
 * pins and shows one card at a time with a compact label above it.
 *
 * Cards are stacked, not travelling sideways, so a resting card is always whole
 * and centred. The pin holds until the last card has had its turn.
 */
export function MobileBand2({ section, reduce }: { section: Section2; reduce: boolean }) {
  const n = section.offers.length;
  const dark = section.tone === "dark";
  const zoneRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({ target: zoneRef, offset: ["start start", "end end"] });
  /* 0 → n−1 across the zone: one whole number per card */
  const cursor = useTransform(scrollYProgress, [0, 1], [0, n - 1]);

  useMotionValueEvent(cursor, "change", (v) => {
    setActive(Math.min(n - 1, Math.max(0, Math.round(v))));
  });

  const bg = dark ? "bg-[#1a1612]" : "bg-[#f6f1e9]";
  const label = dark ? "text-[#f3ece1]" : "text-[#1a1612]";

  if (reduce) {
    return (
      <section id={section.id} aria-labelledby={`${section.id}-title`} style={{ scrollMarginTop: TOP }} className={bg}>
        <Intro section={section} />
        <ul aria-label={`${section.title} offers`} className="flex flex-col gap-5 px-4 pb-10">
          {section.offers.map((offer) => (
            <li key={offer.id}>
              <Card2 offer={offer} sizes="92vw" />
            </li>
          ))}
        </ul>
      </section>
    );
  }

  return (
    <section id={section.id} aria-labelledby={`${section.id}-title`} style={{ scrollMarginTop: TOP }} className={bg}>
      <Intro section={section} />

      {/* Each card owns ~75svh of scroll, so one flick moves exactly one card */}
      <div ref={zoneRef} className="relative" style={{ height: `calc(100svh + ${(n - 1) * STEP_SVH}svh)` }}>
        <div
          className="sticky flex flex-col"
          style={{ top: TOP, height: `calc(100svh - ${TOP}px)` }}
        >
          {/* Compact label while pinned: the long intro has already scrolled away */}
          <div className="flex shrink-0 items-center gap-2.5 px-4 pb-3 pt-3">
            <span className="tabular grid size-7 place-items-center rounded-[6px] bg-[linear-gradient(180deg,#a57a4d,#7a5230)] text-[11.5px] font-bold text-white">
              {section.number}
            </span>
            <p className={`font-[family-name:var(--font-o2-serif)] text-[15.5px] font-semibold uppercase tracking-[0.06em] ${label}`}>
              {section.title}
            </p>
            <span aria-hidden className="tabular ml-auto text-[11.5px] font-medium text-[#b0834f]">
              {String(active + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
            </span>
          </div>

          <div className="relative min-h-0 flex-1 px-4 pb-4">
            {section.offers.map((offer, i) => (
              <StackedCard key={offer.id} offer={offer} index={i} cursor={cursor} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Intro({ section }: { section: Section2 }) {
  const dark = section.tone === "dark";
  return (
    <div className="px-4 pb-6 pt-9">
      <span className="tabular grid size-10 place-items-center rounded-[8px] bg-[linear-gradient(180deg,#a57a4d,#7a5230)] text-[15px] font-bold text-white">
        {section.number}
      </span>
      <h2
        id={`${section.id}-title`}
        className={`mt-4 font-[family-name:var(--font-o2-serif)] text-[26px] font-semibold uppercase leading-[1.1] ${
          dark ? "text-[#f3ece1]" : "text-[#1a1612]"
        }`}
      >
        {section.title}
      </h2>
      <p className={`mt-2.5 max-w-[32ch] text-[14.5px] leading-snug ${dark ? "text-[#bfb4a5]" : "text-[#4a423b]"}`}>
        {section.description}
      </p>
      <span aria-hidden className="mt-5 block h-px w-12 bg-[#b0834f]" />
      <p aria-hidden className="mt-3 text-[11px] font-semibold uppercase leading-[1.9] tracking-[0.24em] text-[#b0834f]">
        {section.accent[0]}
        <br />
        {section.accent[1]}
      </p>
    </div>
  );
}

/**
 * One card in the stack. It fades and lifts into place, holds for ~70% of its
 * step, then hands over — so nothing ever rests half off-screen.
 */
function StackedCard({ offer, index, cursor }: { offer: Offer2; index: number; cursor: MotionValue<number> }) {
  /* Distance from this card's turn: 0 while it is the live card */
  const d = useTransform(cursor, (v) => v - index);
  const edge = HOLD + SWAP; /* 0.65: fully gone by here */
  const opacity = useTransform(d, [-edge, -HOLD, HOLD, edge], [0, 1, 1, 0]);
  const y = useTransform(d, [-edge, -HOLD, HOLD, edge], [16, 0, 0, -16]);
  const scale = useTransform(d, [-edge, -HOLD, HOLD, edge], [0.975, 1, 1, 0.975]);
  const visibility = useTransform(d, (v) => (v <= -edge || v >= edge ? "hidden" : "visible"));
  const pointerEvents = useTransform(d, (v) => (v <= -HOLD || v >= HOLD ? "none" : "auto"));

  return (
    <motion.div
      style={{ opacity, y, scale, visibility, pointerEvents }}
      className="absolute inset-0 flex items-center [&_article]:h-auto [&_article]:w-full"
    >
      <Card2 offer={offer} sizes="92vw" />
    </motion.div>
  );
}
