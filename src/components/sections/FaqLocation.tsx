import { MapPin, MessageCircle, Phone } from "lucide-react";
import { OPEN_ALL_WEEK, SITE, TEL, waLink } from "@/lib/site";
import { Arrow, Eyebrow, btn } from "@/components/ui/button";
import { HoursList } from "@/components/ui/HoursList";
import { FaqList } from "./FaqSection";
import { OpenStatus } from "./OpenStatus";

/** FAQ on the left, map + visit details on the right — one compact screen. */
export function FaqLocation() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="bg-ivory pb-20 lg:pb-28">
      <div className="shell grid gap-12 border-t border-line pt-16 lg:grid-cols-12 lg:gap-12 lg:pt-20">
        <div className="lg:col-span-7">
          <Eyebrow>FAQ</Eyebrow>
          <h2
            id="faq-title"
            className="mt-5 font-display text-[clamp(2.1rem,3.5vw,2.9rem)] font-semibold leading-[1.04] tracking-[-0.015em]"
          >
            Frequently Asked Questions
          </h2>
          <FaqList className="mt-8" />
        </div>

        <aside id="find-us" aria-labelledby="find-us-title" className="lg:col-span-5">
          <div className="lg:sticky lg:top-[calc(var(--nav-h)+24px)]">
            <h2 id="find-us-title" className="eyebrow text-ink-muted">
              Find us
            </h2>
            <div className="mt-5 overflow-hidden rounded-[18px] bg-paper shadow-card">
              <iframe
                title="Google Map showing Express Cuts Men's Salon in Ayyappa Nagar, KR Puram"
                src={SITE.mapsEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block h-[220px] w-full border-0 bg-cream sm:h-[240px]"
              />
              <div className="p-6 sm:p-7">
                <h3 className="text-[18px] font-semibold leading-snug text-ink">{SITE.name}</h3>
                <address className="mt-2 text-[15px] not-italic leading-relaxed text-ink-soft">
                  {SITE.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
                <p className="mt-2 flex items-center gap-2 text-[13.5px] text-ink-muted">
                  <MapPin aria-hidden className="size-3.5 shrink-0" strokeWidth={1.6} />
                  {SITE.landmark}
                </p>

                <div className="mt-5 border-t border-line pt-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    {OPEN_ALL_WEEK && <p className="eyebrow text-ink">Open 7 days</p>}
                    <OpenStatus />
                  </div>
                  <HoursList className="mt-4" />
                </div>

                <div className="mt-6 grid grid-cols-2 gap-2">
                  <a href={TEL} aria-label={`Call ${SITE.phoneDisplay}`} className={btn("call", "sm")}>
                    <Phone aria-hidden className="size-4" strokeWidth={1.8} />
                    Call
                  </a>
                  <a href={waLink()} target="_blank" rel="noopener noreferrer" className={btn("call", "sm")}>
                    <MessageCircle aria-hidden className="size-4" strokeWidth={1.8} />
                    WhatsApp
                  </a>
                  <a
                    href={SITE.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={btn("ink", "sm", "col-span-2")}
                  >
                    Get Directions <Arrow external className="size-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
