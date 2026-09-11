import Image from "next/image";
import { ArrowDown, Phone } from "lucide-react";
import { TEL } from "@/lib/site";
import { Arrow, btn } from "@/components/ui/button";
import { BookTrigger } from "@/components/booking/BookTrigger";

const d = (ms: number) => ({ "--d": ms }) as React.CSSProperties;

/**
 * The supplied photograph is composed for this: a 3:2 frame whose left third is
 * an empty cream field. On desktop it sits below the navigation, anchored right
 * and blended into the page ground; on mobile it leads, cropped to barber +
 * client, and dissolves into the ivory where the copy begins.
 */
export function Hero() {
  return (
    <section id="hero" aria-labelledby="hero-title" className="hero relative isolate overflow-hidden bg-hero">
      <div className="hero-art relative h-[min(70svh,620px)] w-full overflow-hidden pt-[var(--nav-h)] lg:h-auto lg:pt-0">
        <div className="relative h-full w-full overflow-hidden">
          <div className="hero-settle absolute inset-0">
            <Image
              src="/images/hero/hero.png"
              alt="Barber styling a client's textured haircut in the salon chair"
              fill
              preload
              quality={85}
              sizes="(min-width: 1024px) 100vw, 100vw"
              className="object-cover object-[63%_0%] lg:object-[50%_0%]"
            />
          </div>
        </div>
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-b from-hero/0 to-hero lg:hidden"
        />
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
            <BookTrigger className={btn("ink", "lg")}>
              Book Your Appointment <Arrow />
            </BookTrigger>
            <a href={TEL} className={btn("outline", "lg", "bg-hero/60")}>
              <Phone aria-hidden className="size-4" strokeWidth={1.6} />
              Call Now
            </a>
          </div>

          <a
            href="#services"
            className="hero-rise group/btn mt-5 inline-flex items-center gap-2 text-[14px] font-medium text-ink underline-offset-[6px] hover:underline"
            style={d(720)}
          >
            Explore Services <Arrow className="size-3.5" />
          </a>

          <div className="hero-rise mt-9 flex items-center gap-4" style={d(820)}>
            <span className="font-display text-[38px] font-semibold leading-none tracking-[-0.02em]">
              2020
            </span>
            <span className="h-9 w-px bg-ink/20" aria-hidden />
            <p className="text-[13.5px] leading-[1.5] text-ink-muted">
              <span className="block font-medium text-ink">Quality grooming. Value-based pricing.</span>
              Serving KR Puram since 2020
            </p>
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
    </section>
  );
}
