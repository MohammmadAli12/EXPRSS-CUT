import Image from "next/image";
import { Phone } from "lucide-react";
import { SITE, TEL } from "@/lib/site";
import { FACIAL_FROM, FACIAL_HERO_IMAGE } from "@/data/facial";
import { Arrow, btn } from "@/components/ui/button";
import { Reveal } from "@/components/motion/Reveal";

/**
 * The quiet dark chapter: the treatment photograph cropped close on the brush and
 * mask, running off the left edge and dissolving into the night ground where the
 * type begins.
 */
export function FacialEditorial() {
  return (
    <section aria-labelledby="facial-selfcare-title" className="on-dark relative isolate overflow-hidden bg-night text-ivory">
      <div className="relative h-[340px] sm:h-[440px] lg:absolute lg:inset-y-0 lg:left-0 lg:h-auto lg:w-[62%]">
        <Reveal variant="rise" className="absolute inset-0">
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src={FACIAL_HERO_IMAGE}
              alt="Close view of a facial mask being brushed onto a client's cheek"
              fill
              sizes="(min-width: 1024px) 62vw, 100vw"
              className="object-cover"
              style={{ objectPosition: "58% 42%", transform: "scale(1.32)", transformOrigin: "56% 44%" }}
            />
          </div>
        </Reveal>
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-night/0 to-night lg:hidden" />
        <div aria-hidden className="absolute inset-y-0 right-0 hidden w-2/5 bg-gradient-to-r from-night/0 to-night lg:block" />
      </div>

      <div className="shell relative lg:flex lg:min-h-[600px] lg:items-center lg:justify-end">
        <Reveal className="-mt-12 pb-16 lg:mt-0 lg:w-[40%] lg:py-24">
          <p className="eyebrow text-champagne-soft">The facial experience</p>
          <h2
            id="facial-selfcare-title"
            className="mt-6 font-display text-[clamp(2.6rem,4.8vw,4.1rem)] font-semibold uppercase leading-[1] tracking-[0.02em] text-champagne-soft"
          >
            Skin Care
            <br />
            <em className="font-medium normal-case tracking-[-0.01em] text-ivory">Is Self-Care.</em>
          </h2>
          <span aria-hidden className="mt-8 block h-px w-16 bg-champagne/70" />
          <p className="mt-8 max-w-[42ch] text-[16px] leading-relaxed text-ivory-soft">
            A facial is time in the chair that&rsquo;s only about you — cleansing away the week, a calm massage and the
            quiet confidence of skin that feels looked after.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
            <a href="#offers" className={btn("outline-light", "md")}>
              See facial offers from ₹{FACIAL_FROM} <Arrow />
            </a>
            <a
              href={TEL}
              className="inline-flex items-center gap-2.5 text-[14px] text-ivory-soft transition-colors hover:text-ivory"
            >
              <Phone aria-hidden className="size-4" strokeWidth={1.6} />
              <span className="tabular">{SITE.phoneDisplay}</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
