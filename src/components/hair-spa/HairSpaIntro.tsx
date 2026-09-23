import Image from "next/image";
import { Droplet, Leaf, Sparkles, SunDim, Waves, Wind } from "lucide-react";
import { HAIR_SPA_CHIPS } from "@/data/hair-spa";
import { Eyebrow } from "@/components/ui/button";
import { Reveal } from "@/components/motion/Reveal";

const ICONS = { dry: Waves, rough: Sparkles, dull: SunDim, scalp: Droplet, nourish: Leaf, frizz: Wind } as const;

/** "More Than Just a Hair Wash." — heading and concern chips beside the scalp-massage photograph. */
export function HairSpaIntro() {
  return (
    <section aria-labelledby="spa-intro-title" className="bg-ivory py-12 lg:py-14">
      <div className="shell grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(300px,360px)] lg:gap-12">
        <Reveal className="order-2 lg:order-1">
          <Eyebrow>Men&rsquo;s Hair Spa</Eyebrow>
          <h2
            id="spa-intro-title"
            className="mt-3 font-display text-[clamp(2rem,3.6vw,3rem)] font-semibold leading-[1.04] tracking-[-0.015em]"
          >
            More Than Just a <em className="font-medium text-champagne">Hair Wash.</em>
          </h2>
          <p className="mt-3 text-[15px] leading-snug text-ink-soft sm:text-[16.5px]">
            Hair Spa for Men · Hair Nourishment · Scalp Care · Hair Repair
          </p>
          <ul aria-label="What a hair spa helps with" className="mt-6 flex flex-wrap gap-2">
            {HAIR_SPA_CHIPS.map((c) => {
              const Icon = ICONS[c.id];
              return (
                <li
                  key={c.id}
                  className="flex h-10 items-center gap-2 rounded-full border border-line bg-paper pl-3 pr-3.5 text-[13px] font-medium text-ink sm:h-11 sm:text-[13.5px]"
                >
                  <Icon aria-hidden className="size-4 text-champagne" strokeWidth={1.5} />
                  {c.label}
                </li>
              );
            })}
          </ul>
        </Reveal>

        <Reveal variant="clip" className="order-1 lg:order-2">
          {/* Supplied at 315×143 — shown near its natural size so it stays crisp */}
          <figure className="relative mx-auto aspect-[303/131] w-full max-w-[360px] overflow-hidden rounded-[18px] bg-charcoal shadow-card lg:mx-0">
            <Image
              src="/images/hair-spa/hair-wash.webp"
              alt="Stylist massaging a client's scalp during a hair spa for men"
              fill
              sizes="360px"
              className="object-cover"
            />
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
