import { MapPin, Phone } from "lucide-react";
import { SITE, TEL } from "@/lib/site";
import { Arrow, Eyebrow, btn } from "@/components/ui/button";
import { HoursList } from "@/components/ui/HoursList";
import { OpenStatus } from "./OpenStatus";

export function VisitSalon() {
  return (
    <section aria-labelledby="visit-title" className="bg-ivory pb-24 lg:pb-32">
      <div className="shell grid gap-12 border-t border-line pt-16 lg:grid-cols-12 lg:items-center lg:gap-10 lg:pt-20">
        <div className="lg:col-span-6">
          <Eyebrow>Find us</Eyebrow>
          <h2
            id="visit-title"
            className="mt-5 font-display text-[clamp(2.3rem,4vw,3.3rem)] font-semibold leading-[1.04] tracking-[-0.015em]"
          >
            {SITE.neighbourhood}
          </h2>
          <p className="mt-5 max-w-[44ch] text-[16px] leading-relaxed text-ink-soft">
            {SITE.landmark}. Open seven days a week.
          </p>
        </div>

        <aside
          aria-label="Visit the salon"
          className="rounded-[18px] bg-paper p-7 shadow-card sm:p-10 lg:col-span-5 lg:col-start-8"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Eyebrow>Visit the salon</Eyebrow>
            <OpenStatus />
          </div>
          <address className="mt-5 text-[16px] not-italic leading-relaxed text-ink">
            {SITE.addressLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
          <p className="mt-3 flex items-center gap-2 text-[14px] text-ink-muted">
            <MapPin aria-hidden className="size-3.5" strokeWidth={1.6} />
            {SITE.landmark}
          </p>
          <HoursList className="mt-7 border-t border-line pt-6" />
          <div className="mt-8 flex flex-wrap gap-2">
            <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer" className={btn("ink", "sm")}>
              Get directions <Arrow external className="size-3.5" />
            </a>
            <a href={TEL} className={btn("outline", "sm")}>
              <Phone aria-hidden className="size-3.5" strokeWidth={1.6} /> Call Now
            </a>
          </div>
        </aside>
      </div>
    </section>
  );
}
