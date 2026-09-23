import Image from "next/image";
import { CUTS, type Cut } from "@/data/cuts";
import { Eyebrow } from "@/components/ui/button";
import { ScrollRail } from "@/components/motion/ScrollRail";
import { WaBtn2 } from "@/components/offer-card/actions";
import { waLink } from "@/lib/site";

export function CutsGallery() {
  return (
    <section id="cuts" aria-labelledby="cuts-title" className="bg-ivory pb-16 pt-20 lg:pb-20 lg:pt-24">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
          <div>
            <Eyebrow>The work speaks</Eyebrow>
            <h2
              id="cuts-title"
              className="mt-5 font-display text-[clamp(2.2rem,3.8vw,3.1rem)] font-semibold leading-[1.04] tracking-[-0.015em]"
            >
              Cuts Made For You<span className="text-champagne">.</span>
            </h2>
            <p className="mt-4 text-[17px] leading-snug text-ink-soft">
              Real styles. Real grooming. Made for you.
            </p>
          </div>
          <WaBtn2 size="md" href={waLink("Hi, I'd like to book a haircut at Express Cuts.")} />
        </div>

        <div className="mt-10 lg:mt-12">
          <ScrollRail label="Cuts and styles" gridClassName="sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
            {CUTS.map((c) => (
              <CutCard key={c.id} cut={c} />
            ))}
          </ScrollRail>
        </div>
      </div>
    </section>
  );
}

function CutCard({ cut: c }: { cut: Cut }) {
  return (
    <figure className="group flex h-full flex-col overflow-hidden rounded-[18px] border border-line bg-paper shadow-[0_1px_2px_rgb(18_17_16/0.04),0_18px_36px_-28px_rgb(18_17_16/0.3)]">
      <div className="relative aspect-[4/5] shrink-0 overflow-hidden bg-charcoal">
        <div className="absolute inset-0 transition-transform duration-[1400ms] ease-editorial group-hover:scale-[1.05]">
          <Image
            src={c.image}
            alt={c.alt}
            fill
            sizes="(min-width: 1280px) 210px, (min-width: 768px) 31vw, 92vw"
            className="object-cover"
            style={{
              objectPosition: c.focus.position,
              transform: c.focus.scale ? `scale(${c.focus.scale})` : undefined,
              transformOrigin: c.focus.origin,
            }}
          />
        </div>
      </div>
      <figcaption className="flex items-baseline gap-3 px-4 py-4 sm:px-5">
        <span className="tabular text-[12px] font-semibold tracking-[0.06em] text-ink-muted">{c.number}</span>
        <span className="text-[17px] font-semibold leading-tight text-ink">{c.label}</span>
      </figcaption>
    </figure>
  );
}
