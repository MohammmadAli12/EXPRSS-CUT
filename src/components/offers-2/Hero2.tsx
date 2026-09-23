import { CalendarDays, Clock, Star } from "lucide-react";
import { HERO_2, waGeneral2 } from "@/data/offers-2";
import { GOOGLE_RATING } from "@/data/reviews";
import { MediaImage } from "@/components/ui/MediaImage";
import { CallBtn2, WaBtn2 } from "./ui2";

/** The photograph's edge dissolves into the cream — no hard seam, as in the design */
const FADE_LEFT = {
  WebkitMaskImage: "linear-gradient(to right, transparent, #000 30%)",
  maskImage: "linear-gradient(to right, transparent, #000 30%)",
} as const;
const FADE_TOP = {
  WebkitMaskImage: "linear-gradient(to bottom, transparent, #000 24%)",
  maskImage: "linear-gradient(to bottom, transparent, #000 24%)",
} as const;

/**
 * Split hero: copy on the cream left, the photograph filling the right and fading
 * into the cream. Phones put the copy first with the photograph beneath it.
 */
export function Hero2() {
  return (
    <section id="hero" aria-labelledby="o2-hero-title" className="relative isolate overflow-hidden bg-[#f6f1e9]">
      {/* ≥1024px: the photograph bleeds to the right edge of the window, as in the design */}
      <div className="mx-auto w-full max-w-[1240px] px-5 sm:px-6 lg:grid lg:min-h-[calc(100vh-var(--nav-h))] lg:grid-cols-[minmax(0,1fr)_38%] lg:supports-[height:100svh]:min-h-[calc(100svh-var(--nav-h))] lg:items-center lg:gap-0">
        <div className="relative z-10 py-7 lg:py-14 lg:pr-12">
          <p className="text-[11.5px] font-medium uppercase tracking-[0.28em] text-[#b0834f]">
            Exclusive offers · KR Puram
          </p>

          <h1
            id="o2-hero-title"
            className="mt-4 font-[family-name:var(--font-o2-serif)] lg:mt-6 text-[clamp(2.3rem,4.6vw,4.3rem)] font-semibold leading-[1.06] tracking-[-0.01em] text-[#1a1612]"
          >
            Men&rsquo;s Grooming
            <br />
            Offers in <em className="italic text-[#b0834f]">KR Puram</em>
          </h1>

          <p className="mt-4 max-w-[46ch] text-[15.5px] leading-relaxed text-[#4a423b] lg:mt-6 lg:text-[17px]">
            Haircuts, beard grooming, facials and complete grooming packages in KR Puram, Bengaluru.
          </p>

          <ul className="mt-5 flex flex-wrap items-center gap-x-7 gap-y-3 lg:mt-8 lg:gap-x-9">
            <li className="flex items-center gap-2.5">
              <Star aria-hidden className="size-6 shrink-0 text-[#b0834f]" fill="currentColor" strokeWidth={0} />
              <span>
                <span className="tabular block text-[15px] font-semibold leading-tight text-[#1a1612]">
                  {GOOGLE_RATING.value.toFixed(1)} <span className="text-[#b0834f]">★</span>
                </span>
                <span className="mt-0.5 block text-[12px] leading-tight text-[#6b625a]">
                  {GOOGLE_RATING.count}+ Google Reviews
                </span>
              </span>
            </li>
            <li className="flex items-center gap-2.5">
              <Clock aria-hidden className="size-6 shrink-0 text-[#b0834f]" strokeWidth={1.5} />
              <span>
                <span className="block text-[14.5px] font-semibold leading-tight text-[#1a1612]">Walk-ins till</span>
                <span className="mt-0.5 block text-[12px] leading-tight text-[#6b625a]">9:30 PM</span>
              </span>
            </li>
            <li className="flex items-center gap-2.5">
              <CalendarDays aria-hidden className="size-6 shrink-0 text-[#b0834f]" strokeWidth={1.5} />
              <span>
                <span className="block text-[14.5px] font-semibold leading-tight text-[#1a1612]">Open all days</span>
                <span className="mt-0.5 block text-[12px] leading-tight text-[#6b625a]">8 AM – 10 PM</span>
              </span>
            </li>
          </ul>

          <div id="hero-cta" className="mt-6 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap lg:mt-9 lg:gap-4">
            <CallBtn2 size="lg" />
            <WaBtn2 size="lg" href={waGeneral2("Hi, I saw your offers page. I'd like to book a slot.")} />
          </div>

          <p className="mt-4 text-[12.5px] text-[#6b625a] lg:mt-6">
            All prices as listed · No hidden charges · Walk-ins welcome
          </p>
        </div>

        {/* The photograph: right half on desktop, under the copy on phones */}
        <div className="relative -mx-5 h-[clamp(240px,34svh,330px)] sm:-mx-6 lg:absolute lg:inset-y-0 lg:right-0 lg:mx-0 lg:h-auto lg:w-[min(52vw,940px)]">
          <div className="absolute inset-0 lg:hidden" style={FADE_TOP}>
            <MediaImage
              skip="(min-width: 1024px)"
              src={HERO_2.src}
              alt={HERO_2.alt}
              fill
              loading="eager"
              fetchPriority="high"
              quality={85}
              sizes="100vw"
              className="object-cover object-[center_30%]"
            />
          </div>
          <div className="absolute inset-0 hidden lg:block" style={FADE_LEFT}>
            <MediaImage
              skip="(max-width: 1023.98px)"
              src={HERO_2.src}
              alt=""
              aria-hidden
              fill
              loading="eager"
              fetchPriority="high"
              quality={85}
              sizes="47vw"
              className="object-cover object-[center_30%]"
            />
          </div>

          <p
            aria-hidden
            className="absolute right-4 top-4 text-right text-[10.5px] font-semibold uppercase leading-[1.9] tracking-[0.3em] text-[#e6c79a] [text-shadow:0_2px_10px_rgb(15_14_13/0.8)] sm:right-6 lg:right-10 lg:top-[8%]"
          >
            Good
            <br />
            Hair
            <br />
            Better
            <br />
            You
          </p>

          <p
            aria-hidden
            className="absolute bottom-6 right-5 text-right font-[family-name:var(--font-o2-script)] text-[clamp(30px,3.4vw,46px)] leading-[1.05] text-[#f6f1e9] [text-shadow:0_2px_16px_rgb(15_14_13/0.7)] sm:right-8 lg:bottom-[8%] lg:right-10"
          >
            A New You
            <br />
            Everyday
          </p>
        </div>
      </div>
    </section>
  );
}
