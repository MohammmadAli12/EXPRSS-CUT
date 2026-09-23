import { Clock, MessageSquareText, Phone, Star, Footprints } from "lucide-react";
import { SITE, TEL, waLink } from "@/lib/site";
import { GOOGLE_RATING, GOOGLE_REVIEWS_URL } from "@/data/reviews";
import { CLOSING_TIME as CLOSING, FACIAL_FROM, FACIAL_HERO_IMAGE } from "@/data/facial";
import { cn } from "@/lib/cn";
import { btn } from "@/components/ui/button";
import { MediaImage } from "@/components/ui/MediaImage";
import { WaBtn2 } from "@/components/offer-card/actions";
import { CallBtn2 } from "@/components/offer-card/actions";

const d = (ms: number) => ({ "--d": ms }) as React.CSSProperties;

const ALT = "Therapist brushing a cream facial mask onto a relaxed client at Express Cuts";

function Trust({ className }: { className?: string }) {
  const item = "flex items-center gap-3";
  const icon = "size-[22px] shrink-0 text-champagne-soft";
  const top = "block text-[14px] font-semibold leading-tight text-ivory";
  const sub = "block text-[12px] leading-tight text-ivory-muted";
  return (
    <ul className={cn("grid grid-cols-2 gap-x-6 gap-y-5 sm:flex sm:flex-wrap sm:gap-x-9", className)}>
      <li>
        <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer" className={cn(item, "group")}>
          <Star aria-hidden className={icon} strokeWidth={1.4} fill="currentColor" />
          <span>
            <span className={cn(top, "tabular")}>{GOOGLE_RATING.value.toFixed(1)}</span>
            <span className={cn(sub, "transition-colors group-hover:text-ivory")}>Google Rating</span>
          </span>
        </a>
      </li>
      <li>
        <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer" className={cn(item, "group")}>
          <MessageSquareText aria-hidden className={icon} strokeWidth={1.4} />
          <span>
            <span className={cn(top, "tabular")}>{GOOGLE_RATING.count}</span>
            <span className={cn(sub, "transition-colors group-hover:text-ivory")}>Google Reviews</span>
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
      {CLOSING && (
        <li className={item}>
          <Clock aria-hidden className={icon} strokeWidth={1.4} />
          <span>
            <span className={top}>Open till</span>
            <span className={sub}>{CLOSING}</span>
          </span>
        </li>
      )}
    </ul>
  );
}

function Actions({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col gap-3 sm:flex-row sm:flex-wrap", className)}>
      <WaBtn2 size="lg" href={waLink("Hi, I'd like to book a men's facial at Express Cuts.")} />
      <a href={TEL} className={btn("outline-light", "lg", "tabular")}>
        <Phone aria-hidden className="size-4" strokeWidth={1.6} />
        Call {SITE.phoneDisplay}
      </a>
    </div>
  );
}

/**
 * A dark cinematic band that starts under the (unchanged, light) navigation.
 * Desktop: the treatment photograph fills the band's right side and dissolves into
 * the night ground, so the headline sits inside the picture rather than beside it.
 * Phones: copy first, then the photograph rising out of the dark, then the CTA bar.
 */
export function FacialHero() {
  return (
    <section id="hero" aria-labelledby="facial-hero-title" className="bg-ivory pt-[var(--nav-h)]">
      <div className="on-dark relative isolate overflow-hidden bg-night text-ivory lg:h-[clamp(600px,calc(100svh-var(--nav-h)),820px)]">
        {/* ≥1024px: photograph as the canvas */}
        <div className="facial-hero-art absolute inset-y-0 right-0 hidden w-[min(80%,1320px)] lg:block">
          <div className="hero-settle absolute inset-0">
            <MediaImage
              skip="(max-width: 1023.98px)"
              src={FACIAL_HERO_IMAGE}
              alt={ALT}
              fill
              loading="eager"
              fetchPriority="high"
              quality={85}
              sizes="80vw"
              className="object-cover object-[62%_36%]"
            />
          </div>
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-night/70 via-night/0 to-night/25" />
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 hidden w-[62%] bg-gradient-to-r from-night via-night/80 to-night/0 lg:block"
        />

        <p
          aria-hidden
          className="hero-rise absolute bottom-10 right-[max(var(--gutter),calc((100%-82rem)/2+var(--gutter)))] hidden text-[13px] font-medium uppercase leading-[2.1] tracking-[0.34em] text-champagne-soft xl:block"
          style={d(900)}
        >
          Good
          <br />
          Skin
          <br />
          Greater
          <br />
          You
        </p>

        <div className="shell relative flex h-full items-center">
          <div className="max-w-[600px] pb-12 pt-12 sm:pt-16 lg:pb-[4vh] lg:pt-0">
            <p className="hero-rise eyebrow text-champagne-soft" style={d(100)}>
              Men&rsquo;s Facial
            </p>

            <h1
              id="facial-hero-title"
              className="mt-5 font-display text-[clamp(2.9rem,6vw,5.3rem)] font-semibold leading-[0.98] tracking-[-0.025em] lg:mt-6"
            >
              <span className="hero-line">
                <span style={d(180)}>Clearer Skin.</span>
              </span>
              <span className="hero-line">
                <span style={d(290)}>
                  <em className="font-medium text-champagne-soft">Better Presence.</em>
                </span>
              </span>
            </h1>

            <p className="hero-rise mt-6 max-w-[44ch] text-[16.5px] leading-[1.6] text-ivory-soft sm:text-[18px]" style={d(480)}>
              Deep cleansing, refreshing and rejuvenating facial treatments designed for men.
            </p>

            <Trust className="hero-rise mt-8 hidden lg:flex" />

            <Actions className="hero-rise mt-9 lg:mt-10" />

            <Trust className="hero-rise mt-9 lg:hidden" />
          </div>
        </div>

        {/* <1024px: the photograph rises out of the dark under the copy */}
        <div className="relative lg:hidden">
          <div className="relative h-[min(64svh,480px)] w-full overflow-hidden sm:h-[520px]">
            <div className="hero-settle absolute inset-0">
              <MediaImage
                skip="(min-width: 1024px)"
                src={FACIAL_HERO_IMAGE}
                alt={ALT}
                fill
                loading="eager"
                fetchPriority="high"
                quality={85}
                sizes="100vw"
                className="object-cover object-[76%_40%] sm:object-[64%_40%]"
              />
            </div>
            <div aria-hidden className="absolute inset-x-0 top-0 h-2/5 bg-gradient-to-b from-night to-night/0" />
            <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-night/80 to-night/0" />
          </div>

          <div id="hero-cta" className="shell relative flex items-center gap-2 pb-6 pt-4">
            <p className="mr-auto text-[12px] leading-tight text-ivory-muted">
              Facial packages
              <span className="mt-0.5 block text-[12px] text-ivory-muted">
                from <span className="tabular text-[22px] font-extrabold tracking-[-0.03em] text-ivory">₹{FACIAL_FROM}</span>
              </span>
            </p>
            <CallBtn2 size="sm" label="Call Now" className="px-4" />
            <WaBtn2 size="sm" className="px-4" href={waLink("Hi, I'd like to book a men's facial at Express Cuts.")} />
          </div>
        </div>
      </div>
    </section>
  );
}
