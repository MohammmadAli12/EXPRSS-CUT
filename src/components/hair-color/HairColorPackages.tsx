import Image from "next/image";
import { Check } from "lucide-react";
import { COLOR_PACKAGES, inr } from "@/data/hair-color";
import { Eyebrow } from "@/components/ui/button";
import { Reveal } from "@/components/motion/Reveal";
import { ScrollRail } from "@/components/motion/ScrollRail";
import { CallNow } from "@/components/ui/CallNow";

/**
 * The dark close from the reference: the section title on the left, three package
 * cards on the right, each with its colour photograph set into the card. These are
 * complete grooming packages that include hair colour — never a colour-only price.
 * Phones show one card per screen through vertical scrolling.
 */
export function HairColorPackages() {
  return (
    <section
      id="offers"
      aria-labelledby="color-packages-title"
      data-offers-zone
      className="on-dark bg-night py-12 text-ivory lg:py-14"
    >
      <div className="shell grid gap-8 lg:grid-cols-[minmax(300px,0.92fr)_minmax(0,2.5fr)] lg:items-center lg:gap-10">
        <Reveal>
          <Eyebrow className="text-champagne">Featured Hair Color Packages</Eyebrow>
          <h2
            id="color-packages-title"
            className="mt-3 font-display text-[clamp(1.8rem,2.9vw,2.4rem)] font-semibold leading-[1.04] tracking-[-0.015em]"
          >
            Color + Complete Grooming.
          </h2>
          <span aria-hidden className="mt-5 block h-px w-full max-w-[380px] bg-ivory/15" />
          <p className="mt-5 text-[15px] font-semibold text-ivory">Packages Including Hair Color</p>
          <p className="mt-2 max-w-[38ch] text-[13.5px] leading-relaxed text-ivory-muted">
            Hair color is included as part of the complete grooming packages.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="min-w-0">
          <ScrollRail label="Grooming packages that include hair colour" tone="dark" gridClassName="md:grid-cols-3 md:gap-4">
            {COLOR_PACKAGES.map((p) => (
              <article
                key={p.id}
                aria-labelledby={`color-package-${p.id}`}
                className="flex h-full flex-col overflow-hidden rounded-[14px] bg-charcoal sm:flex-row"
              >
                <div className="relative h-44 w-full shrink-0 overflow-hidden bg-night sm:h-auto sm:w-[32%]">
                  <Image
                    src={p.photo}
                    alt={p.photoAlt}
                    fill
                    sizes="(min-width: 1024px) 160px, (min-width: 768px) 14vw, 32vw"
                    className="object-cover"
                    style={{ objectPosition: p.position }}
                  />
                  <div aria-hidden className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-charcoal to-charcoal/0 sm:inset-y-0 sm:left-auto sm:right-0 sm:h-auto sm:w-2/5 sm:bg-gradient-to-l" />
                </div>

                <div className="relative -mt-8 flex min-w-0 flex-1 flex-col p-4 sm:mt-0 sm:p-4.5">
                  <h3 id={`color-package-${p.id}`} className="text-[15px] font-semibold leading-snug tracking-[-0.01em] text-ivory">
                    {p.label}
                  </h3>

                  <div className="mt-2 flex flex-wrap items-baseline gap-x-2.5 gap-y-1.5">
                    <span className="sr-only">Package price</span>
                    <span className="tabular text-[26px] font-extrabold leading-none tracking-[-0.03em] text-price-on-dark">
                      {inr(p.offerPrice)}
                    </span>
                    <span className="sr-only">, regular price</span>
                    <s className="tabular text-[14px] font-medium text-ivory-muted decoration-ivory-muted">{inr(p.actualPrice)}</s>
                    <span className="tabular inline-flex h-6 items-center rounded-full bg-champagne-soft px-2.5 text-[11px] font-bold uppercase tracking-[0.05em] text-ink">
                      Save {inr(p.actualPrice - p.offerPrice)}
                    </span>
                  </div>

                  <ul className="mt-3 space-y-1">
                    {p.services.map((s) => (
                      <li key={s} className="flex items-start gap-2 text-[12.5px] leading-[1.35] text-ivory-soft">
                        <Check aria-hidden className="mt-[2px] size-3 shrink-0 text-champagne-soft" strokeWidth={2.4} />
                        {s}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-4">
                    <CallNow size="sm" context={`about the ${p.label} package`} className="w-full" />
                  </div>
                </div>
              </article>
            ))}
          </ScrollRail>
        </Reveal>
      </div>
    </section>
  );
}
