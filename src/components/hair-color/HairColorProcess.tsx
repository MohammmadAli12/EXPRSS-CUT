import { ArrowRight } from "lucide-react";
import { COLOR_STEPS } from "@/data/hair-color";
import { Eyebrow } from "@/components/ui/button";
import { Reveal } from "@/components/motion/Reveal";
import { ScrollRail } from "@/components/motion/ScrollRail";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * The five colour stages in one line, as in the reference. Phones get one stage per
 * screen through ordinary vertical scrolling (ScrollRail), never a sideways scrollbar.
 */
export function HairColorProcess() {
  return (
    <section aria-labelledby="color-process-title" className="bg-ivory py-10 lg:py-12">
      <div className="shell">
        <Reveal>
          <Eyebrow>Professional Hair Color</Eyebrow>
          <h2
            id="color-process-title"
            className="mt-2.5 font-display text-[clamp(1.9rem,3.2vw,2.6rem)] font-semibold leading-[1.04] tracking-[-0.015em]"
          >
            Your Color, Our Process.
          </h2>
        </Reveal>

        <div className="relative mt-6 lg:mt-7">
          {/* ≥1024px: arrows in the gaps, over the rail (each item's reveal clip would cut them) */}
          <div aria-hidden className="pointer-events-none absolute inset-0 z-10 hidden grid-cols-5 gap-x-6 lg:grid">
            {COLOR_STEPS.slice(0, -1).map((s) => (
              <div key={s.title} className="relative">
                <ArrowRight className="absolute -right-[1.35rem] top-1/2 size-[18px] -translate-y-1/2 text-champagne" strokeWidth={1.5} />
              </div>
            ))}
          </div>

          <ScrollRail label="Hair colour process" gridClassName="sm:grid-cols-2 md:grid-cols-3 md:gap-5 lg:grid-cols-5 lg:gap-x-6">
            {COLOR_STEPS.map((s, i) => (
              <article key={s.title} className="flex h-full items-start gap-3.5 max-md:rounded-[14px] max-md:bg-paper max-md:p-5">
                <span className="tabular grid size-11 shrink-0 place-items-center rounded-full bg-champagne-soft/70 text-[14px] font-semibold text-ink">
                  {pad(i + 1)}
                </span>
                <div className="min-w-0 pt-1">
                  <h3 className="text-[15.5px] font-semibold leading-tight text-ink">{s.title}</h3>
                  <p className="mt-1 text-[13px] leading-snug text-ink-muted">{s.note}</p>
                </div>
              </article>
            ))}
          </ScrollRail>
        </div>
      </div>
    </section>
  );
}
