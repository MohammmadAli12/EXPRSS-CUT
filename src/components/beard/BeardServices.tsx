import { MessageCircle } from "lucide-react";
import { waLink } from "@/lib/site";
import { BEARD_MENU_MESSAGE, BEARD_SERVICES } from "@/data/beard";
import { Arrow, Eyebrow, btn } from "@/components/ui/button";
import { Reveal } from "@/components/motion/Reveal";
import { WaBtn2 } from "@/components/offer-card/actions";

/**
 * A short menu. Only the owner-confirmed price is printed; the other services
 * are named without prices, and the full menu is requested on WhatsApp.
 */
export function BeardServices() {
  return (
    <section aria-labelledby="beard-services-title" className="bg-ivory py-16 lg:py-24">
      <div className="shell grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
        <Reveal>
          <Eyebrow>Beard services</Eyebrow>
          <h2
            id="beard-services-title"
            className="mt-4 font-display text-[clamp(2rem,3.4vw,2.8rem)] font-semibold leading-[1.04] tracking-[-0.015em]"
          >
            Professional Beard Grooming
          </h2>
          <p className="mt-5 max-w-[40ch] text-[16px] leading-[1.6] text-ink-soft">
            Trims, shaping, line-ups and clean shaves at our men&rsquo;s salon in KR Puram.
          </p>
          <a
            href={waLink(BEARD_MENU_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className={btn("outline", "md", "mt-8")}
          >
            <MessageCircle aria-hidden className="size-4" strokeWidth={1.6} />
            View Full Beard Menu <Arrow external />
          </a>
        </Reveal>

        <ul className="border-t border-line">
          {BEARD_SERVICES.map((service, i) => (
            <li key={service.id} className="border-b border-line">
              <Reveal delay={i * 0.05} className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 py-6">
                <div className="min-w-0 flex-1 basis-[16rem]">
                  <h3 className="text-[19px] font-semibold leading-tight tracking-[-0.01em] text-ink">
                    {service.name}
                  </h3>
                  <p className="mt-1.5 text-[14.5px] leading-[1.5] text-ink-soft">{service.line}</p>
                </div>

                {service.price ? (
                  <div className="flex items-center gap-5">
                    <p className="flex items-baseline gap-2.5">
                      <span className="sr-only">Regular price</span>
                      <s className="tabular text-[16px] font-medium text-ink-muted decoration-ink-muted">
                        ₹{service.price.actual}
                      </s>
                      <span className="sr-only">, offer price</span>
                      <span className="tabular text-[32px] font-extrabold leading-none tracking-[-0.035em] text-price">
                        ₹{service.price.offer}
                      </span>
                    </p>
                    <WaBtn2
                      size="sm"
                      context={`about ${service.name}`}
                      href={waLink(`Hi, I'd like to book ${service.name} at Express Cuts.`)}
                    />
                  </div>
                ) : (
                  <p className="text-[13px] font-medium text-ink-muted">Ask for pricing</p>
                )}
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
