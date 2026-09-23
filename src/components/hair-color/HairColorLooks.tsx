import Image from "next/image";
import { COLOR_LOOKS } from "@/data/hair-color";
import { Eyebrow } from "@/components/ui/button";
import { Reveal } from "@/components/motion/Reveal";
import { ScrollRail } from "@/components/motion/ScrollRail";

/**
 * Five colour looks. ≥768px they share one row; on phones ScrollRail pins the row
 * and ordinary vertical scrolling brings one card at a time — no swipe, no sideways
 * scrollbar.
 */
export function HairColorLooks() {
  return (
    <section id="services" aria-labelledby="color-looks-title" className="bg-hero py-10 lg:py-12">
      <div className="shell">
        <Reveal>
          <Eyebrow>Men&rsquo;s Hair Color</Eyebrow>
          <h2
            id="color-looks-title"
            className="mt-2.5 font-display text-[clamp(1.9rem,3.2vw,2.6rem)] font-semibold leading-[1.04] tracking-[-0.015em]"
          >
            Choose Your Look.
          </h2>
        </Reveal>

        <div className="mt-6 lg:mt-7">
          <ScrollRail label="Hair colour looks" gridClassName="md:grid-cols-3 md:gap-5 lg:grid-cols-5 lg:gap-4">
            {COLOR_LOOKS.map((look) => (
              <article key={look.title} className="h-full overflow-hidden rounded-[14px] bg-paper shadow-[0_1px_2px_rgb(18_17_16/0.05)]">
                <div className="relative aspect-[4/3] overflow-hidden bg-charcoal">
                  <Image
                    src={look.src}
                    alt={look.alt}
                    fill
                    sizes="(min-width: 1024px) 250px, (min-width: 768px) 31vw, 88vw"
                    className="object-cover"
                    style={{ objectPosition: look.position }}
                  />
                </div>
                <div className="px-4 py-3.5">
                  <h3 className="text-[15px] font-semibold leading-tight tracking-[-0.01em] text-ink">{look.title}</h3>
                  <p className="mt-1 text-[13px] leading-snug text-ink-muted">{look.note}</p>
                </div>
              </article>
            ))}
          </ScrollRail>
        </div>
      </div>
    </section>
  );
}
