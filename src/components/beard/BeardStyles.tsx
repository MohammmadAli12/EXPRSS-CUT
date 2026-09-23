"use client";

import Image from "next/image";
import { motion, type MotionValue } from "motion/react";
import { BEARD_STYLES, type BeardStyle } from "@/data/beard";
import { PinnedGallery } from "@/components/motion/PinnedGallery";
import { waLink } from "@/lib/site";
import { MessageCircle } from "lucide-react";

/** The page's strongest interaction, set on charcoal: the dark chapter begins here. */
export function BeardStyles() {
  return (
    <section aria-labelledby="beard-styles-title" className="on-dark bg-charcoal text-ivory">
      <PinnedGallery
        id="beard-styles-track"
        label="Beard styles"
        tone="dark"
        count={BEARD_STYLES.length}
        cardClassName="beard-card"
        gridClassName="sm:grid-cols-2 lg:grid-cols-3"
        header={<Header />}
        renderItem={({ index, imageX, eager }) => (
          <StyleCard style={BEARD_STYLES[index]} imageX={imageX} eager={eager} />
        )}
      />
    </section>
  );
}

function Header() {
  return (
    <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-3">
      <div>
        <p className="eyebrow text-champagne-soft">Beard styles</p>
        <h2
          id="beard-styles-title"
          className="mt-3 font-display text-[clamp(2rem,3.6vw,3rem)] font-semibold leading-[1.04] tracking-[-0.015em]"
        >
          Find Your Beard Style<span className="text-champagne">.</span>
        </h2>
      </div>
      <p className="max-w-[44ch] text-[14.5px] leading-snug text-ivory-soft sm:text-right sm:text-[15.5px]">
        From clean and classic to bold and modern, choose the look that fits you.
      </p>
    </div>
  );
}

function StyleCard({ style, imageX, eager }: { style: BeardStyle; imageX?: MotionValue<string>; eager: boolean }) {
  return (
    <figure className="group relative aspect-[4/5] overflow-hidden rounded-[18px] bg-night ring-1 ring-ivory/10 transition-shadow duration-500 ease-editorial hover:shadow-float">
      {/* Hover zoom and scroll drift live on separate frames — one inline transform would erase the other */}
      <div className="absolute inset-0 transition-transform duration-[1400ms] ease-editorial group-hover:scale-[1.05]">
        <motion.div style={{ x: imageX }} className="absolute inset-[-4%]">
          <Image
            src={style.image}
            alt={style.alt}
            fill
            sizes="(min-width: 1280px) 420px, (min-width: 768px) 32vw, 84vw"
            loading={eager ? "eager" : "lazy"}
            className="object-cover"
            style={{
              objectPosition: style.focus.position,
              transform: style.focus.scale ? `scale(${style.focus.scale})` : undefined,
              transformOrigin: style.focus.origin,
            }}
          />
        </motion.div>
      </div>

      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-night/90 via-night/45 to-transparent"
      />

      <figcaption className="absolute inset-x-0 bottom-0 flex items-end gap-4 p-5">
        <div className="min-w-0 flex-1">
          <p className="tabular text-[11px] font-semibold tracking-[0.14em] text-champagne-soft">{style.number}</p>
          <h3 className="mt-1.5 text-[18px] font-semibold leading-tight text-ivory">{style.name}</h3>
          <p className="mt-1 text-[13px] leading-snug text-ivory-soft">{style.descriptor}</p>
        </div>
        <a
          href={waLink(`Hi, I'd like a beard grooming for the ${style.name} look.`)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Message Express Cuts on WhatsApp about the ${style.name} beard look`}
          className="grid size-10 shrink-0 place-items-center rounded-full border border-ivory/35 text-ivory transition-colors duration-300 hover:border-ivory hover:bg-ivory hover:text-ink"
        >
          <MessageCircle aria-hidden className="size-4" strokeWidth={1.8} />
        </a>
      </figcaption>
    </figure>
  );
}
