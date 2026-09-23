import Image from "next/image";
import { Phone } from "lucide-react";
import { SITE, TEL, waLink } from "@/lib/site";
import { btn } from "@/components/ui/button";
import { Reveal } from "@/components/motion/Reveal";
import { WaBtn2 } from "@/components/offer-card/actions";

/** Cinematic close: the photograph goes dark and the page asks for the booking. */
export function HairCTA() {
  return (
    <section
      id="book"
      aria-labelledby="hair-book-title"
      className="on-dark relative isolate overflow-hidden bg-night text-ivory"
    >
      <Image
        src="/images/hair/hero.png"
        alt=""
        aria-hidden
        fill
        sizes="100vw"
        className="object-cover object-[64%_24%] opacity-[0.28]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-night/85 via-night/75 to-night"
      />

      <div className="shell relative py-20 text-center lg:py-28">
        <Reveal className="mx-auto max-w-[640px]">
          <h2
            id="hair-book-title"
            className="font-display text-[clamp(2.6rem,5vw,4.2rem)] font-semibold leading-[1] tracking-[-0.02em]"
          >
            Ready for a <em className="font-medium text-champagne-soft">New Look?</em>
          </h2>
          <p className="mt-6 text-[17px] leading-relaxed text-ivory-soft">
            Walk in or book your appointment today.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <WaBtn2 size="lg" href={waLink("Hi, I'd like to book a men's haircut at Express Cuts.")} />
            <a href={TEL} className={btn("outline-light", "lg")}>
              <Phone aria-hidden className="size-4" strokeWidth={1.6} />
              Call Now
            </a>
          </div>

          <a
            href={TEL}
            className="mt-7 inline-block text-[15px] font-medium text-ivory-soft transition-colors hover:text-ivory"
          >
            {SITE.phoneDisplay}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
