import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { HAIR_SPA_STEPS } from "@/data/hair-spa";
import { Eyebrow } from "@/components/ui/button";
import { Reveal } from "@/components/motion/Reveal";
import { ScrollRail } from "@/components/motion/ScrollRail";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Five stages. ≥1024px: all five across with arrows between them. 768–1023px: a
 * 3 + 2 grid. Phones: ScrollRail pins the row and plain vertical scrolling brings
 * each step in turn — no swipe, no horizontally scrollable box.
 */
export function HairSpaProcess() {
  return (
    <section id="services" aria-labelledby="spa-process-title" className="bg-hero py-12 lg:py-14">
      <div className="shell">
        <Reveal>
          <Eyebrow>Hair Spa Process</Eyebrow>
          <h2
            id="spa-process-title"
            className="mt-3 font-display text-[clamp(2rem,3.4vw,2.8rem)] font-semibold leading-[1.04] tracking-[-0.015em]"
          >
            Your Hair Spa Experience
          </h2>
        </Reveal>

        <div className="relative mt-7 lg:mt-8">
          {/* ≥1024px: arrows in the gaps, drawn over the rail (the items' reveal clip would cut them off) */}
          <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-10 hidden grid-cols-5 gap-x-12 lg:grid">
            {HAIR_SPA_STEPS.slice(0, -1).map((s) => (
              <div key={s.title} className="relative aspect-[3/2]">
                <ArrowRight className="absolute -right-[2.05rem] top-1/2 size-5 -translate-y-1/2 text-ink" strokeWidth={1.4} />
              </div>
            ))}
          </div>
          <ScrollRail label="Hair spa steps" gridClassName="md:grid-cols-3 md:gap-x-5 md:gap-y-8 lg:grid-cols-5 lg:gap-x-12">
            {HAIR_SPA_STEPS.map((s, i) => (
              <article key={s.title} className="h-full">
                <div className="relative aspect-[3/2] overflow-hidden rounded-[14px] bg-charcoal">
                  <Image src={s.src} alt={s.alt} fill sizes="(min-width: 1024px) 230px, (min-width: 768px) 30vw, 88vw" className="object-cover" />
                </div>
                <div className="mt-3 flex items-start gap-3">
                  <span className="tabular grid size-9 shrink-0 place-items-center rounded-full bg-champagne-soft text-[13px] font-semibold text-ink">
                    {pad(i + 1)}
                  </span>
                  <div className="min-w-0 pt-0.5">
                    <h3 className="text-[16px] font-semibold leading-tight text-ink">{s.title}</h3>
                    <p className="mt-1 text-[13px] leading-snug text-ink-muted">{s.note}</p>
                  </div>
                </div>
              </article>
            ))}
          </ScrollRail>
        </div>
      </div>
    </section>
  );
}
