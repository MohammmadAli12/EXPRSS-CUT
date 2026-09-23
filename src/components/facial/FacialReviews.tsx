"use client";

import { GOOGLE_RATING, GOOGLE_REVIEWS_URL } from "@/data/reviews";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Arrow, Eyebrow, btn } from "@/components/ui/button";
import { Stars } from "@/components/ui/Stars";
import { Reveal } from "@/components/motion/Reveal";
import { Marquee, StaticReviews } from "@/components/sections/ClientReviews";

/** Compact band of the verbatim Google reviews, drifting slowly left → right. */
export function FacialReviews() {
  const reduce = useMediaQuery("(prefers-reduced-motion: reduce)");
  const { value, count, asOf } = GOOGLE_RATING;

  return (
    <section id="reviews" aria-labelledby="facial-reviews-title" className="bg-ivory pb-14 lg:pb-16">
      <div className="shell border-t border-line pt-14 lg:pt-16">
        <Reveal className="flex flex-wrap items-end justify-between gap-x-10 gap-y-5">
          <div>
            <Eyebrow>Real people. Real experiences.</Eyebrow>
            <h2
              id="facial-reviews-title"
              className="mt-4 font-display text-[clamp(2rem,3.4vw,2.8rem)] font-semibold leading-[1.04] tracking-[-0.015em]"
            >
              Customer Reviews
            </h2>
            <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5">
              <span className="font-display text-[26px] font-semibold leading-none tracking-[-0.02em]">{value.toFixed(1)}</span>
              <Stars value={value} />
              <p className="text-[14px] text-ink-muted">
                <span className="tabular font-semibold text-ink">{count}</span> Google reviews · as of {asOf}
              </p>
            </div>
          </div>
          <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer" className={btn("outline", "md")}>
            Read all reviews on Google <Arrow external />
          </a>
        </Reveal>

        <div className="mt-8 lg:mt-10">
          {reduce ? (
            <StaticReviews />
          ) : (
            <Marquee trackId="facial-reviews-track" cardClassName="w-[min(80vw,320px)] md:w-[340px] xl:w-[390px]" />
          )}
        </div>
      </div>
    </section>
  );
}
