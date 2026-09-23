import { CalendarDays, MapPin, MessageCircle, Phone, Scissors, Star, Users } from "lucide-react";
import { SITE, TEL, waLink } from "@/lib/site";
import { GOOGLE_RATING } from "@/data/reviews";
import { STORY_HERO } from "@/data/our-story";
import { cn } from "@/lib/cn";
import { Arrow, btn } from "@/components/ui/button";
import { MediaImage } from "@/components/ui/MediaImage";

const d = (ms: number) => ({ "--d": ms }) as React.CSSProperties;

/* Page-local: the photograph dissolves into the night ground instead of ending on a line */
const FADE_LEFT = {
  WebkitMaskImage: "linear-gradient(90deg, transparent 0, #000 40%)",
  maskImage: "linear-gradient(90deg, transparent 0, #000 40%)",
} as const;

const TRUST = [
  { icon: CalendarDays, top: `Established`, sub: String(SITE.established) },
  { icon: Star, top: GOOGLE_RATING.value.toFixed(1), sub: "Google Rating" },
  { icon: Users, top: `${GOOGLE_RATING.count}+`, sub: "Google Reviews" },
  { icon: Scissors, top: "Men's Grooming", sub: "Since 2020" },
  { icon: MapPin, top: "KR Puram", sub: "Bengaluru" },
];

/**
 * The salon photograph is the hero's canvas: it fills the right of a dark band and
 * dissolves into it, the same composition the Facial and Hair Color heroes use, so
 * the story page reads as the same website.
 */
export function StoryHero() {
  return (
    <section id="hero" aria-labelledby="story-hero-title" className="bg-ivory pt-[var(--nav-h)]">
      <div className="on-dark relative isolate overflow-hidden bg-night text-ivory lg:h-[clamp(500px,calc(100svh-var(--nav-h)),660px)]">
        {/* ≥1024px: the photograph as the hero canvas */}
        <div style={FADE_LEFT} className="absolute inset-y-0 right-0 hidden w-[min(64%,1100px)] lg:block">
          <div className="hero-settle absolute inset-0">
            <MediaImage
              skip="(max-width: 1023.98px)"
              src={STORY_HERO.src}
              alt={STORY_HERO.alt}
              fill
              loading="eager"
              fetchPriority="high"
              quality={85}
              sizes="64vw"
              className="object-cover object-[58%_46%]"
            />
          </div>
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-night/70 via-night/0 to-night/30" />
        </div>

        {/* <1024px: the photograph leads, then dissolves into the copy */}
        <div className="relative h-[min(38svh,320px)] w-full overflow-hidden sm:h-[380px] lg:hidden">
          <div className="hero-settle absolute inset-0">
            <MediaImage
              skip="(min-width: 1024px)"
              src={STORY_HERO.src}
              alt={STORY_HERO.alt}
              fill
              loading="eager"
              fetchPriority="high"
              quality={85}
              sizes="100vw"
              className="object-cover object-[56%_48%]"
            />
          </div>
          <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-night/0 to-night" />
        </div>

        <div className="shell relative -mt-12 pb-10 sm:-mt-16 lg:mt-0 lg:flex lg:h-full lg:items-center lg:pb-0">
          <div className="lg:max-w-[600px] lg:py-12">
            <p className="hero-rise eyebrow text-champagne-soft" style={d(90)}>
              Our Story · Express Cuts Men&rsquo;s Salon
            </p>

            {/* One H1: the keyword sentence and the display line live in the same heading */}
            <h1 id="story-hero-title" className="mt-4 lg:mt-5">
              <span className="hero-line block">
                <span
                  className="block font-display text-[clamp(2.6rem,5vw,4.3rem)] font-semibold leading-[1.02] tracking-[-0.025em]"
                  style={d(190)}
                >
                  More Than a Salon.
                </span>
              </span>
              <span className="hero-rise mt-3 block text-[13.5px] font-medium uppercase tracking-[0.2em] text-champagne-soft" style={d(320)}>
                The Story of Express Cuts, KR Puram&rsquo;s Men&rsquo;s Salon
              </span>
            </h1>

            <p className="hero-rise mt-5 max-w-[56ch] text-[16px] leading-relaxed text-ivory-soft sm:text-[17px]" style={d(440)}>
              The story of Express Cuts, a men&rsquo;s salon in KR Puram, Bengaluru, built around professional grooming,
              personal attention and an easy everyday experience.
            </p>

            <div id="hero-cta" className="hero-rise mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap" style={d(560)}>
              <a href={TEL} aria-label={`Call ${SITE.phoneDisplay}`} className={btn("go", "lg", "uppercase tracking-[0.08em]")}>
                <Phone aria-hidden className="size-4" strokeWidth={2} />
                Call Now <Arrow />
              </a>
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className={btn("outline-light", "lg", "uppercase tracking-[0.08em]")}
              >
                <MessageCircle aria-hidden className="size-4" strokeWidth={1.9} />
                WhatsApp <Arrow />
              </a>
            </div>

            <ul className="hero-rise mt-9 grid max-w-[560px] grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3" style={d(680)}>
              {TRUST.map(({ icon: Icon, top, sub }) => (
                <li key={top} className="flex items-center gap-2.5">
                  <Icon aria-hidden className="size-[22px] shrink-0 text-champagne-soft" strokeWidth={1.4} />
                  <span>
                    <span className={cn("block text-[14px] font-semibold leading-tight text-ivory", "tabular")}>{top}</span>
                    <span className="mt-0.5 block text-[12px] leading-tight text-ivory-muted">{sub}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
