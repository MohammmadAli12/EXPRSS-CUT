"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Crown } from "lucide-react";
import { waFor2, KINGS_CHAIN, type Offer2 } from "@/data/offers-2";
import { CallBtn2, WaBtn2 } from "@/components/offer-card/actions";
import { Includes, Price, card2Variants, rise, settle } from "@/components/offer-card/OfferCard2";

/** The offer card itself is shared with the homepage — see components/offer-card */
export { OfferCard2 as Card2 } from "@/components/offer-card/OfferCard2";

/** The King's Ritual: photograph left, content right, with the service chain beside it. */
export function KingsCard2({ offer }: { offer: Offer2 }) {
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-stretch lg:gap-8">
      <motion.article
        variants={card2Variants}
        aria-labelledby={`o2-${offer.id}`}
        className="flex flex-1 flex-col gap-0 rounded-[12px] bg-white p-3 shadow-[0_22px_44px_-24px_rgb(0_0_0/0.75)] sm:flex-row sm:gap-4"
      >
        <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-[9px] bg-[#1a1612] sm:aspect-auto sm:w-[46%]">
          <motion.div variants={settle} className="absolute inset-0">
            <Image
              src={offer.image}
              alt={offer.alt}
              fill
              loading="lazy"
              sizes="(min-width: 1024px) 420px, 92vw"
              className="object-cover"
              style={{ objectPosition: offer.position }}
            />
          </motion.div>
        </div>

        <div className="flex flex-1 flex-col px-1.5 pb-1 pt-4 sm:py-3 sm:pr-3">
          {offer.badge && (
            <motion.span
              variants={rise}
              className="w-fit rounded-[5px] bg-[#f1dfc3] px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.08em] text-[#6b4a28]"
            >
              {offer.badge}
            </motion.span>
          )}
          <motion.h3
            variants={rise}
            id={`o2-${offer.id}`}
            className="mt-2.5 font-[family-name:var(--font-o2-serif)] text-[clamp(20px,2.2vw,26px)] font-semibold leading-tight text-[#1a1612]"
          >
            {offer.name}
          </motion.h3>
          <Price offer={offer} big />
          <Includes items={offer.includes} columns />
          <motion.div variants={rise} className="mt-auto flex flex-wrap gap-2.5 pt-5">
            <CallBtn2 context={`about the ${offer.name}`} />
            <WaBtn2 href={waFor2(offer)} context={`about the ${offer.name}`} />
          </motion.div>
        </div>
      </motion.article>

      <motion.p
        aria-hidden
        variants={rise}
        className="flex shrink-0 flex-row flex-wrap items-center gap-x-3 gap-y-1 self-center text-[11px] font-semibold uppercase tracking-[0.26em] text-[#d4b489] lg:w-[150px] lg:flex-col lg:items-end lg:gap-2 lg:text-right"
      >
        <Crown aria-hidden className="size-6 text-[#d4b489] lg:mb-2" strokeWidth={1.5} />
        {KINGS_CHAIN.map((word) => (
          <span key={word}>{word} ·</span>
        ))}
      </motion.p>
    </div>
  );
}
