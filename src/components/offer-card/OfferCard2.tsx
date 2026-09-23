"use client";

import Image from "next/image";
import { motion, type Variants } from "motion/react";
import { Check } from "lucide-react";
import { inr2, priceLabel2, waFor2, type Offer2 } from "@/data/offers-2";
import { cn } from "@/lib/cn";
import { CallBtn2, WaBtn2 } from "./actions";

const EASE = [0.22, 1, 0.36, 1] as const;

/* Same entrance order as Offer Page 1: card lands, photo settles, then name, price, list, CTAs */
export const card2Variants: Variants = {
  hidden: { opacity: 0.001, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE, staggerChildren: 0.09, delayChildren: 0.06 } },
};
export const settle: Variants = { hidden: { scale: 1.1 }, show: { scale: 1, transition: { duration: 1.4, ease: EASE } } };
export const rise: Variants = {
  hidden: { opacity: 0.001, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

/**
 * An offer card's content: Offer Page 2's data, plus what a host page adds —
 * a numbered chip, prose instead of an inclusions list, and a tighter crop for
 * photographs that need one.
 */
export type OfferCardItem = Omit<Offer2, "includes"> & {
  /** What the offer includes, ticked off one per line */
  includes?: string[];
  /** Shown in the inclusions' place, for a service that describes itself instead */
  description?: string[];
  /** Chip over the photograph, e.g. "01" — the homepage track numbers its cards */
  number?: string;
  /** Extra zoom where object-position alone cannot keep the subject in frame */
  scale?: number;
  origin?: string;
};

function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "absolute top-3 rounded-[6px] bg-[#1a1612]/90 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.08em] text-[#e6c79a] backdrop-blur-[2px]",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Price({
  offer,
  big,
  showSaving = true,
}: {
  offer: Pick<Offer2, "price" | "wasPrice" | "priceNote">;
  big?: boolean;
  /** Off where no saving is published — the regular price still shows */
  showSaving?: boolean;
}) {
  const saving = offer.wasPrice ? offer.wasPrice - offer.price : 0;
  return (
    <motion.p variants={rise} className="mt-2.5 flex flex-wrap items-baseline gap-x-2.5 gap-y-2">
      <span className="sr-only">Offer price</span>
      <span
        className={cn(
          "tabular font-extrabold leading-none tracking-[-0.03em] text-[#d91f1f]",
          big ? "text-[clamp(32px,3.4vw,40px)]" : "text-[clamp(26px,2.2vw,32px)]",
        )}
      >
        {offer.priceNote && (
          <span className="mr-1.5 align-middle text-[14px] font-semibold text-[#4a423b]">{offer.priceNote}</span>
        )}
        {inr2(offer.price)}
      </span>
      {offer.wasPrice && (
        <>
          <span className="sr-only">, regular price</span>
          <s className="tabular text-[14.5px] font-medium text-[#8d847b] decoration-[#8d847b]">{inr2(offer.wasPrice)}</s>
          {showSaving && (
            <span className="tabular rounded-[5px] bg-[#f1dfc3] px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.04em] text-[#6b4a28]">
              Save {inr2(saving)}
            </span>
          )}
        </>
      )}
    </motion.p>
  );
}

/** Prose in the inclusions' place — same type, no ticks, since nothing is being listed */
export function Description({ lines }: { lines: string[] }) {
  return (
    <motion.div variants={rise} className="mt-3 space-y-1.5">
      {lines.map((line) => (
        <p key={line} className="text-[13px] leading-[1.35] text-[#4a423b]">
          {line}
        </p>
      ))}
    </motion.div>
  );
}

export function Includes({ items, columns }: { items: string[]; columns: boolean }) {
  return (
    <motion.ul variants={rise} className={cn("mt-3 gap-x-6 gap-y-1.5", columns ? "grid grid-cols-2" : "space-y-1.5")}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2 text-[13px] leading-[1.35] text-[#4a423b]">
          <Check aria-hidden className="mt-[3px] size-3 shrink-0 text-[#b0834f]" strokeWidth={2.8} />
          {item}
        </li>
      ))}
    </motion.ul>
  );
}

/**
 * One offer card, drawn from the Offer Page 2 design: inset 4:3 photograph,
 * serif name, red price with the gold SAVE chip, gold ticks, and the two actions.
 * This is the only offer card — Offer Page 2 and the homepage both render it, so
 * they can never drift apart.
 *
 * The photograph is capped by `--offer2-img-max`, which the pinned stage measures,
 * so the buttons are never pushed out of the frame. `mediaCap` says where that cap
 * applies: from 1024px (Offer Page 2, whose phone layout gives the photo its full
 * 4:3) or at every width, where a pinned host sets it (the homepage tracks); with
 * no host to set it the photograph simply keeps its 4:3.
 */
export function OfferCard2({
  offer,
  sizes = "(min-width: 1024px) 460px, 88vw",
  mediaCap = "lg",
  showSaving = true,
}: {
  offer: OfferCardItem;
  sizes?: string;
  mediaCap?: "lg" | "all";
  /** Off where no saving is published (the homepage services) */
  showSaving?: boolean;
}) {
  return (
    <motion.article
      variants={card2Variants}
      aria-labelledby={`o2-${offer.id}`}
      className="flex h-full flex-col rounded-[12px] bg-white p-3 font-[family-name:var(--font-o2-sans)] shadow-[0_18px_34px_-22px_rgb(0_0_0/0.6)]"
    >
      <div
        className={cn(
          "relative aspect-[4/3] w-full overflow-hidden rounded-[9px] bg-[#1a1612]",
          mediaCap === "all" ? "max-h-[var(--offer2-img-max,none)]" : "max-lg:max-h-none lg:max-h-[var(--offer2-img-max,280px)]",
        )}
      >
        <motion.div variants={settle} className="absolute inset-0">
          <Image
            src={offer.image}
            alt={offer.alt}
            fill
            loading="lazy"
            sizes={sizes}
            className="object-cover"
            style={{
              objectPosition: offer.position,
              transform: offer.scale ? `scale(${offer.scale})` : undefined,
              transformOrigin: offer.origin,
            }}
          />
        </motion.div>
        {offer.number && (
          <Badge className="tabular left-3 tracking-[0.06em]">{offer.number}</Badge>
        )}
        {offer.badge && <Badge className="right-3">{offer.badge}</Badge>}
      </div>

      <div className="flex flex-1 flex-col px-1.5 pb-1 pt-3.5">
        <motion.h3
          variants={rise}
          id={`o2-${offer.id}`}
          className="font-[family-name:var(--font-o2-serif)] text-[clamp(17px,1.5vw,20px)] font-semibold leading-tight text-[#1a1612]"
        >
          {offer.name}
        </motion.h3>

        <Price offer={offer} showSaving={showSaving} />
        {offer.includes?.length ? (
          <Includes items={offer.includes} columns={offer.includes.length > 4} />
        ) : (
          offer.description?.length ? <Description lines={offer.description} /> : null
        )}

        <motion.div variants={rise} className="mt-auto grid grid-cols-2 gap-2.5 pt-4">
          <CallBtn2 size="sm" label="Call" context={`about the ${offer.name}`} />
          <WaBtn2 size="sm" href={waFor2(offer)} context={`about the ${offer.name}`} />
        </motion.div>
      </div>
      <span className="sr-only">{priceLabel2(offer)}</span>
    </motion.article>
  );
}
