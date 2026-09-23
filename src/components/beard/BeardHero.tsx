import { Droplets, Phone, Scissors, ShieldCheck, UserRound } from "lucide-react";
import { SITE, TEL, waLink } from "@/lib/site";
import { BEARD_OFFER } from "@/data/beard";
import { btn } from "@/components/ui/button";
import { MediaImage } from "@/components/ui/MediaImage";
import { WaBtn2 } from "@/components/offer-card/actions";

const d = (ms: number) => ({ "--d": ms }) as React.CSSProperties;

const TRUST = [
  { icon: Scissors, label: "Expert Barbers" },
  { icon: ShieldCheck, label: "Hygienic & Safe" },
  { icon: UserRound, label: "Walk-ins Welcome" },
  { icon: Droplets, label: "Premium Products" },
];

const ALT = "Barber trimming a client's beard with scissors and a comb at Express Cuts";

/** Offer chip laid over the photograph — the price is part of the first impression */
function PriceChip({ className }: { className?: string }) {
  return (
    <p
      className={`flex items-center gap-3 rounded-[14px] bg-ivory/95 px-4 py-3 shadow-float ${className ?? ""}`}
    >
      <span className="text-[12px] font-semibold leading-tight text-ink">
        {BEARD_OFFER.title}
        <span className="mt-0.5 block text-[11px] font-medium text-ink-muted">Walk-ins welcome</span>
      </span>
      <span className="sr-only">offer price</span>
      <span className="tabular text-[26px] font-extrabold leading-none tracking-[-0.03em] text-price">
        ₹{BEARD_OFFER.price.offer}
      </span>
      <span className="sr-only">, regular price</span>
      <s className="tabular text-[13px] font-medium text-ink-muted decoration-ink-muted">₹{BEARD_OFFER.price.actual}</s>
    </p>
  );
}

/**
 * The supplied photograph is a 2:3 close-up of the trim itself. Desktop: a tall
 * portrait panel set against the cream, square-cut and close — darker and more
 * intimate than the Hair page's sweeping curve. Phones: it leads, cropped to the
 * scissors and beard, dissolving into the page where the copy begins.
 */
export function BeardHero() {
  return (
    <section id="hero" aria-labelledby="beard-hero-title" className="relative isolate overflow-hidden bg-hero">
      {/* ≥1024px: the portrait panel, aligned to the shell's right edge */}
      <div
        className="absolute bottom-[clamp(28px,5vh,56px)] top-[calc(var(--nav-h)+14px)] hidden w-[clamp(380px,38vw,560px)] overflow-hidden rounded-[28px] rounded-tl-[160px] bg-charcoal shadow-card lg:block"
        style={{ right: "max(var(--gutter), calc((100% - 82rem) / 2 + var(--gutter)))" }}
      >
        <div className="hero-settle absolute inset-0">
          <MediaImage
            skip="(max-width: 1023.98px)"
            src="/images/beard/hero.png"
            alt={ALT}
            fill
            loading="eager"
            fetchPriority="high"
            quality={85}
            sizes="560px"
            className="object-cover object-[46%_42%]"
          />
        </div>
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-night/55 to-transparent" />
        <p className="absolute right-6 top-8 text-right text-[11px] font-semibold uppercase leading-[2] tracking-[0.24em] text-ink-soft [writing-mode:vertical-rl]">
          Shape · Precision · Line-up
        </p>
        <PriceChip className="hero-rise absolute bottom-6 left-6" />
      </div>

      {/* <1024px: photograph leads */}
      <div className="relative lg:hidden">
        <div className="relative h-[min(38svh,340px)] w-full overflow-hidden">
          <div className="hero-settle absolute inset-0">
            <MediaImage
              skip="(min-width: 1024px)"
              src="/images/beard/hero.png"
              alt={ALT}
              fill
              loading="eager"
              fetchPriority="high"
              quality={85}
              sizes="100vw"
              className="object-cover object-[46%_44%]"
            />
          </div>
          <div aria-hidden className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-b from-hero/0 to-hero" />
        </div>
      </div>

      <div className="shell relative lg:flex lg:h-[clamp(680px,100svh,900px)] lg:items-center lg:pb-[3vh] lg:pt-[var(--nav-h)]">
        <div className="relative -mt-10 pb-14 sm:-mt-14 lg:mt-0 lg:max-w-[min(540px,calc(100%-clamp(380px,38vw,560px)-3rem))] lg:pb-0">
          <p className="hero-rise eyebrow text-ink-muted" style={d(100)}>
            Beard Grooming
          </p>

          <h1
            id="beard-hero-title"
            className="mt-5 font-display text-[clamp(2.9rem,5.8vw,5.1rem)] font-semibold leading-[0.98] tracking-[-0.025em] lg:mt-6"
          >
            <span className="hero-line">
              <span style={d(180)}>More Than</span>
            </span>
            <span className="hero-line">
              <span style={d(280)}>
                a <em className="font-medium text-champagne">Trim.</em>
              </span>
            </span>
            <span className="hero-line">
              <span style={d(380)}>A Better You.</span>
            </span>
          </h1>

          <p className="hero-rise mt-5 text-[18px] font-medium leading-[1.5] text-ink" style={d(520)}>
            Precision grooming. Defined style.
            <br />
            More confidence, every day.
          </p>

          <p className="hero-rise mt-3.5 max-w-[46ch] text-[15.5px] leading-[1.6] text-ink-soft" style={d(580)}>
            From a clean trim to a bold beard style, our expert barbers in KR Puram shape, refine and
            maintain your look with precision.
          </p>

          {/* Phones: the offer sits right above the CTAs */}
          <PriceChip className="hero-rise mt-5 w-fit lg:hidden" />

          <div id="hero-cta" className="hero-rise mt-5 flex flex-wrap items-center gap-3 lg:mt-8" style={d(660)}>
            <WaBtn2 size="lg" href={waLink("Hi, I'd like to book a beard trim at Express Cuts.")} />
            <a href={TEL} aria-label={`Call ${SITE.phoneDisplay}`} className={btn("outline", "lg", "bg-hero/60")}>
              <Phone aria-hidden className="size-4" strokeWidth={1.6} />
              Call Now
            </a>
          </div>

          <ul className="hero-rise mt-9 grid max-w-[380px] grid-cols-2 gap-x-6 gap-y-3" style={d(780)}>
            {TRUST.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2">
                <Icon aria-hidden className="size-4 text-champagne" strokeWidth={1.6} />
                <span className="text-[13px] font-medium text-ink">{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
