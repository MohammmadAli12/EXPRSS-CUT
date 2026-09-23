import { Clock, MapPin, Navigation, Phone } from "lucide-react";
import { HOURS, SITE, TEL } from "@/lib/site";
import { Eyebrow } from "@/components/ui/button";
import { Reveal } from "@/components/motion/Reveal";
import { OpenStatus } from "@/components/sections/OpenStatus";
import { CallNow } from "@/components/ui/CallNow";

/* "08:00 AM – 10:00 PM" → "8 AM–10 PM" */
const compact = (display: string) =>
  display.replace(/0?(\d{1,2}):00 (AM|PM)/g, "$1 $2").replace(/\s*–\s*/, "–");

/** Address · hours and the call · map, in one short band. */
export function HairSpaVisit() {
  return (
    <section id="find-us" aria-labelledby="spa-visit-title" className="bg-hero py-12 lg:py-14">
      <div className="shell grid gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:items-center lg:gap-10">
        <Reveal>
          <Eyebrow>Visit Express Cuts</Eyebrow>
          <h2
            id="spa-visit-title"
            className="mt-3 font-display text-[clamp(2rem,3.2vw,2.6rem)] font-semibold leading-[1.04] tracking-[-0.015em]"
          >
            Men&rsquo;s Hair Spa Near KR Puram
          </h2>

          <div className="mt-6 grid gap-6 sm:grid-cols-2 sm:gap-8">
            <div className="flex gap-3">
              <MapPin aria-hidden className="mt-0.5 size-5 shrink-0 text-price" strokeWidth={1.8} />
              <div>
                <h3 className="text-[15.5px] font-semibold leading-snug text-ink">{SITE.name} – KR Puram</h3>
                <address className="mt-1 text-[14.5px] not-italic leading-relaxed text-ink-soft">
                  {SITE.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </div>
            </div>

            <ul className="space-y-2.5 text-[14.5px] text-ink-soft">
              <li className="flex gap-3">
                <Clock aria-hidden className="mt-0.5 size-[18px] shrink-0 text-ink" strokeWidth={1.6} />
                <span>
                  {HOURS.map((h) => (
                    <span key={h.label} className="tabular block">
                      {h.short.replace(/ – /, "–")} · {compact(h.display)}
                    </span>
                  ))}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone aria-hidden className="size-[18px] shrink-0 text-ink" strokeWidth={1.6} />
                <a href={TEL} className="tabular font-semibold text-ink underline decoration-ink/25 underline-offset-4 hover:decoration-ink">
                  {SITE.phoneDisplay}
                </a>
              </li>
              <li>
                <OpenStatus />
              </li>
            </ul>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4">
            <CallNow size="md" className="w-full sm:w-auto" />
            <a
              href={SITE.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[14px] font-medium text-ink underline decoration-ink/25 underline-offset-4 transition-colors hover:decoration-ink"
            >
              <Navigation aria-hidden className="size-4" strokeWidth={1.6} />
              Get directions
              <span className="sr-only">(opens Google Maps)</span>
            </a>
          </div>
        </Reveal>

        <Reveal variant="clip" delay={0.1}>
          <div className="overflow-hidden rounded-[18px] bg-paper shadow-card">
            <iframe
              title="Google Map showing Express Cuts Men's Salon in Ayyappa Nagar, KR Puram"
              src={SITE.mapsEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block h-[220px] w-full border-0 bg-cream sm:h-[280px]"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
