import { Droplet, Droplets, Phone, Sparkles, Sun, SunDim, Waves } from "lucide-react";
import { SKIN_CONCERNS } from "@/data/facial";
import { SITE, TEL } from "@/lib/site";
import { Arrow, Eyebrow, btn } from "@/components/ui/button";
import { Reveal } from "@/components/motion/Reveal";

const ICONS = {
  dull: SunDim,
  dry: Droplet,
  oily: Droplets,
  tan: Sun,
  cleansing: Sparkles,
  hydration: Waves,
} as const;

/** Six plain concern tiles and a "not sure" call-out — orientation, not a diagnosis. */
export function FacialConcerns() {
  return (
    <section aria-labelledby="facial-why-title" className="bg-ivory pb-14 pt-16 lg:pb-16 lg:pt-24">
      <div className="shell">
        <Reveal className="flex flex-wrap items-end justify-between gap-x-10 gap-y-3">
          <div>
            <Eyebrow>Skin concerns</Eyebrow>
            <h2
              id="facial-why-title"
              className="mt-4 font-display text-[clamp(2rem,3.6vw,3rem)] font-semibold leading-[1.04] tracking-[-0.015em]"
            >
              Why Choose a <em className="font-medium text-champagne">Facial?</em>
            </h2>
          </div>
          <p className="max-w-[40ch] text-[15px] leading-snug text-ink-soft sm:text-right">
            Everyday sun, sweat, shaving and city air show on your face. A facial is time set aside to look after it.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-4 lg:grid-cols-[1fr_280px] lg:gap-5">
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 xl:grid-cols-6">
            {SKIN_CONCERNS.map((c, i) => {
              const Icon = ICONS[c.id];
              return (
                <li key={c.id}>
                  <Reveal delay={i * 0.06} className="h-full">
                    <div className="group flex h-full flex-col items-center justify-center rounded-[18px] border border-line bg-paper px-3 pb-5 pt-6 text-center transition-[border-color,box-shadow] duration-500 ease-editorial hover:border-champagne/50 hover:shadow-card">
                      <span className="grid size-12 place-items-center rounded-full bg-ivory text-champagne transition-colors duration-500 group-hover:bg-ink group-hover:text-champagne-soft">
                        <Icon aria-hidden className="size-[22px]" strokeWidth={1.4} />
                      </span>
                      <h3 className="mt-4 text-[15px] font-semibold leading-tight text-ink">{c.label}</h3>
                      <p className="mt-1.5 text-[13px] leading-snug text-ink-muted">{c.note}</p>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ul>

          <Reveal delay={0.2} className="h-full">
            <aside
              aria-labelledby="facial-unsure-title"
              className="flex h-full flex-col justify-between gap-6 rounded-[18px] bg-cream p-7"
            >
              <div>
                <h3 id="facial-unsure-title" className="font-display text-[26px] font-semibold leading-[1.08] tracking-[-0.01em] text-ink">
                  Not sure what <em className="font-medium text-champagne">to choose?</em>
                </h3>
                <p className="mt-3 text-[14.5px] leading-snug text-ink-soft">
                  Talk to our team before booking — tell us about your skin and we&rsquo;ll point you to the right facial.
                </p>
              </div>
              <a href={TEL} aria-label={`Call ${SITE.phoneDisplay}`} className={btn("ink", "md", "w-full")}>
                <Phone aria-hidden className="size-4" strokeWidth={1.6} />
                Call Now <Arrow />
              </a>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
