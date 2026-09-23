import { FIT_FACTORS } from "@/data/beard";
import { Eyebrow } from "@/components/ui/button";
import { Reveal } from "@/components/motion/Reveal";
import { WaBtn2 } from "@/components/offer-card/actions";
import { waLink } from "@/lib/site";

/** Five things that shape the choice — guidance for picking a style, nothing clinical. */
export function BeardFit() {
  return (
    <section aria-labelledby="beard-fit-title" className="bg-cream py-16 lg:py-20">
      <div className="shell">
        <Reveal className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
          <div>
            <Eyebrow>Style guidance</Eyebrow>
            <h2
              id="beard-fit-title"
              className="mt-4 font-display text-[clamp(2rem,3.4vw,2.8rem)] font-semibold leading-[1.04] tracking-[-0.015em]"
            >
              Which Beard Suits You?
            </h2>
            <p className="mt-4 max-w-[52ch] text-[16px] leading-snug text-ink-soft">
              The right beard depends on a few things. Not sure? Your barber will talk it through before
              the first cut.
            </p>
          </div>
          <WaBtn2
            size="md"
            label="Ask Your Barber"
            context="about which beard style would suit me"
            href={waLink("Hi, I'd like to ask which beard style would suit my face.")}
          />
        </Reveal>

        <ol className="mt-10 grid border-t border-ink/15 sm:grid-cols-2 lg:mt-12 lg:grid-cols-5">
          {FIT_FACTORS.map((factor, i) => (
            <li
              key={factor.title}
              className="border-b border-ink/15 py-6 sm:pr-6 lg:border-b-0 lg:border-r lg:px-5 lg:py-7 lg:first:pl-0 lg:last:border-r-0"
            >
              <Reveal delay={i * 0.05}>
                <p className="font-display text-[28px] font-semibold leading-none text-champagne">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-4 text-[16px] font-semibold leading-tight text-ink">{factor.title}</h3>
                <p className="mt-2 text-[14px] leading-[1.5] text-ink-soft">{factor.line}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
