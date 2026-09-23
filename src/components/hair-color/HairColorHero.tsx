import { Clock, Footprints, MessageSquareText, Phone, Star } from "lucide-react";
import { SITE, TEL } from "@/lib/site";
import { GOOGLE_RATING, GOOGLE_REVIEWS_URL } from "@/data/reviews";
import { CLOSING_TIME } from "@/data/facial";
import { HAIR_COLOR_HERO } from "@/data/hair-color";
import { cn } from "@/lib/cn";
import { btn } from "@/components/ui/button";
import { MediaImage } from "@/components/ui/MediaImage";
import { CallNow } from "@/components/ui/CallNow";

const d = (ms: number) => ({ "--d": ms }) as React.CSSProperties;

/**
 * Cream band, as in the reference: the colour photograph fills the right of the
 * hero and dissolves into the cream ground under the headline, so it reads as the
 * hero's canvas rather than a picture beside the type. Phones lead with the photo.
 */
export function HairColorHero() {
  return (
    <section id="hero" aria-labelledby="color-hero-title" className="relative isolate overflow-hidden bg-hero pt-[var(--nav-h)]">
      {/* ≥1024px: photograph as the hero canvas */}
      <div className="color-hero-art absolute inset-y-0 right-0 hidden w-[min(50%,820px)] lg:block">
        <MediaImage
          skip="(max-width: 1023.98px)"
          src={HAIR_COLOR_HERO.src}
          alt={HAIR_COLOR_HERO.alt}
          fill
          loading="eager"
          fetchPriority="high"
          quality={88}
          sizes="52vw"
          className="hero-settle object-cover object-[52%_8%]"
        />
      </div>

      {/* <1024px: the photograph leads, then dissolves into the cream where the copy starts */}
      <div className="relative h-[min(40svh,330px)] w-full overflow-hidden sm:h-[380px] lg:hidden">
        <MediaImage
          skip="(min-width: 1024px)"
          src={HAIR_COLOR_HERO.src}
          alt={HAIR_COLOR_HERO.alt}
          fill
          loading="eager"
          fetchPriority="high"
          quality={88}
          sizes="100vw"
          className="hero-settle object-cover object-[50%_18%]"
        />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-b from-hero/0 to-hero" />
      </div>

      <p
        aria-hidden
        className="hero-rise absolute right-[max(var(--gutter),calc((100%-82rem)/2+var(--gutter)))] bottom-10 hidden text-right text-[12px] font-semibold uppercase leading-[2.1] tracking-[0.32em] text-ivory [text-shadow:0_1px_10px_rgb(15_14_13/0.55)] xl:block"
        style={d(900)}
      >
        Good
        <br />
        Hair
        <br />
        Better
        <br />
        You
        <span className="ml-auto mt-3 block h-px w-10 bg-ivory/70" />
      </p>

      <div className="shell relative -mt-12 pb-10 sm:-mt-16 lg:mt-0 lg:flex lg:min-h-[clamp(430px,calc(100svh-var(--nav-h)-150px),540px)] lg:items-center lg:pb-0">
        <div className="lg:max-w-[820px] lg:py-10">
          <p className="hero-rise eyebrow text-champagne" style={d(100)}>
            Men&rsquo;s Hair Color · KR Puram
          </p>

          <h1
            id="color-hero-title"
            className="mt-4 font-display text-[clamp(2.6rem,4.6vw,4.1rem)] font-semibold leading-[0.98] tracking-[-0.025em] lg:mt-5"
          >
            <span className="hero-line">
              <span style={d(180)}>
                Color. Define. <em className="font-medium text-champagne">Transform.</em>
              </span>
            </span>
          </h1>

          <p className="hero-rise mt-4 text-[16px] leading-snug text-ink-soft sm:text-[18px]" style={d(440)}>
            Men&rsquo;s Hair Color &amp; Hair Styling in KR Puram, Bengaluru.
          </p>

          <div id="hero-cta" className="hero-rise mt-6 flex flex-col gap-3 sm:flex-row sm:items-center lg:mt-7" style={d(540)}>
            <CallNow className="w-full sm:w-auto" />
            <a
              href={TEL}
              aria-label={`Call ${SITE.phoneDisplay}`}
              className={btn("outline", "lg", "tabular w-full bg-paper/60 sm:w-auto")}
            >
              <Phone aria-hidden className="size-4" strokeWidth={1.7} />
              {SITE.phoneDisplay}
            </a>
          </div>

          <Trust className="hero-rise mt-8 lg:mt-9" />
        </div>
      </div>
    </section>
  );
}

function Trust({ className }: { className?: string }) {
  const item = "flex items-center gap-2.5";
  const icon = "size-[22px] shrink-0 text-ink";
  const top = "block text-[14px] font-semibold leading-tight text-ink";
  const sub = "block text-[12px] leading-tight text-ink-muted";
  return (
    <ul className={cn("grid max-w-[520px] grid-cols-2 gap-x-5 gap-y-4 sm:flex sm:max-w-none sm:flex-wrap sm:items-center sm:gap-x-0", className)}>
      <li className="sm:pr-7">
        <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer" className={cn(item, "group")}>
          <Star aria-hidden className={icon} strokeWidth={1.4} />
          <span>
            <span className={cn(top, "tabular")}>{GOOGLE_RATING.value.toFixed(1)}</span>
            <span className={sub}>Google Rating</span>
          </span>
        </a>
      </li>
      <li className="sm:border-l sm:border-line sm:px-7">
        <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer" className={cn(item, "group")}>
          <MessageSquareText aria-hidden className={icon} strokeWidth={1.4} />
          <span>
            <span className={cn(top, "tabular")}>{GOOGLE_RATING.count}</span>
            <span className={sub}>Google Reviews</span>
          </span>
        </a>
      </li>
      <li className={cn(item, "sm:border-l sm:border-line sm:px-7")}>
        <Footprints aria-hidden className={icon} strokeWidth={1.4} />
        <span>
          <span className={top}>Walk-ins</span>
          <span className={sub}>Welcome</span>
        </span>
      </li>
      {CLOSING_TIME && (
        <li className={cn(item, "sm:border-l sm:border-line sm:pl-7")}>
          <Clock aria-hidden className={icon} strokeWidth={1.4} />
          <span>
            <span className={top}>Open Till</span>
            <span className={sub}>{CLOSING_TIME}</span>
          </span>
        </li>
      )}
    </ul>
  );
}
