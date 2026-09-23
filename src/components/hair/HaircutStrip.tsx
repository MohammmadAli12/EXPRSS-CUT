import { BadgeCheck, Clock, UserRound } from "lucide-react";
import { POPULAR_SERVICES } from "@/data/popular";
import { Eyebrow } from "@/components/ui/button";
import { Reveal } from "@/components/motion/Reveal";
import { WaBtn2 } from "@/components/offer-card/actions";
import { waLink } from "@/lib/site";

/* Single source of truth for the entry price — the salon's own service record */
const HAIRCUT = POPULAR_SERVICES[0];

const META = [
  { icon: Clock, label: "~ 30 mins" },
  { icon: UserRound, label: "Walk-ins Welcome" },
  { icon: BadgeCheck, label: "Best Value" },
];

/** The entry price, stated once and unmistakably, directly under the hero. */
export function HaircutStrip() {
  return (
    <section aria-labelledby="haircut-price-title" className="bg-ivory pb-14 pt-12 lg:pb-16 lg:pt-14">
      <div className="shell">
        <Reveal>
          <div className="flex flex-col gap-7 rounded-[18px] border border-line bg-paper px-6 py-7 shadow-card sm:px-8 lg:flex-row lg:items-center lg:gap-10 lg:px-10 lg:py-8">
            <div className="lg:min-w-0 lg:flex-1">
              <Eyebrow>Popular choice</Eyebrow>
              <h2
                id="haircut-price-title"
                className="mt-3 font-display text-[clamp(1.9rem,3vw,2.5rem)] font-semibold leading-[1.05] tracking-[-0.015em]"
              >
                {HAIRCUT.title}
              </h2>
              <p className="mt-2 text-[15px] leading-snug text-ink-soft">{HAIRCUT.description[0]}</p>
            </div>

            <p className="flex items-baseline gap-3 lg:shrink-0">
              <span className="tabular text-[clamp(2.4rem,4vw,3rem)] font-extrabold leading-none tracking-[-0.035em] text-price">
                ₹{HAIRCUT.price.offer}
              </span>
              <span className="sr-only">offer price, regular price</span>
              <s className="tabular text-[18px] font-medium text-ink-muted decoration-ink-muted decoration-1">
                ₹{HAIRCUT.price.actual}
              </s>
            </p>

            <span aria-hidden className="hidden h-14 w-px bg-line lg:block" />

            <ul className="flex flex-wrap items-center gap-x-7 gap-y-3 lg:shrink-0 lg:gap-x-8">
              {META.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-2.5">
                  <Icon aria-hidden className="size-[17px] text-ink-muted" strokeWidth={1.5} />
                  <span className="text-[13.5px] font-medium text-ink">{label}</span>
                </li>
              ))}
            </ul>

            <WaBtn2
              size="md"
              className="lg:shrink-0"
              context={`about the ${HAIRCUT.title}`}
              href={waLink(`Hi, I'd like to book the ${HAIRCUT.title} at Express Cuts.`)}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
