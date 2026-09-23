import Image from "next/image";
import { SITE, TEL } from "@/lib/site";
import { Reveal } from "@/components/motion/Reveal";
import { CallNow } from "@/components/ui/CallNow";

/** Compact dark close: the "Finish" portrait dissolving into the night ground, one call. */
export function HairSpaCTA() {
  return (
    <section id="book" aria-labelledby="spa-cta-title" className="on-dark relative isolate overflow-hidden bg-night text-ivory">
      <div className="relative h-[220px] sm:h-[280px] lg:absolute lg:inset-y-0 lg:left-0 lg:h-auto lg:w-[34%]">
        <Image
          src="/images/hair-spa/steps/finish.webp"
          alt=""
          aria-hidden
          fill
          sizes="(min-width: 1024px) 34vw, 100vw"
          className="object-cover object-[62%_30%]"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-night/10 via-night/30 to-night lg:bg-gradient-to-r lg:from-night/20 lg:via-night/45 lg:to-night" />
      </div>

      <div className="shell relative lg:flex lg:min-h-[330px] lg:items-center lg:justify-end">
        <Reveal className="-mt-12 pb-14 lg:mt-0 lg:w-[68%] lg:py-12 xl:flex xl:items-center xl:justify-between xl:gap-10">
          <div>
            <p className="eyebrow text-champagne-soft">Men&rsquo;s Hair Care · KR Puram</p>
            <h2
              id="spa-cta-title"
              className="mt-4 font-display text-[clamp(2.3rem,4vw,3.4rem)] font-semibold leading-[1] tracking-[-0.02em]"
            >
              Ready for <em className="font-medium text-champagne-soft">Better Hair?</em>
            </h2>
            <p className="mt-3 text-[16px] text-ivory-soft">Men&rsquo;s Hair Spa · Hair Treatment · Scalp Care</p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
              <CallNow className="w-full sm:w-auto" />
              <a
                href={TEL}
                tabIndex={-1}
                className="tabular text-center text-[15px] font-medium text-ivory-soft transition-colors hover:text-ivory sm:text-left"
              >
                {SITE.phoneDisplay}
              </a>
            </div>
          </div>

          <p aria-hidden className="hidden text-[12px] font-medium uppercase leading-[2.1] tracking-[0.32em] text-champagne-soft xl:block xl:shrink-0 xl:text-right">
            Good
            <br />
            Hair
            <br />
            Happier
            <br />
            You
            <span className="ml-auto mt-4 block h-px w-12 bg-champagne/70" />
          </p>
        </Reveal>
      </div>
    </section>
  );
}
