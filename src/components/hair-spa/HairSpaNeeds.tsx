import Image from "next/image";
import { Check } from "lucide-react";
import { HAIR_NEEDS, KINGS_RITUAL, inr } from "@/data/hair-spa";
import { cn } from "@/lib/cn";
import { Eyebrow } from "@/components/ui/button";
import { Reveal } from "@/components/motion/Reveal";
import { CallNow } from "@/components/ui/CallNow";

/**
 * Hair concerns beside the one confirmed package with a hair spa. ≥1024px the two
 * share a row, as in the reference; below that they stack.
 */
export function HairSpaNeeds() {
  return (
    <section aria-label="Hair care for men and The King's Ritual offer" className="bg-ivory py-12 lg:py-14">
      <div className="shell grid gap-10 lg:grid-cols-[minmax(0,1.04fr)_minmax(0,1fr)] lg:items-stretch lg:gap-7">
        <Reveal className="flex flex-col">
          <Eyebrow>Hair Care for Men</Eyebrow>
          <h2
            id="spa-needs-title"
            className="mt-3 font-display text-[clamp(2rem,3.2vw,2.6rem)] font-semibold leading-[1.04] tracking-[-0.015em]"
          >
            What Does Your Hair Need?
          </h2>
          <ul aria-labelledby="spa-needs-title" className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-5">
            {HAIR_NEEDS.map((n, i) => {
              const last = i === HAIR_NEEDS.length - 1;
              return (
                <li
                  key={n.title}
                  className={cn(
                    "flex flex-col rounded-[14px] bg-cream/70 p-2 pb-3.5 text-center",
                    last && "col-span-2 sm:col-span-1",
                  )}
                >
                  <div
                    className={cn(
                      "relative overflow-hidden rounded-[10px] bg-[#ebe7e1]",
                      last ? "aspect-[2.2/1] sm:aspect-square" : "aspect-square",
                    )}
                  >
                    <Image src={n.src} alt={n.alt} fill sizes="(min-width: 1024px) 130px, (min-width: 640px) 30vw, 46vw" className="origin-bottom scale-[1.14] object-cover object-bottom" />
                  </div>
                  <h3 className="mt-3 px-1 text-[14px] font-semibold leading-tight tracking-[-0.01em] text-ink lg:text-[13.5px]">{n.title}</h3>
                  <p className="mt-1 px-1 text-[12.5px] leading-snug text-ink-muted">{n.note}</p>
                </li>
              );
            })}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <KingsRitualCard />
        </Reveal>
      </div>
    </section>
  );
}

function KingsRitualCard() {
  const k = KINGS_RITUAL;
  return (
    <article
      id="offer"
      aria-labelledby="spa-offer-title"
      className="on-dark relative isolate flex h-full flex-col overflow-hidden rounded-[18px] bg-night text-ivory shadow-card sm:flex-row"
    >
      {/* Portrait: zoomed onto the client's face so the salon's baked-in wall sign stays out of frame */}
      <div className="relative h-52 shrink-0 overflow-hidden sm:order-2 sm:h-auto sm:w-[36%]">
        <Image
          src={k.image}
          alt="Client relaxing in a robe during The King's Ritual grooming package at Express Cuts, KR Puram"
          fill
          sizes="(min-width: 1024px) 480px, (min-width: 640px) 72vw, 100vw"
          className="origin-[42%_12%] scale-[1.7] object-cover object-[42%_14%] sm:scale-[1.8]"
        />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-night/0 to-night sm:inset-y-0 sm:left-0 sm:right-auto sm:h-auto sm:w-1/3 sm:bg-gradient-to-l" />
      </div>

      <div className="relative -mt-10 flex flex-1 flex-col px-6 pb-6 sm:mt-0 sm:py-7 sm:pl-7 sm:pr-2">
        <p className="eyebrow text-[11px] text-champagne-soft">Featured Grooming Package</p>
        <h2 id="spa-offer-title" className="mt-2.5 font-display text-[clamp(1.9rem,2.8vw,2.3rem)] font-semibold leading-[1.02] tracking-[-0.015em]">
          {k.name}
        </h2>
        <p className="mt-1.5 text-[14.5px] text-ivory-soft">Complete Grooming. One Ritual.</p>

        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
          <p className="flex items-baseline gap-2.5">
            <span className="sr-only">Offer price</span>
            <span className="tabular text-[36px] font-extrabold leading-none tracking-[-0.035em] text-price-on-dark">{inr(k.offerPrice)}</span>
            <span className="sr-only">, regular price</span>
            <s className="tabular text-[16px] font-medium text-ivory-muted decoration-ivory-muted">{inr(k.actualPrice)}</s>
          </p>
          <span className="tabular inline-flex h-7 items-center rounded-full bg-champagne-soft px-3 text-[12.5px] font-bold uppercase tracking-[0.04em] text-ink">
            Save {inr(k.saving)}
          </span>
        </div>

        <p className="mt-4 text-[10.5px] font-semibold uppercase tracking-[0.26em] text-ivory-muted">Includes</p>
        <ul className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1.5">
          {k.services.map((s) => (
            <li key={s} className="flex items-center gap-2 text-[13.5px] leading-tight text-ivory-soft">
              <Check aria-hidden className="size-3.5 shrink-0 text-champagne-soft" strokeWidth={2.2} />
              {s}
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-5">
          <CallNow size="md" context={`about ${k.name}`} className="w-full sm:w-auto" />
        </div>
      </div>
    </article>
  );
}
