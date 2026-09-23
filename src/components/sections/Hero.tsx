import { ArrowDown, Phone } from "lucide-react";
import { TEL, waLink } from "@/lib/site";
import { HAIRCUT_FROM } from "@/data/popular";
import { GOOGLE_RATING, GOOGLE_REVIEWS_URL } from "@/data/reviews";
import { btn } from "@/components/ui/button";
import { MediaImage } from "@/components/ui/MediaImage";
import { Stars } from "@/components/ui/Stars";
import { OpenStatus } from "./OpenStatus";
import { HeroMobile } from "./HeroMobile";
import { WaBtn2 } from "@/components/offer-card/actions";

const d = (ms: number) => ({ "--d": ms }) as React.CSSProperties;

/**
 * The supplied photograph is composed for this: a wide frame whose left third is
 * an empty cream field, with the salon under a curved cut-out and the STYLE rail
 * at its right edge. On desktop it fills the whole first screen, anchored right so
 * the rail stays in frame, with a cream scrim over the type. On mobile a crop of
 * the same photograph leads under the copy.
 */
export function Hero() {
  return (
    <section id="hero" aria-labelledby="hero-title" className="hero relative isolate overflow-hidden bg-hero">
      {/* ≥1024px: the approved desktop composition (display: contents keeps its layout identical) */}
      <div className="hidden lg:contents">
      {/* The photograph is the whole screen; the copy sits on its cream field */}
      <div className="hero-art absolute inset-0 overflow-hidden">
        <div className="hero-settle absolute inset-0">
          <MediaImage
            /* Below 1024px the browser picks a blank source: phones never fetch this photo */
            skip="(max-width: 1023.98px)"
            src="/images/hero/home-hero.webp"
            alt="Inside Express Cuts Men's Salon in KR Puram — styling chairs, product shelves and the reception desk"
            fill
            loading="eager"
            fetchPriority="high"
            quality={85}
            sizes="100vw"
            className="object-cover object-right"
          />
        </div>
        <div aria-hidden className="hero-scrim absolute inset-0" />
      </div>

      <div className="shell relative lg:flex lg:h-full lg:items-center lg:pb-[3vh] lg:pt-[var(--nav-h)]">
        <div className="relative -mt-10 pb-16 sm:-mt-14 lg:mt-0 lg:max-w-[540px] lg:pb-0">
          <p className="hero-rise eyebrow text-ink-muted" style={d(100)}>
            Grooming beyond ordinary
          </p>

          <h1
            id="hero-title"
            className="mt-5 font-display text-[clamp(3.1rem,6.2vw,5.5rem)] font-semibold leading-[0.98] tracking-[-0.025em] lg:mt-6"
          >
            <span className="hero-line">
              <span style={d(180)}>A Better</span>
            </span>
            <span className="hero-line">
              <span style={d(300)}>
                You <em className="font-medium text-champagne">Everyday</em>
              </span>
            </span>
          </h1>

          <p className="hero-rise mt-5 text-[18px] leading-[1.55] text-ink-soft" style={d(520)}>
            Hair. Beard. Skin. Style.
            <br />
            Everything a modern man needs.
          </p>

          <div className="hero-rise mt-8 flex flex-wrap items-center gap-3" style={d(640)}>
            <WaBtn2 size="lg" href={waLink("Hi, I'd like to book a slot at Express Cuts.")} />
            <a href={TEL} className={btn("outline", "lg", "bg-hero/60")}>
              <Phone aria-hidden className="size-4" strokeWidth={1.6} />
              Call Now
            </a>
          </div>

          <p className="hero-rise mt-5 text-[15px] font-medium text-ink" style={d(720)}>
            Haircuts from{" "}
            <span className="tabular text-[17px] font-extrabold tracking-[-0.02em] text-price">₹{HAIRCUT_FROM}</span>
            <span aria-hidden className="mx-2 text-ink-muted">
              ·
            </span>
            Walk-ins welcome
          </p>

          <div className="hero-rise mt-6 flex flex-wrap items-center gap-x-5 gap-y-3" style={d(820)}>
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 text-[13.5px] text-ink-soft underline-offset-4 hover:underline"
            >
              <span className="font-display text-[26px] font-semibold leading-none tracking-[-0.02em] text-ink">
                {GOOGLE_RATING.value.toFixed(1)}
              </span>
              <Stars value={GOOGLE_RATING.value} />
              <span>
                <span className="tabular font-semibold text-ink">{GOOGLE_RATING.count}</span> Google reviews
              </span>
            </a>
            <span aria-hidden className="hidden h-6 w-px bg-ink/20 sm:block" />
            <OpenStatus variant="plain" />
          </div>

          <a
            href="#services"
            className="hero-rise mt-8 hidden items-center gap-3 text-[13px] font-medium text-ink-muted transition-colors hover:text-ink lg:inline-flex [@media(max-height:780px)]:hidden"
            style={d(960)}
          >
            <span className="grid size-9 place-items-center rounded-full border border-ink/20">
              <ArrowDown aria-hidden className="bob size-3.5" strokeWidth={1.6} />
            </span>
            Scroll to explore
          </a>
        </div>
      </div>
      </div>

      {/* <1024px: its own composition, from the mobile reference */}
      <HeroMobile />
    </section>
  );
}
