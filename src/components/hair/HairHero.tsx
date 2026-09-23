import { Phone, Scissors, ShieldCheck, Sparkles, UserRound } from "lucide-react";
import { TEL, waLink } from "@/lib/site";
import { btn } from "@/components/ui/button";
import { MediaImage } from "@/components/ui/MediaImage";
import { WaBtn2 } from "@/components/offer-card/actions";

const d = (ms: number) => ({ "--d": ms }) as React.CSSProperties;

const TRUST = [
  { icon: Sparkles, label: "Trendy Styles", sub: "Classic to Modern" },
  { icon: Scissors, label: "Skilled Barbers", sub: "Style Experts" },
  { icon: ShieldCheck, label: "Hygienic & Safe", sub: "Clean Tools, Always" },
  { icon: UserRound, label: "Walk-ins Welcome", sub: "No Appointment Needed" },
];

const ALT = "Barber styling a client's textured haircut in the salon chair";

/**
 * The supplied hair photograph is 2:1 with a blurred cream left half. On desktop it
 * sits as a panel anchored right, curved where it meets the type column; on phones
 * it leads as a compact 4:3 band so the heading, price and CTA stay above the fold.
 */
export function HairHero() {
  return (
    <section
      id="hero"
      aria-labelledby="hair-hero-title"
      className="hair-hero relative isolate overflow-hidden bg-hero"
    >
      {/* ≥1024px: photograph as a right-anchored panel behind the type column */}
      <div className="hair-hero-art hidden lg:block">
        <div className="hero-settle absolute inset-0">
          <MediaImage
            /* Below 1024px the browser picks a blank source: phones never fetch this crop */
            skip="(max-width: 1023.98px)"
            src="/images/hair/hero.png"
            alt={ALT}
            fill
            loading="eager"
            fetchPriority="high"
            quality={85}
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="object-cover object-[62%_28%]"
          />
        </div>

        {/* Reference's editorial caption column, as real text over the photograph */}
        <div className="absolute inset-y-0 right-[clamp(20px,2.6vw,44px)] hidden flex-col justify-center gap-8 text-right text-ivory xl:flex">
          <p className="eyebrow leading-[2.1] text-ivory">
            Style
            <br />
            Your
            <br />
            Story
          </p>
          <span aria-hidden className="ml-auto h-10 w-px bg-champagne" />
          <p className="text-[11px] font-medium uppercase leading-[2] tracking-[0.22em] text-ivory-soft">
            Clean cuts.
            <br />
            Bold looks.
            <br />
            Real confidence.
          </p>
          <p className="eyebrow text-ivory-muted">Express Cuts</p>
        </div>
      </div>

      {/* <1024px: photograph leads, cropped to the client */}
      <div className="relative lg:hidden">
        <div className="relative h-[min(46svh,340px)] w-full overflow-hidden pt-[var(--nav-h)]">
          <div className="hero-settle absolute inset-0">
            <MediaImage
              skip="(min-width: 1024px)"
              src="/images/hair/hero.png"
              alt={ALT}
              fill
              loading="eager"
              fetchPriority="high"
              quality={85}
              sizes="100vw"
              className="object-cover object-[68%_26%]"
            />
          </div>
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-b from-hero/0 to-hero"
          />
        </div>
      </div>

      <div className="shell relative lg:flex lg:h-full lg:items-center lg:pb-[3vh] lg:pt-[var(--nav-h)]">
        <div className="relative -mt-8 pb-14 sm:-mt-10 lg:mt-0 lg:max-w-[560px] lg:pb-0">
          <p className="hero-rise eyebrow text-ink-muted" style={d(100)}>
            Hair Cut &amp; Styling
          </p>

          <h1
            id="hair-hero-title"
            className="mt-5 font-display text-[clamp(2.9rem,6vw,5.3rem)] font-semibold leading-[0.98] tracking-[-0.025em] lg:mt-6"
          >
            <span className="hero-line">
              <span style={d(180)}>More</span>
            </span>
            <span className="hero-line">
              <span style={d(280)}>Than Just</span>
            </span>
            <span className="hero-line">
              <span style={d(380)}>
                a <em className="font-medium text-champagne">Haircut.</em>
              </span>
            </span>
          </h1>

          <p className="hero-rise mt-5 text-[18px] font-medium leading-[1.5] text-ink" style={d(520)}>
            Precision cuts. Modern styles.
            <br />
            A more confident you.
          </p>

          <p className="hero-rise mt-3.5 max-w-[46ch] text-[15.5px] leading-[1.6] text-ink-soft" style={d(580)}>
            Whether it&rsquo;s a classic cut or a modern fade, our expert barbers deliver styles that
            match your personality and lifestyle.
          </p>

          <div id="hero-cta" className="hero-rise mt-8 flex flex-wrap items-center gap-3" style={d(660)}>
            <WaBtn2 size="lg" href={waLink("Hi, I'd like to book a men's haircut at Express Cuts.")} />
            <a href={TEL} className={btn("outline", "lg", "bg-hero/60")}>
              <Phone aria-hidden className="size-4" strokeWidth={1.6} />
              Call Now
            </a>
          </div>

          <ul
            className="hero-rise mt-9 grid max-w-[520px] grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4 sm:gap-x-4"
            style={d(780)}
          >
            {TRUST.map(({ icon: Icon, label, sub }) => (
              <li key={label}>
                <Icon aria-hidden className="size-[18px] text-ink" strokeWidth={1.5} />
                <p className="mt-2.5 text-[13px] font-semibold leading-tight text-ink">{label}</p>
                <p className="mt-1 text-[11.5px] leading-tight text-ink-muted">{sub}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
