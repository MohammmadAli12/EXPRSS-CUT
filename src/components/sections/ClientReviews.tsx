"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useAnimationFrame, useInView, useMotionValue } from "motion/react";
import { Pause, Play } from "lucide-react";
import { GOOGLE_RATING, GOOGLE_REVIEWS_URL, REVIEWS, type Review } from "@/data/reviews";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/cn";
import { Arrow, Eyebrow, btn } from "@/components/ui/button";
import { Stars } from "@/components/ui/Stars";
import { Reveal } from "@/components/motion/Reveal";

/** Marquee drift, px per second — slow enough to read */
const SPEED = 22;
/** Gap between cards (and between the two copies of the row), px */
const GAP = 16;
/** Verbatim Google reviews only — see src/data/reviews.ts. */
export function ClientReviews() {
  const reduce = useMediaQuery("(prefers-reduced-motion: reduce)");
  const hasReviews = REVIEWS.length > 0;

  return (
    <section id="reviews" aria-labelledby="reviews-title" className="bg-ivory py-16 lg:py-20">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
          <div>
            <Eyebrow>Real people. Real experiences.</Eyebrow>
            <h2
              id="reviews-title"
              className="mt-5 font-display text-[clamp(2.1rem,3.5vw,2.9rem)] font-semibold leading-[1.04] tracking-[-0.015em]"
            >
              What Our Clients Say
            </h2>
            <RatingSummary className="mt-4" />
          </div>
          <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer" className={btn("outline", "md")}>
            Read all reviews on Google <Arrow external />
          </a>
        </div>

        {/* The photograph shares the cards' row, so its top and bottom line up with
            them; the pause control sits on its own row underneath. */}
        <div className="mt-10 grid gap-5 lg:grid-cols-12">
          {hasReviews &&
            (reduce ? (
              <div className="min-w-0 lg:col-span-9">
                <StaticReviews />
              </div>
            ) : (
              <Marquee
                wrapperClassName="min-w-0 lg:contents"
                viewportClassName="min-w-0 lg:col-span-9 lg:row-start-1"
                controlsClassName="lg:col-span-9 lg:row-start-2 lg:mt-0"
              />
            ))}
          <Reveal variant="clip" className="hidden lg:col-span-3 lg:row-start-1 lg:block">
            <figure className="relative h-full overflow-hidden rounded-[18px] bg-charcoal">
              <Image
                src="/images/reviews/reception.webp"
                alt="The lit Express Cuts Men's Salon reception desk in KR Puram"
                fill
                sizes="(min-width: 1280px) 300px, 24vw"
                className="object-cover"
                style={{ objectPosition: "50% 58%" }}
              />
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function RatingSummary({ className }: { className?: string }) {
  const { value, count, asOf } = GOOGLE_RATING;
  return (
    <div className={cn("flex flex-wrap items-center gap-x-3 gap-y-1.5", className)}>
      <span className="font-display text-[30px] font-semibold leading-none tracking-[-0.02em]">{value.toFixed(1)}</span>
      <Stars value={value} />
      <p className="text-[14px] text-ink-muted">
        <span className="tabular font-semibold text-ink">{count}</span> Google reviews · as of {asOf}
      </p>
    </div>
  );
}

/**
 * A slow, continuous left-to-right drift. The row is rendered twice (the copy is
 * hidden from assistive tech) so it loops without a seam. Pauses on hover, while
 * a card has focus, off-screen, in a background tab, or with the pause button.
 */
export function Marquee({
  cardClassName = "w-[min(78vw,320px)]",
  trackId = "reviews-track",
  wrapperClassName,
  viewportClassName,
  controlsClassName,
}: {
  /** Card width */
  cardClassName?: string;
  trackId?: string;
  /** Slots, so a host can place the row and its pause control itself */
  wrapperClassName?: string;
  viewportClassName?: string;
  controlsClassName?: string;
} = {}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const setRef = useRef<HTMLUListElement>(null);
  const loopW = useRef(0);
  const focused = useRef(false);
  const x = useMotionValue(0);
  const [paused, setPaused] = useState(false);
  const inView = useInView(wrapRef, { amount: 0.2 });
  /* Only real pointers pause on hover — a tap on a phone must not freeze the row */
  const canHover = useMediaQuery("(hover: hover)");

  useEffect(() => {
    const el = setRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      loopW.current = el.offsetWidth + GAP;
      /* Start one row to the left so the drift moves into view */
      if (x.get() === 0 || x.get() < -loopW.current) x.set(-loopW.current);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [x]);

  useAnimationFrame((_, delta) => {
    const w = loopW.current;
    if (!w || paused || !inView || focused.current || document.hidden) return;
    /* Read :hover each frame: cards drift under a still pointer, so enter/leave events are unreliable */
    if (canHover && wrapRef.current?.matches(":hover")) return;
    let next = x.get() + (SPEED * Math.min(delta, 64)) / 1000;
    if (next >= 0) next -= w;
    x.set(next);
  });

  const cards = (hidden?: boolean) =>
    REVIEWS.map((r, i) => (
      <li key={`${r.author}-${i}`} className={cn("shrink-0", cardClassName)}>
        <ReviewCard review={r} decorative={hidden} />
      </li>
    ));

  return (
    <div className={wrapperClassName}>
      <div
        ref={wrapRef}
        className={cn("relative overflow-hidden py-1", viewportClassName)}
        style={{
          WebkitMaskImage: "linear-gradient(90deg, transparent 0, #000 4%, #000 96%, transparent 100%)",
          maskImage: "linear-gradient(90deg, transparent 0, #000 4%, #000 96%, transparent 100%)",
        }}
        onFocusCapture={() => {
          focused.current = true;
        }}
        onBlurCapture={() => {
          focused.current = false;
        }}
      >
        <motion.div style={{ x, gap: GAP }} className="flex w-max">
          <ul ref={setRef} id={trackId} aria-label="Google reviews" className="flex" style={{ gap: GAP }}>
            {cards()}
          </ul>
          <ul aria-hidden inert className="flex" style={{ gap: GAP }}>
            {cards(true)}
          </ul>
        </motion.div>
      </div>
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        aria-pressed={paused}
        aria-controls={trackId}
        className={cn(
          "mt-4 inline-flex items-center gap-2.5 text-[13px] font-medium text-ink-soft transition-colors hover:text-ink",
          controlsClassName,
        )}
      >
        <span className="grid size-8 place-items-center rounded-full border border-ink/20">
          {paused ? (
            <Play aria-hidden className="size-3.5" strokeWidth={1.8} />
          ) : (
            <Pause aria-hidden className="size-3.5" strokeWidth={1.8} />
          )}
        </span>
        {paused ? "Play reviews" : "Pause reviews"}
      </button>
    </div>
  );
}

/** Reduced motion: three cards, no movement. */
export function StaticReviews() {
  return (
    <ul aria-label="Google reviews" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {REVIEWS.slice(0, 3).map((r, i) => (
        <li key={`${r.author}-${i}`}>
          <ReviewCard review={r} />
        </li>
      ))}
    </ul>
  );
}

export function ReviewCard({ review: r, decorative }: { review: Review; decorative?: boolean }) {
  return (
    <figure className="flex h-full flex-col rounded-[18px] border border-line bg-paper p-5 shadow-[0_1px_2px_rgb(18_17_16/0.04)]">
      <figcaption className="flex items-center gap-3">
        <Avatar src={r.avatar} name={r.author} eager={!decorative} />
        <span className="min-w-0">
          <span className="block truncate text-[14.5px] font-semibold leading-snug text-ink">{r.author}</span>
          <span className="mt-0.5 block text-[12.5px] leading-snug text-ink-muted">{r.date}</span>
        </span>
      </figcaption>

      <Stars value={r.rating} className="mt-4" />

      <blockquote className="mt-2.5 flex-1">
        <p className="line-clamp-4 whitespace-pre-line text-[14.5px] leading-[1.55] text-ink-soft">{r.text}</p>
      </blockquote>

      <p className="mt-4 border-t border-line pt-3 text-[12.5px] font-semibold text-ink">Google review</p>
    </figure>
  );
}

/** Supplied Google photo, or initials — never a stand-in face. */
function Avatar({ src, name, eager }: { src?: string; name: string; eager?: boolean }) {
  const [failed, setFailed] = useState(false);
  if (src && !failed) {
    return (
      <Image
        src={src}
        alt=""
        width={40}
        height={40}
        unoptimized
        loading={eager ? "eager" : "lazy"}
        referrerPolicy="no-referrer"
        onError={() => setFailed(true)}
        className="size-10 shrink-0 rounded-full bg-cream object-cover"
      />
    );
  }
  const initials = name
    .split(/\s+/)
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <span aria-hidden className="grid size-10 shrink-0 place-items-center rounded-full bg-cream text-[13.5px] font-semibold text-ink">
      {initials}
    </span>
  );
}
