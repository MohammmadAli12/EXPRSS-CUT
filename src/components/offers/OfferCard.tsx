"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, type MotionValue, type Variants } from "motion/react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Check, Phone } from "lucide-react";
import { saving, type Offer } from "@/data/offers";
import { SITE, TEL } from "@/lib/site";
import { cn } from "@/lib/cn";
import { Arrow, btn } from "@/components/ui/button";
import { BookTrigger } from "@/components/booking/BookTrigger";

const EASE = [0.22, 1, 0.36, 1] as const;

/* Sequence: card lands → image settles → name → price → inclusions → CTA */
const card: Variants = {
  hidden: { opacity: 0.001, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE, staggerChildren: 0.11, delayChildren: 0.08 },
  },
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

type Props = {
  offer: Offer;
  /** Scroll-linked horizontal drift of the photograph (pinned track only) */
  imageX?: MotionValue<string>;
  /** Sizes hint for next/image */
  sizes?: string;
  /** Pinned track: photo height comes from --offer-img-h so the tallest card always fits */
  fitMedia?: boolean;
};

export function OfferCard({ offer, imageX, sizes = "(min-width: 1024px) 360px, 84vw", fitMedia }: Props) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduce = useMediaQuery("(prefers-reduced-motion: reduce)");
  const animate = reduce || inView ? "show" : "hidden";

  return (
    <motion.article
      ref={ref}
      initial={reduce ? false : "hidden"}
      animate={animate}
      variants={card}
      aria-labelledby={`offer-${offer.id}`}
      className="flex h-full flex-col overflow-hidden rounded-[18px] bg-paper shadow-card"
    >
      <div
        className={cn(
          "relative shrink-0 overflow-hidden bg-charcoal",
          fitMedia ? "h-[var(--offer-img-h,255px)]" : "aspect-[4/3]",
        )}
      >
        <motion.div variants={settle} className="absolute inset-0">
          <motion.div style={{ x: imageX }} className="absolute inset-y-0 -inset-x-[7%]">
            <OfferPhoto offer={offer} sizes={sizes} />
          </motion.div>
        </motion.div>
        <div aria-hidden className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/35 to-black/0" />
        <span className="tabular absolute left-3.5 top-3.5 rounded-full bg-ivory px-2.5 py-1 text-[12px] font-semibold tracking-[0.06em] text-ink">
          {offer.number}
        </span>
        <span className="absolute right-3.5 top-3.5 rounded-full bg-ink/90 px-3 py-1 text-[12px] font-semibold uppercase tracking-[0.1em] text-champagne-soft">
          Save ₹{saving(offer)}
        </span>
      </div>

      <div className="offer-body flex flex-1 flex-col px-6 pb-6 pt-7">
        <motion.h3
          variants={rise}
          id={`offer-${offer.id}`}
          className="text-[21px] font-semibold leading-tight tracking-[-0.01em] text-ink"
        >
          {offer.name}
        </motion.h3>

        <motion.p variants={reveal} className="mt-3 flex items-baseline gap-3">
          <span className="sr-only">Offer price</span>
          <span className="tabular text-[36px] font-extrabold leading-none tracking-[-0.035em] text-price">
            ₹{offer.offerPrice}
          </span>
          <span className="sr-only">, regular price</span>
          <s className="tabular text-[16px] font-medium text-ink-muted decoration-ink-muted decoration-1">
            ₹{offer.actualPrice}
          </s>
        </motion.p>

        <motion.ul variants={rise} className="offer-list mt-6 flex-1 space-y-2 border-t border-line pt-5">
          {offer.services.map((s) => (
            <li key={s} className="flex gap-2.5 text-[14.5px] leading-[1.4] text-ink-soft">
              <Check aria-hidden className="mt-[3px] size-3.5 shrink-0 text-champagne" strokeWidth={2.2} />
              {s}
            </li>
          ))}
        </motion.ul>

        <motion.div variants={rise} className="offer-cta mt-7 flex items-center gap-2">
          <BookTrigger
            preset={`offer:${offer.id}`}
            aria-label={`Book the ${offer.name} package`}
            className={btn("ink", "sm", "h-11 flex-1")}
          >
            Book Now <Arrow className="size-3.5" />
          </BookTrigger>
          <a
            href={TEL}
            aria-label={`Call ${SITE.phoneDisplay} to book the ${offer.name} package`}
            className={btn("call", "sm", "h-11 px-4")}
          >
            <Phone aria-hidden className="size-4" strokeWidth={1.8} />
            Call
          </a>
        </motion.div>
      </div>
    </motion.article>
  );
}

/**
 * Normally a straight object-cover crop. With `focus.zoomOut`, the sharp photo is
 * shown smaller than the frame (more of the subject visible) and its own blurred
 * copy fills the sides, so the frame stays identical to every other card.
 */
function OfferPhoto({ offer, sizes }: { offer: Offer; sizes: string }) {
  const { focus } = offer;
  const zoom = focus.zoomOut;

  if (!zoom) {
    return (
      <Image
        src={offer.image}
        alt={offer.alt}
        fill
        sizes={sizes}
        className="object-cover"
        style={{
          objectPosition: focus.position,
          transform: focus.scale ? `scale(${focus.scale})` : undefined,
          transformOrigin: focus.origin,
        }}
      />
    );
  }

  return (
    <>
      <Image src={offer.image} alt="" aria-hidden fill sizes="96px" className="scale-125 object-cover blur-[22px]" />
      <div
        className="offer-zoom absolute"
        style={{
          height: `${100 / zoom.visible}%`,
          aspectRatio: String(zoom.aspect),
          top: `${(-100 * zoom.top) / zoom.visible}%`,
          left: `${zoom.x ?? 50}%`,
          transform: "translateX(-50%)",
        }}
      >
        <Image src={offer.image} alt={offer.alt} fill sizes={sizes} className="object-cover" />
      </div>
    </>
  );
}
