"use client";

import { useRef } from "react";
import { motion, useInView, type MotionValue, type Variants } from "motion/react";
import {
  Check,
  Clock,
  Droplets,
  Footprints,
  Hand,
  HandHeart,
  Hourglass,
  Layers,
  Palette,
  Phone,
  Scissors,
  Smile,
  Sparkles,
  Sun,
  SunMedium,
  Waves,
  type LucideIcon,
} from "lucide-react";
import { saving } from "@/data/offers";
import { CLOSING_TIME, FACIAL_OFFERS, type FacialOffer } from "@/data/facial";
import { SITE, TEL } from "@/lib/site";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Arrow, btn } from "@/components/ui/button";
import { PinnedGallery } from "@/components/motion/PinnedGallery";
import { OfferPhoto } from "@/components/offers/OfferPhoto";

const EASE = [0.22, 1, 0.36, 1] as const;

/* Same entrance sequence as the homepage packages: card → photo settles → name → price → list → CTA */
const card: Variants = {
  hidden: { opacity: 0.001, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE, staggerChildren: 0.1, delayChildren: 0.08 } },
};
const settle: Variants = {
  hidden: { scale: 1.14 },
  show: { scale: 1, transition: { duration: 1.6, ease: EASE } },
};
const rise: Variants = {
  hidden: { opacity: 0.001, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};
const reveal: Variants = {
  hidden: { clipPath: "inset(0% 100% 0% 0%)" },
  show: { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 1, ease: EASE } },
};

/** Line icon per inclusion (matched on the supplied wording); a check when nothing fits */
const INCLUDE_ICONS: [RegExp, LucideIcon][] = [
  [/hair cut/i, Scissors],
  [/beard|shav/i, Smile],
  [/massage/i, HandHeart],
  [/hair colou?r/i, Palette],
  [/hair spa|hydration/i, Droplets],
  [/pedicure/i, Footprints],
  [/manicure/i, Hand],
  [/facial|glow/i, Sparkles],
  [/brighten/i, SunMedium],
  [/texture/i, Layers],
  [/deep clean/i, Waves],
  [/tan/i, Sun],
  [/aging|ageing/i, Hourglass],
];
const iconFor = (service: string) => INCLUDE_ICONS.find(([re]) => re.test(service))?.[1] ?? Check;

/**
 * Six facial offers on a pinned track: two to a screen from 768px, one on phones.
 * Native vertical scroll moves the row sideways — no swipe, no horizontal scrollbar.
 */
export function FacialOffers() {
  return (
    <section id="offers" aria-labelledby="facial-offers-title" className="bg-ivory">
      <PinnedGallery
        id="facial-offers-track"
        label="Facial offers"
        itemNoun="offers"
        count={FACIAL_OFFERS.length}
        perView={{ base: 1, md: 2 }}
        pace={0.62}
        accent
        cardClassName="facial-card"
        gridClassName="md:grid-cols-2"
        header={<Header />}
        renderItem={({ index, imageX, eager }) => (
          <FacialOfferCard offer={FACIAL_OFFERS[index]} imageX={imageX} eager={eager} />
        )}
      />
    </section>
  );
}

function Header() {
  return (
    <div className="flex items-end justify-between gap-x-10 gap-y-3">
      <div>
        <p className="facial-offers-eyebrow eyebrow text-ink-muted">Our facial offers</p>
        <h2
          id="facial-offers-title"
          className="facial-offers-title mt-2 font-display text-[clamp(1.85rem,3.8vw,3.4rem)] font-semibold leading-[1.02] tracking-[-0.018em] md:mt-3"
        >
          Facial Treatments for <em className="font-medium text-champagne">Every You.</em>
        </h2>
        <p className="facial-offers-sub mt-2 text-[14px] leading-snug text-ink-soft md:text-[16px]">
          Choose the right facial or grooming package for your skin and lifestyle.
        </p>
      </div>
      <p aria-hidden className="hidden shrink-0 pb-2 text-right text-[12px] font-medium uppercase leading-[1.9] tracking-[0.3em] text-champagne lg:block">
        Real care.
        <br />
        Real confidence.
        <span className="ml-auto mt-4 block h-px w-16 bg-champagne/70" />
      </p>
    </div>
  );
}

