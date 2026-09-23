"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { GALLERY_FILTERS, GALLERY_PHOTOS, type GalleryCategory } from "@/data/gallery";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/cn";
import { useLightbox } from "@/components/ui/Lightbox";

const EASE = [0.22, 1, 0.36, 1] as const;

/* The reference's rhythm: nine frames, three to a row, none the same width */
const SPAN = [
  "lg:col-span-5 lg:h-[300px]",
  "lg:col-span-3 lg:h-[300px]",
  "lg:col-span-4 lg:h-[300px]",
  "lg:col-span-4 lg:h-[280px]",
  "lg:col-span-4 lg:h-[280px]",
  "lg:col-span-4 lg:h-[280px]",
  "lg:col-span-4 lg:h-[290px]",
  "lg:col-span-3 lg:h-[290px]",
  "lg:col-span-5 lg:h-[290px]",
];

/**
 * The lookbook: a quiet filter row, then the photographs. Every frame opens the
 * shared viewer (components/ui/Lightbox), which carries the arrows, the counter
 * and the keyboard.
 */
export function GalleryGrid() {
  const [filter, setFilter] = useState<(typeof GALLERY_FILTERS)[number]>("All Photos");
  const reduce = useMediaQuery("(prefers-reduced-motion: reduce)");

  const photos =
    filter === "All Photos" ? GALLERY_PHOTOS : GALLERY_PHOTOS.filter((p) => p.category === (filter as GalleryCategory));
  const { open, viewer } = useLightbox(photos, "Inside Express Cuts Men's Salon");

  return (
    <section id="gallery" aria-labelledby="gallery-grid-title" className="bg-ivory pb-16 pt-12 lg:pb-20 lg:pt-14">
      <div className="shell">
        <h2 id="gallery-grid-title" className="sr-only">
          Photographs of Express Cuts Men&rsquo;s Salon
        </h2>

        <div className="flex flex-wrap items-start justify-between gap-x-10 gap-y-5">
          <div role="tablist" aria-label="Filter photographs" className="flex flex-wrap items-center gap-1.5">
            {GALLERY_FILTERS.map((name) => {
              const on = name === filter;
              return (
                <button
                  key={name}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => setFilter(name)}
                  className={cn(
                    "rounded-full px-4 py-2 text-[13.5px] font-medium transition-colors duration-300 ease-editorial",
                    on ? "bg-ink text-ivory" : "text-ink-soft hover:bg-cream hover:text-ink",
                  )}
                >
                  {name}
                </button>
              );
            })}
          </div>

          <p aria-hidden className="text-[11px] font-semibold uppercase leading-[1.9] tracking-[0.22em] text-ink-muted sm:text-right">
            A closer look at
            <br />
            what makes us different.
          </p>
        </div>

        <motion.ul
          layout={!reduce}
          className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:gap-5"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {photos.map((photo, i) => (
              <motion.li
                key={photo.src}
                layout={!reduce}
                initial={reduce ? false : { opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.4, ease: EASE }}
                className={cn("min-w-0", SPAN[i % SPAN.length])}
              >
                <button
                  type="button"
                  onClick={() => open(i)}
                  aria-label={`Open full screen: ${photo.alt}`}
                  className="group relative block h-full w-full overflow-hidden rounded-[16px] bg-charcoal max-lg:aspect-[4/3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne"
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(min-width: 1024px) 34vw, (min-width: 640px) 46vw, 92vw"
                    loading={i < 3 ? undefined : "lazy"}
                    className="object-cover transition-transform duration-[1200ms] ease-editorial group-hover:scale-[1.04]"
                  />
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>
      {viewer}
    </section>
  );
}
