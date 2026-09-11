"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { GOOGLE_RATING, GOOGLE_REVIEWS_URL, REVIEWS, type Review } from "@/data/reviews";
import { cn } from "@/lib/cn";
import { Arrow, Eyebrow, btn } from "@/components/ui/button";
import { StepButtons } from "@/components/ui/StepButtons";
import { Reveal } from "@/components/motion/Reveal";

/** Verbatim Google reviews only — see src/data/reviews.ts. */
export function ClientReviews() {
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [progress, setProgress] = useState(0);
  const hasReviews = REVIEWS.length > 0;

  const onScroll = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 1);
  };

  const step = (dir: -1 | 1) => {
    const el = scrollerRef.current;
    const first = el?.firstElementChild as HTMLElement | null;
    if (!el || !first) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * (first.offsetWidth + 20), behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <section id="reviews" aria-labelledby="reviews-title" className="bg-ivory pb-20 lg:pb-28">
      <div className="shell flex flex-wrap items-end justify-between gap-x-10 gap-y-8">
        <div>
          <Eyebrow>Real people. Real experiences.</Eyebrow>
          <h2
            id="reviews-title"
            className="mt-5 font-display text-[clamp(2.3rem,4vw,3.3rem)] font-semibold leading-[1.04] tracking-[-0.015em]"
          >
            What Our Clients Say
          </h2>
          <RatingSummary className="mt-6" />
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {hasReviews && (
            <StepButtons
              onStep={step}
              atStart={progress <= 0.01}
              atEnd={progress >= 0.99}
              controls="reviews-track"
              label="review"
            />
          )}
          <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer" className={btn("outline", "md")}>
            Read all reviews on Google <Arrow external />
          </a>
        </div>
      </div>

      {hasReviews && (
        <Reveal>
          <ul
            ref={scrollerRef}
            id="reviews-track"
            aria-label="Google reviews"
            onScroll={onScroll}
            className="no-scrollbar px-shell mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 pt-1"
            style={{ scrollPaddingInline: "max(var(--gutter), calc((100% - 82rem) / 2 + var(--gutter)))" }}
          >
            {REVIEWS.map((r, i) => (
              <li key={`${r.author}-${i}`} className="w-[min(86vw,380px)] shrink-0 snap-start">
                <ReviewCard review={r} />
              </li>
            ))}
          </ul>
        </Reveal>
      )}
    </section>
  );
}

function RatingSummary({ className }: { className?: string }) {
  const { value, count, asOf } = GOOGLE_RATING;
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <span className="font-display text-[44px] font-semibold leading-none tracking-[-0.02em]">
        {value.toFixed(1)}
      </span>
      <div>
        <Stars value={value} />
        <p className="mt-1.5 text-[14px] text-ink-muted">
          <span className="tabular font-semibold text-ink">{count}</span> Google reviews · as of {asOf}
        </p>
      </div>
    </div>
  );
}

function Stars({ value, className }: { value: number; className?: string }) {
  const row = (
    <>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} aria-hidden className="size-4 shrink-0" fill="currentColor" strokeWidth={0} />
      ))}
    </>
  );
  return (
    <span role="img" aria-label={`${value} out of 5 stars`} className={cn("relative inline-flex", className)}>
      <span className="flex gap-0.5 text-line">{row}</span>
      <span className="absolute inset-y-0 left-0 flex gap-0.5 overflow-hidden text-champagne" style={{ width: `${(value / 5) * 100}%` }}>
        {row}
      </span>
    </span>
  );
}

function ReviewCard({ review: r }: { review: Review }) {
  const textRef = useRef<HTMLParagraphElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [overflows, setOverflows] = useState(false);

  /* "Read more" only when the clamped text actually hides something */
  useEffect(() => {
    const el = textRef.current;
    if (!el || expanded) return;
    const ro = new ResizeObserver(() => setOverflows(el.scrollHeight > el.clientHeight + 1));
    ro.observe(el);
    return () => ro.disconnect();
  }, [expanded]);

  return (
    <figure className="flex h-full flex-col rounded-[18px] border border-line bg-paper p-6 shadow-[0_1px_2px_rgb(18_17_16/0.04)] sm:p-7">
      <figcaption className="flex items-center gap-3.5">
        <Avatar src={r.avatar} name={r.author} />
        <span className="min-w-0">
          <span className="block text-[15px] font-semibold leading-snug text-ink">{r.author}</span>
          <span className="mt-0.5 block text-[12.5px] leading-snug text-ink-muted">{r.meta}</span>
        </span>
      </figcaption>

      <Stars value={r.rating} className="mt-5" />

      <div className="mt-3 flex-1">
        <blockquote>
          <p
            ref={textRef}
            className={cn("whitespace-pre-line text-[15.5px] leading-[1.6] text-ink-soft", !expanded && "line-clamp-6")}
          >
            {r.text}
          </p>
        </blockquote>
        {(overflows || expanded) && (
          <button
            type="button"
            aria-expanded={expanded}
            onClick={() => setExpanded((v) => !v)}
            className="mt-2 text-[13.5px] font-semibold text-ink underline decoration-ink/30 underline-offset-4 transition-colors hover:decoration-ink"
          >
            {expanded ? "Show less" : "Read more"}
          </button>
        )}
      </div>

      <div className="mt-6 flex items-center justify-between gap-3 border-t border-line pt-4 text-[12.5px] text-ink-muted">
        {r.sourceUrl ? (
          <a href={r.sourceUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-ink underline-offset-4 hover:underline">
            Google review
          </a>
        ) : (
          <span className="font-semibold text-ink">Google review</span>
        )}
        <span>{r.date}</span>
      </div>
    </figure>
  );
}

/** Supplied Google photo, or initials — never a stand-in face. */
function Avatar({ src, name }: { src?: string; name: string }) {
  const [failed, setFailed] = useState(false);
  if (src && !failed) {
    return (
      <Image
        src={src}
        alt=""
        width={44}
        height={44}
        unoptimized
        loading="eager"
        referrerPolicy="no-referrer"
        onError={() => setFailed(true)}
        className="size-11 shrink-0 rounded-full bg-cream object-cover"
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
    <span aria-hidden className="grid size-11 shrink-0 place-items-center rounded-full bg-cream text-[14px] font-semibold text-ink">
      {initials}
    </span>
  );
}