function FacialOfferCard({
  offer,
  imageX,
  eager,
}: {
  offer: FacialOffer;
  imageX?: MotionValue<string>;
  eager: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduce = useMediaQuery("(prefers-reduced-motion: reduce)");
  const titleId = `facial-offer-${offer.id}`;
  const sizes = "(min-width: 1280px) 640px, (min-width: 768px) 48vw, 92vw";

  return (
    <motion.article
      ref={ref}
      initial={reduce ? false : "hidden"}
      animate={reduce || inView ? "show" : "hidden"}
      variants={card}
      aria-labelledby={titleId}
      className="@container flex h-full flex-col overflow-hidden rounded-[18px] bg-paper shadow-card"
    >
      <div className="facial-offer-img relative shrink-0 overflow-hidden bg-charcoal">
        <motion.div variants={settle} className="absolute inset-0">
          <motion.div style={{ x: imageX }} className="absolute inset-y-0 -inset-x-[4%]">
            <OfferPhoto offer={offer} sizes={sizes} eager={eager} />
          </motion.div>
        </motion.div>
        <span
          aria-hidden
          className="tabular absolute right-3.5 top-3.5 grid h-9 min-w-9 place-items-center rounded-full border border-ivory/25 bg-ink/70 px-2.5 text-[12.5px] font-semibold tracking-[0.06em] text-ivory backdrop-blur-[2px] @min-[440px]:right-4 @min-[440px]:top-4"
        >
          {offer.number}
        </span>
      </div>

      <div className="facial-offer-body flex flex-1 flex-col px-5 pb-3.5 pt-3.5 @min-[440px]:px-7 @min-[440px]:pb-5 @min-[440px]:pt-6">
        {/* Phones: name → save → price → includes → call. Wide cards: includes beside, call under the price */}
        <div className="grid flex-1 grid-cols-1 grid-rows-[auto_auto_1fr] gap-y-3 @min-[440px]:grid-cols-[minmax(0,1fr)_minmax(0,1.12fr)] @min-[440px]:grid-rows-[auto_1fr] @min-[440px]:gap-x-7 @min-[440px]:gap-y-5">
          <div className="@min-[440px]:col-start-1 @min-[440px]:row-start-1">
            <motion.h3
              variants={rise}
              id={titleId}
              className="text-[20px] font-semibold leading-tight tracking-[-0.015em] text-ink @min-[440px]:text-[clamp(22px,4.6cqw,27px)]"
            >
              {offer.label}
            </motion.h3>
            <motion.p variants={rise} className="mt-2 @min-[440px]:mt-3">
              <span className="tabular inline-flex h-7 items-center rounded-full bg-champagne-soft px-3 text-[13.5px] font-semibold tracking-[0.01em] text-ink @min-[440px]:h-9 @min-[440px]:px-4 @min-[440px]:text-[16px]">
                Save ₹{saving(offer)}
              </span>
            </motion.p>
            <motion.p variants={reveal} className="mt-1.5 flex items-baseline gap-3 @min-[440px]:mt-2.5">
              <span className="sr-only">Offer price</span>
              <span className="tabular text-[32px] font-extrabold leading-none tracking-[-0.035em] text-price @min-[440px]:text-[clamp(36px,7.4cqw,46px)]">
                ₹{offer.offerPrice}
              </span>
              <span className="sr-only">, regular price</span>
              <s className="tabular text-[16px] font-medium text-ink-muted decoration-ink-muted decoration-1 @min-[440px]:text-[19px]">
                ₹{offer.actualPrice}
              </s>
            </motion.p>
          </div>

          <motion.div
            variants={rise}
            className="border-t border-line pt-2.5 @min-[440px]:col-start-2 @min-[440px]:row-span-2 @min-[440px]:row-start-1 @min-[440px]:border-l @min-[440px]:border-t-0 @min-[440px]:pl-7 @min-[440px]:pt-1"
          >
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.26em] text-ink-muted @min-[440px]:text-[11px]">Includes</p>
            <ul className="facial-offer-list mt-1.5 space-y-[5px] @min-[440px]:mt-3 @min-[440px]:space-y-2">
              {offer.services.map((s) => {
                const Icon = iconFor(s);
                return (
                  <li key={s} className="flex items-center gap-2.5 text-[13.5px] leading-[1.25] text-ink-soft @min-[440px]:gap-3 @min-[440px]:text-[15px]">
                    <Icon aria-hidden className="size-4 shrink-0 text-ink @min-[440px]:size-[18px]" strokeWidth={1.4} />
                    {s}
                  </li>
                );
              })}
            </ul>
          </motion.div>

          <motion.div variants={rise} className="mt-1 self-end @min-[440px]:col-start-1 @min-[440px]:row-start-2 @min-[440px]:mt-0">
            <a
              href={TEL}
              aria-label={`Call ${SITE.phoneDisplay} about the ${offer.label} offer`}
              className={btn("ink", "md", "h-11 w-full text-[13.5px] uppercase tracking-[0.1em] @min-[440px]:h-12")}
            >
              <Phone aria-hidden className="size-4" strokeWidth={1.7} />
              Call Now
              <Arrow className="size-4" />
            </a>
          </motion.div>
        </div>

        <motion.div variants={rise}>
          <ul className="facial-offer-meta mt-2.5 flex items-center gap-4 text-[12.5px] text-ink-soft @min-[440px]:mt-4 @min-[440px]:text-[13.5px]">
            <li className="flex items-center gap-2">
              <Footprints aria-hidden className="size-4 text-ink" strokeWidth={1.4} />
              Walk-ins Welcome
            </li>
            {CLOSING_TIME && (
              <li className="flex items-center gap-2 border-l border-line pl-4">
                <Clock aria-hidden className="size-4 text-ink" strokeWidth={1.4} />
                Open till {CLOSING_TIME}
              </li>
            )}
          </ul>
        </motion.div>
      </div>
    </motion.article>
  );
}
