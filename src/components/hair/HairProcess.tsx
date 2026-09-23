import { PROCESS_STEPS } from "@/data/hair";
import { Eyebrow } from "@/components/ui/button";
import { Reveal } from "@/components/motion/Reveal";

/** Four steps, stated plainly — rules and numerals only, no cards. */
export function HairProcess() {
  return (
    <section aria-labelledby="process-title" className="bg-cream py-16 lg:py-20">
      <div className="shell">
        <Reveal>
          <Eyebrow>Our process</Eyebrow>
          <h2
            id="process-title"
            className="mt-5 font-display text-[clamp(2rem,3.4vw,2.8rem)] font-semibold leading-[1.05] tracking-[-0.015em]"
          >
            A Better Haircut Experience<span className="text-champagne">.</span>
          </h2>
        </Reveal>

        <ol className="mt-10 grid gap-x-8 gap-y-9 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">
          {PROCESS_STEPS.map((step, i) => (
            <Reveal key={step.number} delay={i * 0.06}>
              <li className="border-t border-line pt-5">
                <p className="tabular text-[12px] font-semibold tracking-[0.14em] text-ink-muted">
                  {step.number}
                </p>
                <h3 className="mt-3 text-[18px] font-semibold leading-tight tracking-[-0.01em] text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-[30ch] text-[14.5px] leading-[1.55] text-ink-soft">
                  {step.line}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
