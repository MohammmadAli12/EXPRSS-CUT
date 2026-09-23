import { SERVICE_CARDS } from "@/data/popular";
import { cn } from "@/lib/cn";
import { Arrow, Eyebrow, btn } from "@/components/ui/button";
import { OfferCard2 } from "@/components/offer-card/OfferCard2";
import { OFFER_CARD_FONTS } from "@/components/offer-card/fonts";
import { ScrollRail } from "@/components/motion/ScrollRail";

export function PopularServices() {
  return (
    <section
      id="popular"
      aria-labelledby="popular-title"
      className={cn(OFFER_CARD_FONTS, "bg-ivory pb-16 pt-20 lg:pb-20 lg:pt-24")}
    >
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
          <div>
            <Eyebrow>Popular services</Eyebrow>
            <h2
              id="popular-title"
              className="mt-5 font-display text-[clamp(2.2rem,3.8vw,3.1rem)] font-semibold leading-[1.04] tracking-[-0.015em]"
            >
              Quality Men&rsquo;s Grooming Services
            </h2>
            <p className="mt-4 text-[17px] leading-snug text-ink-soft">
              Professional care. Modern style. The right price.
            </p>
          </div>
          <a href="#services" className={btn("outline", "md")}>
            View All Services <Arrow />
          </a>
        </div>

        <div className="mt-10 lg:mt-12">
          <ScrollRail label="Popular services" gridClassName="md:grid-cols-3 md:gap-5 lg:gap-6">
            {SERVICE_CARDS.map((service) => (
              /* The approved offer card, with the service's own copy in place of
                 an inclusions list and no SAVE chip — no saving is published */
              <OfferCard2
                key={service.id}
                offer={service}
                showSaving={false}
                mediaCap="all"
                sizes="(min-width: 1280px) 400px, (min-width: 768px) 33vw, 92vw"
              />
            ))}
          </ScrollRail>
        </div>
      </div>
    </section>
  );
}
