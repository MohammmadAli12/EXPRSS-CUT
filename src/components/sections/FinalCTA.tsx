import Image from "next/image";
import { Phone } from "lucide-react";
import { SITE, TEL, waLink } from "@/lib/site";
import { Arrow, btn } from "@/components/ui/button";
import { BookTrigger } from "@/components/booking/BookTrigger";
import { Reveal } from "@/components/motion/Reveal";

export function FinalCTA() {
  return (
    <section id="book" aria-labelledby="book-title" className="on-dark relative isolate overflow-hidden bg-charcoal text-ivory">
      <div className="grid lg:grid-cols-2">
        <div className="relative h-[360px] overflow-hidden sm:h-[440px] lg:h-auto lg:min-h-[600px]">
          <Image
            src="/images/offers/executive.png"
            alt="Stylist finishing a client's highlighted hair with a blow-dryer"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
            style={{ objectPosition: "30% 35%", transform: "scale(1.4)", transformOrigin: "18% 40%" }}
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-b from-charcoal/0 via-charcoal/10 to-charcoal lg:bg-gradient-to-r lg:from-charcoal/0 lg:via-charcoal/5 lg:to-charcoal"
          />
        </div>

        <div className="relative flex items-center px-[var(--gutter)] pb-20 pt-4 lg:py-24 lg:pl-14 lg:pr-[max(var(--gutter),calc((100vw-82rem)/2+var(--gutter)))]">
          <Reveal className="max-w-[520px]">
            <p className="eyebrow text-champagne-soft">Ready for your next look?</p>
            <h2
              id="book-title"
              className="mt-6 font-display text-[clamp(2.8rem,5vw,4.5rem)] font-semibold leading-[0.98] tracking-[-0.02em]"
            >
              Look Sharp.
              <br />
              <em className="font-medium text-champagne-soft">Feel Better.</em>
            </h2>
            <p className="mt-6 max-w-[40ch] text-[16px] leading-relaxed text-ivory-soft">
              Open seven days a week in Ayyappa Nagar, KR Puram, 2 KM from Hoodi Circle.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <BookTrigger className={btn("ivory", "lg")}>
                Book Your Appointment <Arrow />
              </BookTrigger>
              <a href={waLink()} target="_blank" rel="noopener noreferrer" className={btn("outline-light", "lg")}>
                WhatsApp Us <Arrow />
              </a>
            </div>
            <a
              href={TEL}
              className="mt-8 inline-flex items-center gap-3 text-[14px] text-ivory-soft transition-colors hover:text-ivory"
            >
              <span className="grid size-10 place-items-center rounded-full border border-ivory/25">
                <Phone aria-hidden className="size-4" strokeWidth={1.6} />
              </span>
              Call {SITE.phoneDisplay}
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
