"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { Phone } from "lucide-react";
import { HOME_OFFERS, type HomeOffer } from "@/data/home-offers";
import { SITE, TEL } from "@/lib/site";
import { cn } from "@/lib/cn";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Eyebrow } from "@/components/ui/button";
import { StepButtons } from "@/components/ui/StepButtons";
import { OfferCard2 } from "@/components/offer-card/OfferCard2";
import { OFFER_CARD_FONTS } from "@/components/offer-card/fonts";

const N = HOME_OFFERS.length;
/** Fallback card width before the track is measured; the real width is CSS-driven */
const CARD_W = 400;
/** The side track's left inset (the `pl-[88px]` below), where the mask fades it in */
const TRACK_INSET = 88;
/** Floor for the photograph on very short screens, so the tallest card still fits */
const MIN_IMG_H = 150;
/* Empty parent variants: the card owns its animation, this only passes the state down */
const relay = { hidden: {}, show: {} };
const pad = (n: number) => String(n).padStart(2, "0");

type Layout = "side" | "stacked";
type Geometry = { overflow: number; offsets: number[]; cardW: number };

/**
 * At every size, native vertical scroll drives the nine cards sideways — no wheel
 * handlers, no scroll-jacking, and no swipe-only track.
 * Wide and tall → intro beside the pinned track. Otherwise → intro above it.
 * Reduced motion → a static grid.
 */
export function OffersSection() {
  /* useSyncExternalStore-backed, so hydration renders the server branch first (no mismatch) */
  const reduce = useMediaQuery("(prefers-reduced-motion: reduce)");
  const side = useMediaQuery("(min-width: 1024px) and (min-height: 760px)");
  if (reduce) return <OffersGrid />;
  const layout: Layout = side ? "side" : "stacked";
  /* Keyed so scroll tracking re-attaches to the new zone when the layout swaps */
  return <OffersPinned key={layout} layout={layout} />;
}

/* ───────────────────────── Shared pieces ───────────────────────── */

function OffersIntro({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Eyebrow>Combo offers</Eyebrow>
      <h2
        id="offers-title"
        className="mt-5 font-display text-[clamp(2.5rem,4.2vw,3.7rem)] font-semibold uppercase leading-[0.96] tracking-[-0.01em]"
      >
        Grooming
        <br />
        Packages
      </h2>
      <p className="mt-5 text-[17px] font-medium leading-snug text-ink">
        The right combo.
        <br />
        The right price.
      </p>
      <p className="mt-4 max-w-[32ch] text-[15px] leading-relaxed text-ink-soft">
        Nine combinations from our menu, each priced below its regular rate.
      </p>
    </div>
  );
}

function Counter({ active, progress }: { active: number; progress: MotionValue<number> }) {
  return (
    <div className="flex items-center gap-4">
      <p className="tabular text-[13.5px] text-ink-muted" aria-hidden>
        <span className="font-semibold text-ink">{pad(active + 1)}</span> / {pad(N)}
      </p>
      <div className="relative h-px w-24 bg-ink/15" aria-hidden>
        <motion.span className="absolute inset-0 origin-left bg-ink" style={{ scaleX: progress }} />
      </div>
    </div>
  );
}

function CallLine() {
  return (
    <a href={TEL} className="inline-flex items-center gap-2.5 text-[14px] text-ink-soft transition-colors hover:text-ink">
      <span className="grid size-8 place-items-center rounded-full border border-ink/20">
        <Phone aria-hidden className="size-3.5" strokeWidth={1.6} />
      </span>
      Call to book · {SITE.phoneDisplay}
    </a>
  );
}

/* ───────────────────────── Pinned track (all sizes) ───────────────────────── */

