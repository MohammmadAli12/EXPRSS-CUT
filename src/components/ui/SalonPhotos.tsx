"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useInView } from "motion/react";
import { GALLERY } from "@/data/our-story";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/cn";
import { useLightbox } from "./Lightbox";

/** How long each photograph holds in the rotating frame */
const HOLD = 1000;

/**
 * The real salon photographs, in the two places they appear: the Our Story grid
 * and the homepage's single frame. Both open the same viewer, and both read the
 * same five pictures from src/data/our-story.ts.
 */
export function SalonGalleryGrid() {
  const { open, viewer } = useLightbox(GALLERY, "Inside Express Cuts Men's Salon");
  const [lead, ...rest] = GALLERY;

  const frame =
    "group relative block w-full overflow-hidden rounded-[18px] bg-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne";

  return (
    <>
      <div className="mt-9 grid gap-4 lg:grid-cols-[1.35fr_1fr] lg:gap-5">
        <button
          type="button"
          onClick={() => open(0)}
          aria-label={`Open full screen: ${lead.alt}`}
          className={cn(frame, "aspect-[16/11] lg:h-full")}
        >
          <Image
            src={lead.src}
            alt={lead.alt}
            fill
            sizes="(min-width: 1024px) 700px, 92vw"
            className="object-cover object-center transition-transform duration-[1200ms] ease-editorial group-hover:scale-[1.03]"
          />
        </button>

        <div className="grid grid-cols-2 gap-4 lg:gap-5">
          {rest.map((photo, i) => (
            <button
              key={photo.src}
              type="button"
              onClick={() => open(i + 1)}
              aria-label={`Open full screen: ${photo.alt}`}
              className={cn(frame, "aspect-[4/3]")}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 1024px) 260px, 46vw"
                className="object-cover transition-transform duration-[1200ms] ease-editorial group-hover:scale-[1.04]"
              />
            </button>
          ))}
        </div>
      </div>
      {viewer}
    </>
  );
}

/**
 * One frame, the same size it has always been, with the five photographs
 * crossfading inside it. It holds still for reduced motion, while off screen and
 * while the viewer is open; clicking it opens that viewer.
 */
export function SalonRotator({
  className,
  sizes = "(min-width: 1024px) 42vw, 100vw",
  caption,
}: {
  /** Classes for the frame itself — the host owns its size */
  className?: string;
  sizes?: string;
  caption?: React.ReactNode;
}) {
  const reduce = useMediaQuery("(prefers-reduced-motion: reduce)");
  const ref = useRef<HTMLButtonElement>(null);
  const inView = useInView(ref, { amount: 0.35 });
  const { open, isOpen, viewer } = useLightbox(GALLERY, "Inside Express Cuts Men's Salon");
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduce || !inView || isOpen) return;
    const id = setInterval(() => setActive((i) => (i + 1) % GALLERY.length), HOLD);
    return () => clearInterval(id);
  }, [reduce, inView, isOpen]);

  return (
    <>
      <button
        ref={ref}
        type="button"
        onClick={() => open(active)}
        aria-label={`Open full screen: ${GALLERY[active].alt}`}
        className={cn(
          "group relative block w-full overflow-hidden bg-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne",
          className,
        )}
      >
        {GALLERY.map((photo, i) => (
          <Image
            key={photo.src}
            src={photo.src}
            /* Only the photograph on show is described; the stack underneath is silent */
            alt={i === active ? photo.alt : ""}
            aria-hidden={i === active ? undefined : true}
            fill
            sizes={sizes}
            loading={i === 0 ? undefined : "lazy"}
            className={cn(
              "object-cover transition-opacity duration-500 ease-editorial",
              i === active ? "opacity-100" : "opacity-0",
            )}
          />
        ))}
        {caption}
      </button>
      {viewer}
    </>
  );
}
