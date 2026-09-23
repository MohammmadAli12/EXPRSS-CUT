import Image from "next/image";
import { MessageCircle, Phone } from "lucide-react";
import { SITE, TEL, waLink } from "@/lib/site";
import { BEARD_OFFER } from "@/data/beard";
import { btn } from "@/components/ui/button";
import { Reveal } from "@/components/motion/Reveal";
import { WaBtn2 } from "@/components/offer-card/actions";

/** Dark, close-up finish: the trimmer at work behind the final ask. */
export function BeardCTA() {
  return (
    <section id="book" aria-labelledby="beard-book-title" className="on-dark relative isolate overflow-hidden bg-night text-ivory">
      <Image
        src="/images/services/beard-grooming.png"
        alt=""
        aria-hidden
        fill
        sizes="100vw"
        className="object-cover object-[62%_58%] opacity-40"
      />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-night via-night/85 to-night/30" />

      <div className="shell relative py-20 lg:py-28">
        <Reveal className="max-w-[600px]">
          <p className="eyebrow text-champagne-soft">
            Beard trim &amp; line-up · ₹{BEARD_OFFER.price.offer}
          </p>
          <h2
            id="beard-book-title"
            className="mt-5 font-display text-[clamp(2.6rem,5vw,4.2rem)] font-semibold leading-[1] tracking-[-0.02em]"
          >
            Ready for a <em className="font-medium text-champagne-soft">Sharper Beard?</em>
          </h2>
          <p className="mt-6 max-w-[42ch] text-[16.5px] leading-relaxed text-ivory-soft">
            Walk in or book your beard grooming today at {SITE.shortName}, {SITE.neighbourhood} —{" "}
            {SITE.landmark}.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <WaBtn2 size="lg" href={waLink("Hi, I'd like to book a beard trim at Express Cuts.")} />
            <a href={TEL} className={btn("outline-light", "lg")}>
              <Phone aria-hidden className="size-4" strokeWidth={1.6} />
              Call Now
            </a>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-[14.5px] text-ivory-soft">
            <a href={TEL} className="tabular transition-colors hover:text-ivory">
              {SITE.phoneDisplay}
            </a>
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition-colors hover:text-ivory"
            >
              <MessageCircle aria-hidden className="size-4" strokeWidth={1.6} />
              WhatsApp us
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
