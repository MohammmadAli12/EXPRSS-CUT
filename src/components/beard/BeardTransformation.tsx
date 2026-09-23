import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { WaBtn2 } from "@/components/offer-card/actions";
import { waLink } from "@/lib/site";

/**
 * The supplied file is already a finished before/after diptych with its own
 * divider, so it is shown whole — never split. Labels sit in each half's top
 * corner, clear of the subject. The frame trims the bottom of the source, which
 * carries another brand's cape logo.
 */
export function BeardTransformation() {
  return (
    <section aria-labelledby="beard-difference-title" className="on-dark bg-night py-16 text-ivory lg:py-24">
      <div className="shell grid items-center gap-10 lg:grid-cols-[1fr_1.55fr] lg:gap-16">
        <Reveal>
          <p className="eyebrow text-champagne-soft">Before &amp; after</p>
          <h2
            id="beard-difference-title"
            className="mt-4 font-display text-[clamp(2rem,3.6vw,3rem)] font-semibold uppercase leading-[1.02] tracking-[-0.01em]"
          >
            The Difference
            <br />
            Is in the <em className="font-medium normal-case text-champagne-soft">Detail.</em>
          </h2>
          <p className="mt-5 max-w-[36ch] text-[16.5px] leading-[1.55] text-ivory-soft">
            A precise trim can change the entire look.
          </p>
          <div className="mt-8">
            <WaBtn2
              size="lg"
              label="Get Your Beard Groomed"
              context="about a beard grooming"
              href={waLink("Hi, I'd like to book a beard trim at Express Cuts.")}
            />
          </div>
        </Reveal>

        <Reveal variant="clip" delay={0.05}>
          <figure className="relative aspect-[1429/980] overflow-hidden rounded-[18px] bg-charcoal">
            <Image
              src="/images/beard/before-after.png"
              alt="Before and after a professional beard trim and line-up: a full, untidy beard reshaped into a clean, defined beard"
              fill
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="object-cover object-top"
            />
            <figcaption className="pointer-events-none absolute inset-x-0 top-0 grid grid-cols-2">
              <span className="m-3 w-fit rounded-full bg-night/75 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-ivory sm:m-4">
                Before
              </span>
              <span className="m-3 w-fit rounded-full bg-ivory px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink sm:m-4">
                After
              </span>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
