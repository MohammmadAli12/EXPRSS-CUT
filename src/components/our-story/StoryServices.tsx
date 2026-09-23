import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { OFFERS_LINE, STORY_SERVICES, VISIT_STEPS } from "@/data/our-story";
import { Eyebrow } from "@/components/ui/button";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Six service cards, each a link to the page that already covers that service, so
 * the story page feeds the rest of the site instead of repeating it.
 */
export function StoryServices() {
  return (
    <section id="services" aria-labelledby="story-services-title" className="bg-ivory py-14 lg:py-16">
      <div className="shell">
        <Reveal className="flex flex-wrap items-end justify-between gap-x-12 gap-y-4">
          <div>
            <Eyebrow>Our Services</Eyebrow>
            <h2
              id="story-services-title"
              className="mt-4 font-display text-[clamp(2rem,3.4vw,2.9rem)] font-semibold leading-[1.06] tracking-[-0.018em]"
            >
              A Complete Men&rsquo;s Grooming Experience.
            </h2>
          </div>
          <p className="max-w-[44ch] text-[14.5px] leading-relaxed text-ink-soft">
            Haircuts, beard grooming, facials, hair spa, hair color and complete grooming — all under one roof in KR
            Puram.
          </p>
        </Reveal>

        <ul className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {STORY_SERVICES.map((s, i) => (
            <li key={s.id}>
              <Reveal delay={i * 0.05} className="h-full">
                <Link
                  href={s.href}
                  className="group/card flex h-full flex-col overflow-hidden rounded-[18px] border border-line bg-paper transition-[border-color,box-shadow] duration-500 ease-editorial hover:border-champagne/60 hover:shadow-card"
                >
                  <span className="relative block aspect-[4/3] overflow-hidden bg-charcoal">
                    <Image
                      src={s.src}
                      alt={s.alt}
                      fill
                      sizes="(min-width: 1024px) 400px, (min-width: 640px) 46vw, 92vw"
                      className="object-cover transition-transform duration-[900ms] ease-editorial group-hover/card:scale-[1.04]"
                      style={{ objectPosition: s.position }}
                    />
                  </span>
                  <span className="flex flex-1 items-center gap-3 px-5 py-4">
                    <span className="min-w-0 flex-1">
                      <span className="block text-[11px] font-semibold uppercase tracking-[0.22em] text-champagne">
                        {s.kicker}
                      </span>
                      <span className="mt-1.5 block text-[15.5px] font-semibold leading-snug text-ink">{s.title}</span>
                      {s.id === "offers" && (
                        <span className="tabular mt-1 block text-[13px] text-ink-muted">{OFFERS_LINE}</span>
                      )}
                    </span>
                    <span
                      aria-hidden
                      className="grid size-9 shrink-0 place-items-center rounded-full border border-champagne/40 text-champagne transition-transform duration-500 ease-editorial group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5"
                    >
                      <ArrowUpRight className="size-4" strokeWidth={1.7} />
                    </span>
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Your visit, step by step — four plain steps, no invented people. */
export function VisitSteps() {
  return (
    <section aria-labelledby="story-visit-title" className="bg-cream py-14 lg:py-16">
      <div className="shell">
        <Reveal>
          <Eyebrow>Your Visit, Step by Step</Eyebrow>
          <h2
            id="story-visit-title"
            className="mt-4 font-display text-[clamp(2rem,3.4vw,2.9rem)] font-semibold leading-[1.06] tracking-[-0.018em]"
          >
            Relax. We&rsquo;ve Got You Covered.
          </h2>
        </Reveal>

        <ol className="mt-9 grid gap-7 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          {VISIT_STEPS.map((step, i) => (
            <li key={step.n} className={i > 0 ? "lg:border-l lg:border-line lg:pl-7" : "lg:pr-7"}>
              <Reveal delay={i * 0.07}>
                <span className="tabular text-[12px] font-semibold uppercase tracking-[0.24em] text-champagne">
                  {step.n}
                </span>
                <h3 className="mt-3 text-[16.5px] font-semibold leading-snug text-ink">{step.title}</h3>
                <p className="mt-2 max-w-[32ch] text-[14px] leading-relaxed text-ink-soft">{step.note}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
