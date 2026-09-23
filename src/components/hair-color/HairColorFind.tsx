import { Crown, Leaf, Palette, Sparkles, Waves, Wind } from "lucide-react";
import { COLOR_CHIPS } from "@/data/hair-color";
import { Eyebrow } from "@/components/ui/button";
import { Reveal } from "@/components/motion/Reveal";

const ICONS = { natural: Leaf, grey: Wind, streaks: Waves, highlights: Sparkles, bold: Palette, loreal: Crown } as const;

/** "Find Your Color." — heading on the left, the six colour services on the right. */
export function HairColorFind() {
  return (
    <section aria-labelledby="color-find-title" className="bg-ivory py-10 lg:py-12">
      <div className="shell grid items-center gap-6 lg:grid-cols-[minmax(0,510px)_minmax(0,1fr)] lg:gap-8">
        <Reveal>
          <Eyebrow>Hair Color for Men</Eyebrow>
          <h2
            id="color-find-title"
            className="mt-2.5 font-display text-[clamp(1.9rem,3.2vw,2.6rem)] font-semibold leading-[1.04] tracking-[-0.015em]"
          >
            Find Your Color.
          </h2>
          <p className="mt-2 text-[14.5px] leading-snug text-ink-soft">
            Professional Hair Color · Hair Highlights · Grey Coverage · Hair Streaks
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <ul aria-label="Hair colour services for men" className="flex flex-wrap gap-2 lg:flex-nowrap lg:justify-end">
            {COLOR_CHIPS.map((c) => {
              const Icon = ICONS[c.id];
              return (
                <li
                  key={c.id}
                  className="flex h-11 items-center gap-2 rounded-[12px] border border-line bg-paper pl-2.5 pr-3 text-[12.5px] font-medium text-ink lg:text-[13px]"
                >
                  <Icon aria-hidden className="size-4 shrink-0 text-champagne" strokeWidth={1.5} />
                  <span className="whitespace-nowrap">{c.label}</span>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