function OffersPinned({ layout }: { layout: Layout }) {
  const side = layout === "side";
  const zoneRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const imgH = useRef(0);
  const [geom, setGeom] = useState<Geometry>({ overflow: 0, offsets: [], cardW: CARD_W });
  const [active, setActive] = useState(0);
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
      const cardW = items[0]?.offsetWidth ?? CARD_W;
      /* 4:3 photographs when there is room; shorter on short screens so the tallest card never clips */
      const cs = getComputedStyle(frame);
      const room = frame.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
      const current = imgH.current || cardW * 0.75;
      const next = Math.round(Math.min(cardW * 0.75, Math.max(MIN_IMG_H, current + room - content.offsetHeight)));
      if (Math.abs(next - imgH.current) > 1) {
        imgH.current = next;
        frame.style.setProperty("--offer2-img-max", `${next}px`);
      }

      const overflow = Math.max(0, track.offsetWidth - viewport.clientWidth);
      overflowMV.set(overflow);
      viewportW.set(viewport.clientWidth);
      setGeom({ overflow, offsets: items.map((el) => el.offsetLeft), cardW });
    };

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
    setActive(Math.min(N - 1, Math.max(0, Math.round(v * (N - 1)))));
  });

  const scrollToProgress = useCallback((p: number, smooth: boolean) => {
    const el = zoneRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const distance = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + Math.min(1, Math.max(0, p)) * distance, behavior: smooth ? "smooth" : "auto" });
  }, []);

  /* One press = one card of travel. The track carries two cards on a wide screen,
     so it has fewer hand-overs than it has cards; the pitch comes from the
     measured card positions rather than the card count. */
  const step = (dir: -1 | 1) => {
    const { overflow, offsets } = geom;
    const pitch = (offsets[1] ?? 0) - (offsets[0] ?? 0);
    if (overflow <= 0 || pitch <= 0) return scrollToProgress((active + dir) / (N - 1), true);
    const last = Math.round(overflow / pitch);
    const here = Math.round((scrollYProgress.get() * overflow) / pitch);
    scrollToProgress((Math.min(last, Math.max(0, here + dir)) * pitch) / overflow, true);
  };

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

  const zoneStyle = { height: `calc(100svh + ${geom.overflow}px)` };

  const track = (
    <div
      ref={viewportRef}
      data-layout={layout}
      className={cn("offers-viewport @container relative min-w-0 overflow-hidden", side ? "flex-1 py-8" : "pb-6 pt-3")}
    >
      <motion.ul
        ref={trackRef}
        id="offers-track"
        aria-label="Grooming packages"
        style={{ x }}
        className={cn("flex w-max items-stretch gap-5", side ? "pl-[88px] pr-[var(--gutter)]" : "px-shell")}
      >
        {HOME_OFFERS.map((offer, i) => (
          <PinnedCard
            key={offer.id}
            offer={offer}
            index={i}
            left={geom.offsets[i] ?? 0}
            cardW={geom.cardW}
            inset={geom.offsets[0] ?? (side ? TRACK_INSET : 0)}
            x={x}
            viewportW={viewportW}
            onFocus={ensureVisible}
            className={
              side
                /* the side track is inset by 88px on the left and a gutter on the right */
                ? "w-[calc((100cqw-88px-var(--gutter)-1.25rem)/2)]"
                : "w-[calc(100cqw-2*var(--gutter))] md:w-[calc((100cqw-2*var(--gutter)-1.25rem)/2)]"
            }
            sizes={side ? "(min-width: 1280px) 440px, 36vw" : "(min-width: 768px) 46vw, 92vw"}
          />
        ))}
      </motion.ul>
    </div>
  );

  const stepButtons = (
    <StepButtons onStep={step} atStart={active === 0} atEnd={active === N - 1} controls="offers-track" label="package" />
  );

  if (side) {
    return (
      <section id="offers" aria-labelledby="offers-title" className={cn(OFFER_CARD_FONTS, "bg-cream")}>
        <div ref={zoneRef} className="relative" style={zoneStyle}>
          <div ref={frameRef} className="offers-fit sticky top-0 flex h-svh items-center overflow-hidden pb-6 pt-[var(--nav-h)]">
            <div ref={contentRef} className="pl-shell flex w-full items-center">
              <div className="w-[clamp(280px,27vw,360px)] shrink-0 pr-10">
                <OffersIntro />
                <div className="mt-10 flex flex-col gap-6">
                  <Counter active={active} progress={scrollYProgress} />
                  {stepButtons}
                  <CallLine />
                </div>
              </div>
              {track}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="offers" aria-labelledby="offers-title" className={cn(OFFER_CARD_FONTS, "bg-cream pb-8 pt-20 md:pt-24")}>
      <div className="shell flex flex-wrap items-end justify-between gap-x-10 gap-y-7">
        <OffersIntro />
        <CallLine />
      </div>
      <div ref={zoneRef} className="relative" style={zoneStyle}>
        <div
          ref={frameRef}
          className="offers-fit sticky top-0 flex h-svh flex-col justify-center overflow-hidden pb-3 pt-[var(--nav-h)]"
        >
          <div ref={contentRef} className="w-full">
            {track}
            <div className="shell flex items-center justify-between gap-6">
              <Counter active={active} progress={scrollYProgress} />
              {stepButtons}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PinnedCard({
  offer,
  index,
  left,
  cardW,
  inset,
  x,
  viewportW,
  onFocus,
  className,
  sizes,
}: {
  offer: HomeOffer;
  index: number;
  /** Card's measured offsetLeft inside the track viewport */
  left: number;
  /** Measured card width, and where the track's first card starts (its left inset) */
  cardW: number;
  inset: number;
  x: MotionValue<number>;
  viewportW: MotionValue<number>;
  onFocus: (i: number) => void;
  className: string;
  sizes: string;
}) {
  /* A card is on stage while it is wholly inside the track: gone once its trailing
     edge slips behind the track's left inset, and still off-stage while only a
     sliver of it shows past the right edge. Measured in pixels, so a resting pair
     is two whole cards at every width — nothing peeks in or lingers. */
  const opacity = useTransform(() => {
    const w = Math.max(1, cardW);
    const l = left + x.get();
    const leaving = (l + w - inset) / (0.45 * w);
    const arriving = (Math.max(1, viewportW.get()) - l - 0.1 * w) / (0.35 * w);
    return Math.max(0, Math.min(1, leaving, arriving));
  });
  const scale = useTransform(opacity, [0, 1], [0.94, 1]);
  /* Off-stage cards take no clicks, but stay in the tab order: focusing one scrolls
     the track to it (see onFocus), which `visibility: hidden` would make impossible */
  const pointerEvents = useTransform(opacity, (o) => (o > 0.9 ? "auto" : "none"));

  return (
    <motion.li
      style={{ scale, opacity, pointerEvents }}
      className={cn("shrink-0", className)}
      onFocusCapture={() => onFocus(index)}
    >
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={relay}
        className="h-full"
      >
        <OfferCard2 offer={offer} sizes={sizes} mediaCap="all" />
      </motion.div>
    </motion.li>
  );
}

/* ───────────────────────── Reduced motion: static grid ───────────────────────── */

function OffersGrid() {
  return (
    <section id="offers" aria-labelledby="offers-title" className={cn(OFFER_CARD_FONTS, "bg-cream py-20 md:py-24 lg:py-32")}>
      <div className="shell grid gap-12 lg:grid-cols-[minmax(260px,1fr)_3fr]">
        <div>
          <OffersIntro />
          <div className="mt-8">
            <CallLine />
          </div>
        </div>
        <ul aria-label="Grooming packages" className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {HOME_OFFERS.map((offer) => (
            <li key={offer.id}>
              <OfferCard2 offer={offer} sizes="(min-width: 1280px) 340px, (min-width: 640px) 44vw, 92vw" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
