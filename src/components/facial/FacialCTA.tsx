import Image from "next/image";
import { Phone } from "lucide-react";
import { SITE, TEL, waLink } from "@/lib/site";
import { btn } from "@/components/ui/button";
import { Reveal } from "@/components/motion/Reveal";
import { WaBtn2 } from "@/components/offer-card/actions";

/** Final scene: the Hydra Facial photograph glowing out of the dark behind the last ask. */
export function FacialCTA() {
  return (
    <section id="book" aria-labelledby="facial-book-title" className="on-dark relative isolate overflow-hidden bg-night text-ivory">
      <div className="relative h-[300px] sm:h-[380px] lg:absolute lg:inset-y-0 lg:left-0 lg:h-auto lg:w-[52%]">
        <Image
          src="/images/offers/hydra-facial.png"
          alt=""
          aria-hidden
          fill
          sizes="(min-width: 1024px) 52vw, 100vw"
          className="object-cover object-[38%_46%]"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-night/10 via-night/20 to-night lg:bg-gradient-to-r lg:from-night/25 lg:via-night/40 lg:to-night" />
      </div>

      <div className="shell relative lg:flex lg:min-h-[480px] lg:items-center lg:justify-end">
        <Reveal className="-mt-16 pb-20 lg:mt-0 lg:w-[56%] lg:py-20 xl:flex xl:items-end xl:justify-between xl:gap-10">
          <div className="max-w-[560px]">
            <p className="eyebrow text-champagne-soft">Book your facial</p>
            <h2
              id="facial-book-title"
              className="mt-5 font-display text-[clamp(2.5rem,4.6vw,4rem)] font-semibold leading-[1] tracking-[-0.02em]"
            >
              Ready for a <em className="font-medium text-champagne-soft">Fresher Look?</em>
            </h2>
            <p className="mt-5 text-[17px] leading-relaxed text-ivory-soft">Give your skin the attention it deserves.</p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <WaBtn2 size="lg" href={waLink("Hi, I'd like to book a men's facial at Express Cuts.")} />
              <a href={TEL} className={btn("outline-light", "lg", "tabular")}>
                <Phone aria-hidden className="size-4" strokeWidth={1.6} />
                Call {SITE.phoneDisplay}
              </a>
            </div>
          </div>

          <p aria-hidden className="mt-12 hidden text-[12px] font-medium uppercase leading-[2.1] tracking-[0.32em] text-champagne-soft xl:mt-0 xl:block xl:shrink-0 xl:pb-2 xl:text-right">
            Cleaner skin.
            <br />A stronger you.
            <span className="ml-auto mt-4 block h-px w-12 bg-champagne/70" />
          </p>
        </Reveal>
      </div>
    </section>
  );
}
