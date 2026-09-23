import Link from "next/link";
import { Check } from "lucide-react";
import { BRANDS, HYGIENE } from "@/data/our-story";
import { Arrow, Eyebrow, btn } from "@/components/ui/button";
import { Reveal } from "@/components/motion/Reveal";
import { SalonGalleryGrid } from "@/components/ui/SalonPhotos";

/** The hygiene promise beside the brands the salon uses — wordmarks, not invented logos. */
export function HygieneProducts() {
  return (
    <section aria-labelledby="story-hygiene-title" className="bg-ivory py-14 lg:py-16">
      <div className="shell grid gap-10 border-t border-line pt-12 lg:grid-cols-2 lg:gap-14 lg:pt-14">
        <Reveal>
          <Eyebrow>Our Hygiene Promise</Eyebrow>
          <h2
            id="story-hygiene-title"
            className="mt-4 font-display text-[clamp(1.8rem,2.8vw,2.4rem)] font-semibold leading-[1.08] tracking-[-0.015em]"
          >
            Clean Tools. A Better Experience.
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {HYGIENE.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-[14px] border border-line bg-paper px-4 py-3.5 text-[14px] leading-snug text-ink-soft"
              >
                <Check aria-hidden className="mt-[2px] size-4 shrink-0 text-champagne" strokeWidth={2.4} />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <Eyebrow>Professional Products</Eyebrow>
          <h2
            id="story-products-title"
            className="mt-4 font-display text-[clamp(1.8rem,2.8vw,2.4rem)] font-semibold leading-[1.08] tracking-[-0.015em]"
          >
            Products We Use.
          </h2>
          <ul aria-label="Professional brands used at Express Cuts" className="mt-6 flex flex-wrap gap-2.5">
            {BRANDS.map((brand) => (
              <li
                key={brand}
                className="flex h-12 items-center rounded-[12px] border border-line bg-paper px-5 text-[14.5px] font-semibold uppercase tracking-[0.1em] text-ink"
              >
                {brand}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[13.5px] leading-relaxed text-ink-muted">
            Professional ranges used across men&rsquo;s haircuts, beard grooming, facials, hair spa and hair color at our
            Ayyappa Nagar salon.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/**
 * The real salon, photographed: one large frame beside a stack of supporting shots.
 * Only the genuine photographs are used — the design reference file is never shipped.
 * Every frame opens the shared viewer (components/ui/Lightbox).
 */
export function SalonGallery() {
  return (
    <section id="salon" aria-labelledby="story-salon-title" className="bg-cream py-14 lg:py-16">
      <div className="shell">
        <Reveal className="max-w-[46ch]">
          <Eyebrow>Our Salon</Eyebrow>
          <h2
            id="story-salon-title"
            className="mt-4 font-display text-[clamp(2rem,3.4vw,2.9rem)] font-semibold leading-[1.06] tracking-[-0.018em]"
          >
            A Place Built for You.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
            Take a look inside Express Cuts Men&rsquo;s Salon in Ayyappa Nagar, KR Puram.
          </p>
          <Link href="/gallery" className={btn("outline", "sm", "mt-5")}>
            View the full gallery <Arrow className="size-3.5" />
          </Link>
        </Reveal>

        <SalonGalleryGrid />
      </div>
    </section>
  );
}
