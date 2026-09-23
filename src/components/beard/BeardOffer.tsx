import { BadgeCheck, Check, UserRound } from "lucide-react";
import { waLink } from "@/lib/site";
import { BEARD_OFFER } from "@/data/beard";
import { Reveal } from "@/components/motion/Reveal";
import { WaBtn2 } from "@/components/offer-card/actions";
import { CallBtn2 } from "@/components/offer-card/actions";

const INCLUDES = ["Clean Trim", "Shape", "Line-Up"];

/**
 * A promotion, not a price table: a dark title panel paired with a light price
 * panel, so the red ₹70 keeps full contrast while the band still reads as an event.
 */
export function BeardOffer() {
  const { offer, actual } = BEARD_OFFER.price;
  return (
    <section aria-labelledby="beard-offer-title" className="bg-ivory pb-16 pt-12 lg:pb-20 lg:pt-14">
      <div className="shell">
        <Reveal>
          <div className="grid overflow-hidden rounded-[18px] shadow-card lg:grid-cols-[minmax(300px,0.9fr)_2fr]">
            <div className="on-dark relative flex flex-col justify-center bg-night px-6 py-7 text-ivory sm:px-8 lg:px-10 lg:py-9">
              <p className="eyebrow text-champagne-soft">Limited time offer</p>
              <h2
                id="beard-offer-title"
                className="mt-3 font-display text-[clamp(1.9rem,3vw,2.5rem)] font-semibold uppercase leading-[1] tracking-[-0.01em]"
              >
                Beard Grooming
                <br />
                <span className="text-champagne-soft">Special</span>
              </h2>
              <p className="mt-3 text-[14px] text-ivory-soft">{BEARD_OFFER.title}</p>
            </div>

            <div className="flex flex-col gap-6 bg-paper px-6 py-7 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:px-10">
              <div>
                <p className="eyebrow text-ink-muted">Now at</p>
                <p className="mt-2 flex items-baseline gap-3">
                  <span className="sr-only">Offer price</span>
                  <span className="tabular text-[clamp(3rem,5vw,3.75rem)] font-extrabold leading-none tracking-[-0.04em] text-price">
                    ₹{offer}
                  </span>
                  <span className="sr-only">, regular price</span>
                  <s className="tabular text-[20px] font-semibold text-ink-soft decoration-ink-soft decoration-[1.5px]">
                    ₹{actual}
                  </s>
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <ul aria-label="Included" className="flex flex-wrap gap-x-5 gap-y-2">
                  {INCLUDES.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-[14px] font-medium text-ink">
                      <Check aria-hidden className="size-3.5 text-champagne" strokeWidth={2.2} />
                      {item}
                    </li>
                  ))}
                </ul>
                <ul className="flex flex-wrap gap-x-5 gap-y-2 border-t border-line pt-3">
                  <li className="flex items-center gap-2 text-[13px] text-ink-soft">
                    <UserRound aria-hidden className="size-4 text-ink-muted" strokeWidth={1.5} />
                    Walk-ins Welcome
                  </li>
                  <li className="flex items-center gap-2 text-[13px] text-ink-soft">
                    <BadgeCheck aria-hidden className="size-4 text-ink-muted" strokeWidth={1.5} />
                    Best Value
                  </li>
                </ul>
              </div>

              <div className="flex flex-wrap items-center gap-2 lg:shrink-0">
                <WaBtn2
                  size="md"
                  context={`about the ${BEARD_OFFER.title}`}
                  href={waLink(`Hi, I'd like to book the ${BEARD_OFFER.title} at Express Cuts.`)}
                />
                <CallBtn2 size="md" label="Call" context={`about the ${BEARD_OFFER.title}`} />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
