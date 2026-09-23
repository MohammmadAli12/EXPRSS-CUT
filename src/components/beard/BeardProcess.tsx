import { BEARD_PROCESS } from "@/data/beard";
import { Eyebrow } from "@/components/ui/button";
import { Reveal } from "@/components/motion/Reveal";

/** Four steps on one connecting rule — a sequence, not four boxes. */
export function BeardProcess() {
  return (
    <section aria-labelledby="beard-process-title" className="bg-cream py-16 lg:py-20">
      <div className="shell">
        <Reveal>
          <Eyebrow>Our process</Eyebrow>
          <h2
            id="beard-process-title"
            className="mt-4 font-display text-[clamp(2rem,3.4vw,2.8rem)] font-semibold leading-[1.04] tracking-[-0.015em]"
          >
            The Beard Grooming Experience<span className="text-champagne">.</span>
          </h2>
        </Reveal>

        <ol className="relative mt-10 grid gap-y-8 sm:grid-cols-2 sm:gap-x-8 lg:mt-14 lg:grid-cols-4">
          {/* Connecting rule through the step markers (desktop) */}
          <span aria-hidden className="absolute inset-x-0 top-[7px] hidden h-px bg-ink/15 lg:block" />
          {BEARD_PROCESS.map((step, i) => (
            <li key={step.number} className="relative">
              <Reveal delay={i * 0.07}>
                <span aria-hidden className="relative block size-[15px] rounded-full border-[1.5px] border-champagne bg-cream" />
                <p className="tabular mt-5 text-[12px] font-semibold tracking-[0.14em] text-ink-muted">{step.number}</p>
                <h3 className="mt-2 text-[18px] font-semibold leading-tight tracking-[-0.01em] text-ink">{step.title}</h3>
                <p className="mt-2 max-w-[28ch] text-[14.5px] leading-[1.55] text-ink-soft">{step.line}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
