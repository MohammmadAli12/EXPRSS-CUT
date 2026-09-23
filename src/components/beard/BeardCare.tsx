import Image from "next/image";
import Link from "next/link";
import { BEARD_GUIDE_HREF, CARE_TIPS } from "@/data/beard";
import { Arrow, Eyebrow, btn } from "@/components/ui/button";
import { Reveal } from "@/components/motion/Reveal";

/** Care habits beside a close-up of the tools at work — the salon's own photograph. */
export function BeardCare() {
  return (
    <section aria-labelledby="beard-care-title" className="bg-ivory py-16 lg:py-24">
      <div className="shell grid items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <Reveal variant="clip" className="order-last lg:order-first">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[18px] bg-charcoal lg:aspect-[5/6]">
            <Image
              src="/images/services/beard-grooming.png"
              alt="Barber shaping a client's beard line with a trimmer during professional beard grooming"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover object-[58%_50%]"
            />
          </div>
        </Reveal>

        <Reveal>
          <Eyebrow>Beard care guide</Eyebrow>
          <h2
            id="beard-care-title"
            className="mt-4 font-display text-[clamp(2.1rem,3.8vw,3.1rem)] font-semibold leading-[1.02] tracking-[-0.015em]"
          >
            Keep It Healthy.
            <br />
            <em className="font-medium text-champagne">Keep It Sharp.</em>
          </h2>
          <p className="mt-5 max-w-[44ch] text-[16px] leading-[1.6] text-ink-soft">
            Simple grooming habits can help your beard look cleaner, healthier and more defined.
          </p>

          <ol className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2">
            {CARE_TIPS.map((tip, i) => (
              <li key={tip.title} className="border-t border-line pt-4">
                <p className="tabular text-[11.5px] font-semibold tracking-[0.14em] text-champagne">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 text-[16.5px] font-semibold leading-tight text-ink">{tip.title}</h3>
                <p className="mt-1.5 text-[14px] leading-[1.5] text-ink-soft">{tip.line}</p>
              </li>
            ))}
          </ol>

          <div className="mt-9">
            <Link href={BEARD_GUIDE_HREF} prefetch={false} className={btn("outline", "md")}>
              Read the Beard Guide <Arrow />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
