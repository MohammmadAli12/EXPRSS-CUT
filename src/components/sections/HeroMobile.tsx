import { CalendarDays, PersonStanding, ShieldCheck } from "lucide-react";
import { SITE, TEL, waLink } from "@/lib/site";
import { HAIRCUT_FROM } from "@/data/popular";
import { GOOGLE_RATING, GOOGLE_REVIEWS_URL } from "@/data/reviews";
import { cn } from "@/lib/cn";
import { MediaImage } from "@/components/ui/MediaImage";
import { Stars } from "@/components/ui/Stars";
import { OpenStatus } from "./OpenStatus";
import { WaBtn2 } from "@/components/offer-card/actions";

const d = (ms: number) => ({ "--d": ms }) as React.CSSProperties;

const TRUST = [
  { icon: ShieldCheck, label: "Hygienic & Safe" },
  { icon: PersonStanding, label: "Walk-ins Welcome" },
  { icon: CalendarDays, label: `Since ${SITE.established}` },
];

/**
 * Phones and tablets (<1024px) — composed from `hero refrence mobile view4.png`.
 * Copy leads on the photo's own cream (the ground is sampled from it), and the
 * supplied mobile photograph's baked-in curved top is the transition into it.
 * The CTA bar is the bottom of the hero, not a floating element.
 */
export function HeroMobile() {
  return (
    <div className="bg-hero-mobile lg:hidden">
      <div className="shell pt-[calc(var(--nav-h)+4px)]">
        <div className="mx-auto max-w-[560px]">
          <p className="hero-rise eyebrow text-ink-muted" style={d(80)}>
            Grooming beyond ordinary
          </p>

          <h1 className="mt-3 font-display text-[clamp(2.75rem,12vw,3.5rem)] font-semibold leading-[0.98] tracking-[-0.025em]">
            <span className="hero-line">
              <span style={d(160)}>A Better</span>
            </span>
            <span className="hero-line">
              <span style={d(280)}>
                You <em className="font-medium text-champagne">Everyday.</em>
              </span>
            </span>
          </h1>

          <p className="hero-rise mt-3 text-[17px] leading-[1.45] text-ink-soft" style={d(420)}>
            Men&rsquo;s haircuts, beard &amp; grooming
            <br />
            in KR Puram, Bengaluru.
          </p>

          <div className="hero-rise mt-5" style={d(520)}>
            <WaBtn2 size="lg" className="w-full" href={waLink("Hi, I'd like to book a slot at Express Cuts.")} />
            <p className="mt-2.5 text-center text-[14.5px] text-ink-soft">
              or call{" "}
              <a
                href={TEL}
                className="font-semibold text-ink underline decoration-ink/30 underline-offset-4 transition-colors hover:decoration-ink"
              >
                {SITE.phoneDisplay}
              </a>
            </p>
          </div>

          <div className="hero-rise mt-5 flex flex-col items-start gap-1.5" style={d(620)}>
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[14px] text-ink-soft underline-offset-4 hover:underline"
            >
              <span className="font-display text-[24px] font-semibold leading-none tracking-[-0.02em] text-ink">
                {GOOGLE_RATING.value.toFixed(1)}
              </span>
              <Stars value={GOOGLE_RATING.value} />
              <span>
                <span aria-hidden>· </span>
                <span className="tabular font-semibold text-ink">{GOOGLE_RATING.count}</span> Google reviews
              </span>
            </a>
            <OpenStatus variant="plain" />
          </div>

          <ul
            aria-label="Why clients choose Express Cuts"
            className="hero-rise mt-4 grid grid-cols-3 border-t border-line pt-3.5"
            style={d(720)}
          >
            {TRUST.map(({ icon: Icon, label }, i) => (
              <li
                key={label}
                className={cn(
                  "flex flex-col items-center gap-2 px-1 text-center text-[13px] font-medium leading-tight text-ink-soft",
                  i > 0 && "border-l border-line",
                )}
              >
                <Icon aria-hidden className="size-6 text-ink" strokeWidth={1.4} />
                {label}
              </li>
            ))}
          </ul>

          <p className="hero-rise mt-4 text-center text-[14px] text-ink" style={d(800)}>
            ₹{HAIRCUT_FROM} haircut · walk-in · no hidden charges.
          </p>
        </div>
      </div>

      <div className="relative mt-1 aspect-[940/810] w-full overflow-hidden">
        <div className="hero-settle absolute inset-0">
          <MediaImage
            /* From 1024px the browser picks a blank source: desktop never fetches this photo */
            skip="(min-width: 1024px)"
            src="/images/hero/home-hero-mobile.webp"
            alt="Inside Express Cuts Men's Salon in KR Puram — styling chairs, product shelves and the reception desk"
            fill
            loading="eager"
            fetchPriority="high"
            quality={85}
            sizes="100vw"
            className="object-cover object-top"
          />
        </div>
        {/* Dissolves the photograph's top edge into the copy's ground */}
        <div aria-hidden className="absolute inset-x-0 top-0 h-[9%] bg-gradient-to-b from-hero-mobile to-transparent" />
      </div>

      {/* The price the hero opened with, restated under the photograph. The hero's
          one action is the WhatsApp pill above — no second pair of buttons here. */}
      <div id="hero-cta" className="border-t border-line bg-paper">
        <div className="shell">
          <p className="mx-auto flex max-w-[560px] items-center gap-2 py-3">
            <span className="sr-only">Haircuts from </span>
            <span className="tabular text-[28px] font-extrabold leading-none tracking-[-0.035em] text-ink">
              ₹{HAIRCUT_FROM}
            </span>
            <span aria-hidden className="border-l border-line pl-2 text-[12px] font-medium leading-tight text-ink-soft">
              Haircut
              <br />
              From
            </span>
            <span className="ml-auto text-[13.5px] text-ink-soft">Walk-ins welcome · 7 days</span>
          </p>
        </div>
      </div>
    </div>
  );
}
