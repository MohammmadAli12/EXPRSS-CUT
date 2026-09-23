import Image from "next/image";
import { JOURNEY, PROOF, STORY_BODY, STORY_IMAGE } from "@/data/our-story";
import { cn } from "@/lib/cn";
import { Eyebrow } from "@/components/ui/button";
import { Reveal } from "@/components/motion/Reveal";

/** How Express Cuts started, the salon photograph, and the journey timeline beside it. */
export function StoryStart() {
  return (
    <section id="story" aria-labelledby="story-start-title" className="bg-ivory py-14 lg:py-16">
      <div className="shell grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)_minmax(240px,0.8fr)] lg:items-center lg:gap-10">
        <Reveal>
          <Eyebrow>Our Story</Eyebrow>
          <h2
            id="story-start-title"
            className="mt-4 font-display text-[clamp(2rem,3.4vw,2.9rem)] font-semibold leading-[1.06] tracking-[-0.018em]"
          >
            How Express Cuts Started in KR Puram.
          </h2>
          <p className="mt-5 text-[15px] leading-[1.75] text-ink-soft">{STORY_BODY}</p>
        </Reveal>

        <Reveal variant="clip" delay={0.08}>
          <figure className="relative aspect-[4/3] w-full overflow-hidden rounded-[18px] bg-charcoal shadow-card">
            <Image
              src={STORY_IMAGE.src}
              alt={STORY_IMAGE.alt}
              fill
              sizes="(min-width: 1024px) 520px, 92vw"
              className="object-cover object-[50%_45%]"
            />
          </figure>
        </Reveal>

        <Reveal delay={0.14}>
          <div className="rounded-[18px] border border-line bg-paper p-6 shadow-[0_1px_2px_rgb(18_17_16/0.04)]">
            <h3 className="eyebrow text-ink-muted">Our Journey</h3>
            <ol className="mt-5 space-y-6">
              {JOURNEY.map((m, i) => (
                <li key={m.year} className="relative flex gap-4">
                  <span aria-hidden className="relative flex flex-col items-center">
                    <span className="size-3 rounded-full border-2 border-champagne bg-paper" />
                    {i < JOURNEY.length - 1 && <span className="mt-1 w-px flex-1 bg-line" />}
                  </span>
                  <span className="-mt-1 block">
                    <span className="tabular block font-display text-[19px] font-semibold text-ink">{m.year}</span>
                    {m.lines.map((line) => (
                      <span key={line} className="mt-1 block text-[13.5px] leading-snug text-ink-soft">
                        {line}
                      </span>
                    ))}
                  </span>
                </li>
              ))}
            </ol>
            <p aria-hidden className="mt-6 font-script text-[26px] leading-[1.1] text-champagne">
              Still the same mission
              <br />
              Better every day
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** The numbers band that closes the story section. */
export function ProofStrip() {
  return (
    <section aria-label="Express Cuts in numbers" className="on-dark bg-night text-ivory">
      <ul className="shell grid grid-cols-2 gap-x-6 gap-y-7 py-9 sm:grid-cols-3 lg:flex lg:items-center lg:justify-between lg:gap-8 lg:py-8">
        {PROOF.map((p, i) => (
          <li
            key={p.label}
            className={cn(
              "lg:flex-1",
              p.wide && "col-span-2 sm:col-span-1",
              i > 0 && "lg:border-l lg:border-ivory/15 lg:pl-8",
            )}
          >
            <p className={cn("font-display text-[clamp(1.6rem,2.4vw,2.1rem)] font-semibold leading-none", !p.wide && "tabular")}>
              {p.wide ? <span className="text-[clamp(1rem,1.5vw,1.25rem)] uppercase tracking-[0.08em]">{p.value}</span> : p.value}
            </p>
            <p className="mt-2 text-[12.5px] uppercase tracking-[0.18em] text-champagne-soft">{p.label}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
