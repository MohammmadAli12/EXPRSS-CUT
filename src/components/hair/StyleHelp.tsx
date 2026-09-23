import Image from "next/image";
import Link from "next/link";
import { HAIR_GUIDE_HREF, HAIR_GUIDE_TOPICS } from "@/data/hair";
import { Arrow, Eyebrow, btn } from "@/components/ui/button";
import { Reveal } from "@/components/motion/Reveal";
import { WaBtn2 } from "@/components/offer-card/actions";
import { waLink } from "@/lib/site";

/** Two paired blocks: help choosing a style now, and the guide to read later. */
export function StyleHelp() {
  return (
    <section aria-labelledby="style-help-title" className="bg-ivory py-16 lg:py-20">
      <div className="shell grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        {/* Try a New Style */}
        <Reveal variant="clip">
          <article className="on-dark relative flex min-h-[330px] overflow-hidden rounded-[18px] bg-charcoal text-ivory">
            <div className="relative w-[38%] shrink-0 overflow-hidden sm:w-[36%]">
              <Image
                src="/images/offers/platinum.png"
                alt="Client in the chair after a fresh cut and style"
                fill
                sizes="(min-width: 1024px) 300px, 38vw"
                className="object-cover object-[54%_26%]"
              />
              <div
                aria-hidden
                className="absolute inset-y-0 right-0 w-2/5 bg-gradient-to-r from-charcoal/0 to-charcoal"
              />
            </div>

            <div className="flex flex-1 flex-col justify-center p-6 sm:p-8 lg:p-10">
              <Eyebrow className="text-ivory-muted">New here?</Eyebrow>
              <h2
                id="style-help-title"
                className="mt-4 font-display text-[clamp(1.9rem,3vw,2.6rem)] font-semibold leading-[1.04] tracking-[-0.02em]"
              >
                Try a New Style.
              </h2>
              <p className="mt-4 max-w-[30ch] text-[15.5px] leading-[1.55] text-ivory-soft">
                Not sure what suits you?
                <br />
                Our barbers will guide you.
              </p>
              <div className="mt-7">
                <WaBtn2
                  size="md"
                  label="Get a Style Recommendation"
                  context="about which haircut would suit me"
                  href={waLink("Hi, I'd like a haircut recommendation for my hair type.")}
                />
              </div>
            </div>
          </article>
        </Reveal>

        {/* Men's Hair Guide */}
        <Reveal variant="clip" delay={0.08}>
          <article className="relative flex h-full min-h-[330px] flex-col justify-center overflow-hidden rounded-[18px] border border-line bg-cream p-6 sm:p-8">
            <Eyebrow>Guide</Eyebrow>
            <h2
              id="hair-guide-title"
              className="mt-4 max-w-[12ch] font-display text-[clamp(1.8rem,2.6vw,2.3rem)] font-semibold leading-[1.05] tracking-[-0.015em]"
            >
              Men&rsquo;s Hair Guide
            </h2>
            <p className="mt-4 max-w-[34ch] text-[15px] leading-[1.55] text-ink-soft">
              Find the right cut, learn how to maintain it, and get styling tips from our experts.
            </p>

            <ul className="mt-6 flex flex-wrap gap-2">
              {HAIR_GUIDE_TOPICS.map((topic) => (
                <li
                  key={topic}
                  className="rounded-full border border-line bg-paper px-3.5 py-1.5 text-[12px] font-medium text-ink-soft"
                >
                  {topic}
                </li>
              ))}
            </ul>

            <div className="mt-7">
              <Link href={HAIR_GUIDE_HREF} prefetch={false} className={btn("outline", "md")}>
                Read the Hair Guide <Arrow />
              </Link>
            </div>

            {/* Reference's inset portrait and script mark, on wide cards only */}
            <div aria-hidden className="pointer-events-none absolute bottom-6 right-6 hidden w-[132px] xl:block">
              <div className="relative aspect-[3/4] overflow-hidden rounded-[12px]">
                <Image
                  src="/images/hair/cuts/classic-side-part.png"
                  alt=""
                  fill
                  sizes="132px"
                  className="object-cover object-[52%_18%]"
                />
              </div>
              <p className="mt-2 text-center font-script text-[26px] leading-none text-champagne">
                A better you
              </p>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
