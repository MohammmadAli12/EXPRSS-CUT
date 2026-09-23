import { Clock, Footprints, MessageSquareText, Star } from "lucide-react";
import { SITE, TEL } from "@/lib/site";
import { GOOGLE_RATING, GOOGLE_REVIEWS_URL } from "@/data/reviews";
import { CLOSING_TIME } from "@/data/facial";
import { HAIR_SPA_HERO } from "@/data/hair-spa";
import { cn } from "@/lib/cn";
import { MediaImage } from "@/components/ui/MediaImage";
import { CallNow } from "@/components/ui/CallNow";

const d = (ms: number) => ({ "--d": ms }) as React.CSSProperties;

function Trust({ className }: { className?: string }) {
  const item = "flex items-center gap-2.5";
  const icon = "size-[22px] shrink-0 text-champagne-soft";
  const top = "block text-[14px] font-semibold leading-tight text-ivory";
  const sub = "block text-[12px] leading-tight text-ivory-muted";
  return (
    <ul className={cn("grid grid-cols-2 gap-x-5 gap-y-4 sm:flex sm:flex-wrap sm:gap-x-8", className)}>
      <li>
        <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer" className={cn(item, "group")}>
          <Star aria-hidden className={icon} strokeWidth={1.4} fill="currentColor" />
          <span>
            <span className={cn(top, "tabular")}>{GOOGLE_RATING.value.toFixed(1)}</span>
            <span className={cn(sub, "group-hover:text-ivory")}>Google Rating</span>
          </span>
        </a>
      </li>
      <li>
        <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer" className={cn(item, "group")}>
          <MessageSquareText aria-hidden className={icon} strokeWidth={1.4} />
          <span>
            <span className={cn(top, "tabular")}>{GOOGLE_RATING.count}</span>
            <span className={cn(sub, "group-hover:text-ivory")}>Google Reviews</span>
          </span>
        </a>
      </li>
      <li className={item}>
        <Footprints aria-hidden className={icon} strokeWidth={1.4} />
        <span>
          <span className={top}>Walk-ins</span>
          <span className={sub}>Welcome</span>
        </span>
      </li>
      {CLOSING_TIME && (
        <li className={item}>
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

/**
 * A compact dark band under the (unchanged, light) navigation. Desktop: the wash-basin
 * photograph fills the right of the band and dissolves into the night ground under the
 * type. Phones: the photograph leads, then the copy, the call and the trust grid.
 */
export function HairSpaHero() {
  return (
    <section id="hero" aria-labelledby="spa-hero-title" className="bg-ivory pt-[var(--nav-h)]">
      <div className="on-dark relative isolate overflow-hidden bg-night text-ivory lg:h-[clamp(470px,calc(100svh-var(--nav-h)-120px),580px)]">
        {/* ≥1024px: photograph as the canvas; zoomed from the left so its baked-in wall label falls outside */}
        <div className="spa-hero-art absolute inset-y-0 right-0 hidden w-[min(76%,1240px)] overflow-hidden lg:block">
          <div className="hero-settle absolute inset-0">
            <MediaImage
              skip="(max-width: 1023.98px)"
              src={HAIR_SPA_HERO.src}
              alt={HAIR_SPA_HERO.alt}
              fill
              loading="eager"
              fetchPriority="high"
              quality={85}
              sizes="80vw"
              className="origin-[12%_52%] scale-[1.22] object-cover object-[30%_52%]"
            />
          </div>
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-night/60 via-night/0 to-night/20" />
        </div>

        {/* <1024px: the photograph leads and dissolves into the copy */}
        <div className="relative h-[min(42svh,380px)] w-full overflow-hidden sm:h-[440px] lg:hidden">
          <div className="hero-settle absolute inset-0">
            <MediaImage
              skip="(min-width: 1024px)"
              src={HAIR_SPA_HERO.src}
              alt={HAIR_SPA_HERO.alt}
              fill
              loading="eager"
              fetchPriority="high"
              quality={85}
              sizes="100vw"
              className="object-cover object-[35%_50%]"
            />
          </div>
          <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-night/0 to-night" />
        </div>

        <div className="shell relative -mt-14 pb-10 sm:-mt-20 lg:mt-0 lg:flex lg:h-full lg:items-center lg:pb-0">
          <div className="lg:max-w-[560px] lg:py-10">
            <Copy />
            <Actions className="mt-6 lg:mt-7" />
            <Trust className="hero-rise mt-8 lg:mt-9" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Copy() {
  return (
    <>
      <p className="hero-rise eyebrow text-champagne-soft" style={d(100)}>
        Men&rsquo;s Hair Spa · KR Puram
      </p>
      <h1
        id="spa-hero-title"
        className="mt-4 font-display text-[clamp(2.8rem,5.2vw,4.6rem)] font-semibold leading-[0.98] tracking-[-0.025em] lg:mt-5"
      >
        <span className="hero-line">
          <span style={d(180)}>Repair.</span>
        </span>
        <span className="hero-line">
          <span style={d(290)}>
            Restore. <em className="font-medium text-champagne-soft">Revive.</em>
          </span>
        </span>
      </h1>
      <p className="hero-rise mt-4 text-[16px] leading-snug text-ivory-soft sm:text-[18px]" style={d(460)}>
        Men&rsquo;s Hair Spa &amp; Hair Treatment in KR Puram, Bengaluru.
      </p>
    </>
  );
}

function Actions({ className }: { className?: string }) {
  return (
    <div id="hero-cta" className={cn("hero-rise flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6", className)} style={d(560)}>
      <CallNow className="w-full sm:w-auto" />
      <a
        href={TEL}
        tabIndex={-1}
        className="tabular text-center text-[15px] font-medium text-ivory-soft transition-colors hover:text-ivory sm:text-left"
      >
        {SITE.phoneDisplay}
      </a>
    </div>
  );
}
