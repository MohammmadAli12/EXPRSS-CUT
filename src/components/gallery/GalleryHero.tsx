import Image from "next/image";
import { GALLERY_HERO } from "@/data/gallery";

/**
 * The room you walk into, full width under the navigation, with the copy on the
 * ink wash over its left. One h1 — what it says aloud is what the page is.
 */
export function GalleryHero() {
  return (
    <section aria-labelledby="gallery-title" className="relative isolate overflow-hidden bg-charcoal">
      <div className="relative h-[clamp(320px,44vh,460px)] w-full">
        <Image
          src={GALLERY_HERO.src}
          alt={GALLERY_HERO.alt}
          fill
          priority
          sizes="100vw"
          quality={85}
          className="object-cover object-[68%_50%]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(90deg,rgb(15_14_13/0.92)_0%,rgb(15_14_13/0.76)_34%,rgb(15_14_13/0.15)_62%,rgb(15_14_13/0)_82%)]"
        />
        {/* Narrow screens crop into the photograph, so the type gets more ground */}
        <div aria-hidden className="absolute inset-0 bg-night/45 sm:hidden" />

        <div className="pl-shell relative flex h-full max-w-[42rem] flex-col justify-center py-10 pr-6">
          <p className="eyebrow text-champagne">Gallery</p>
          <h1
            id="gallery-title"
            className="mt-4 font-display text-[clamp(2.4rem,5vw,3.9rem)] font-semibold leading-[0.98] tracking-[-0.02em] text-ivory"
          >
            Inside
            <br />
            <em className="font-medium text-champagne-soft">Express Cuts.</em>
            <span className="sr-only"> — Men&rsquo;s Salon Gallery in KR Puram</span>
          </h1>
          <p className="mt-4 text-[15.5px] text-ivory-soft">Men&rsquo;s Salon · KR Puram · Bengaluru</p>
          <span aria-hidden className="mt-7 block h-px w-12 bg-champagne" />
          <p aria-hidden className="mt-3.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-ivory-muted">
            Real space. Real style.
          </p>
        </div>
      </div>
    </section>
  );
}
