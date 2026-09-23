import { Clock, MapPin, Phone } from "lucide-react";
import { FACIAL_FAQS, FACIAL_PAGE_FAQS } from "@/data/facial";
import { faqPlainText } from "@/data/beard";
import { HOURS, SITE, TEL, waLink } from "@/lib/site";
import { Arrow, Eyebrow, btn } from "@/components/ui/button";
import { Reveal } from "@/components/motion/Reveal";
import { FaqList } from "@/components/sections/FaqSection";
import { OpenStatus } from "@/components/sections/OpenStatus";
import { WaBtn2 } from "@/components/offer-card/actions";

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [...FACIAL_FAQS, ...FACIAL_PAGE_FAQS].map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faqPlainText(faq) },
  })),
};

const heading = "mt-4 font-display text-[clamp(2rem,3.4vw,2.8rem)] font-semibold leading-[1.04] tracking-[-0.015em]";

/** Men's Facial Guide: a short intro column beside the accordion. */
export function FacialGuide() {
  return (
    <section id="guide" aria-labelledby="facial-guide-title" className="bg-ivory pb-14 lg:pb-16">
      <div className="shell grid gap-8 border-t border-line pt-14 lg:grid-cols-12 lg:gap-12 lg:pt-16">
        <Reveal className="lg:col-span-4">
          <Eyebrow>Know before you book</Eyebrow>
          <h2 id="facial-guide-title" className={heading}>
            Men&rsquo;s Facial <em className="font-medium text-champagne">Guide</em>
          </h2>
          <p className="mt-4 max-w-[36ch] text-[15px] leading-relaxed text-ink-soft">
            Quick answers to common questions about men&rsquo;s facials.
          </p>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-8">
          <FaqList items={FACIAL_FAQS} />
        </Reveal>
      </div>
    </section>
  );
}

/** FAQ on the left, map + visit details on the right — the homepage FAQ / Find us pattern. */
export function FacialVisitFaq() {
  return (
    <section id="faq" aria-labelledby="facial-faq-title" className="bg-ivory pb-20 lg:pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA).replace(/</g, "\\u003c") }}
      />
      <div className="shell grid gap-12 border-t border-line pt-14 lg:grid-cols-12 lg:gap-12 lg:pt-16">
        <Reveal className="lg:col-span-7">
          <Eyebrow>FAQ</Eyebrow>
          <h2 id="facial-faq-title" className={heading}>
            Frequently Asked Questions
          </h2>
          <FaqList items={FACIAL_PAGE_FAQS} className="mt-8" />
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-5">
          <Visit />
        </Reveal>
      </div>
    </section>
  );
}

function Visit() {
  return (
    <div id="find-us" role="region" aria-labelledby="facial-visit-title" className="lg:sticky lg:top-[calc(var(--nav-h)+24px)]">
      <Eyebrow>Find us</Eyebrow>
      <h2 id="facial-visit-title" className={heading}>
        Visit Us
      </h2>

      <div className="mt-6 overflow-hidden rounded-[18px] bg-paper shadow-card">
        <iframe
          title="Google Map showing Express Cuts Men's Salon in Ayyappa Nagar, KR Puram"
          src={SITE.mapsEmbedUrl}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="block h-[200px] w-full border-0 bg-cream sm:h-[230px]"
        />
        <div className="p-6">
          <h3 className="text-[17px] font-semibold leading-snug text-ink">{SITE.name} – KR Puram</h3>

          <ul className="mt-4 space-y-3.5 text-[14.5px] leading-[1.5] text-ink-soft">
            <li className="flex gap-3">
              <MapPin aria-hidden className="mt-[3px] size-4 shrink-0 text-champagne" strokeWidth={1.6} />
              <address className="not-italic">
                {SITE.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
            </li>
            <li className="flex gap-3">
              <Clock aria-hidden className="mt-[3px] size-4 shrink-0 text-champagne" strokeWidth={1.6} />
              <dl className="grid grid-cols-[auto_1fr] gap-x-2.5 gap-y-0.5">
                {HOURS.map((h) => (
                  <div key={h.label} className="contents">
                    <dt className="text-ink-muted">{h.short.replace(/ /g, "")}:</dt>
                    <dd className="tabular text-ink">{h.display}</dd>
                  </div>
                ))}
              </dl>
            </li>
            <li className="flex gap-3">
              <Phone aria-hidden className="mt-[3px] size-4 shrink-0 text-champagne" strokeWidth={1.6} />
              <a href={TEL} className="tabular font-medium text-ink underline decoration-ink/25 underline-offset-4 hover:decoration-ink">
                {SITE.phoneDisplay}
              </a>
            </li>
          </ul>

          <OpenStatus className="mt-5" />

          <div className="mt-6 grid grid-cols-2 gap-2">
            <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer" className={btn("ink", "sm", "px-3")}>
              Google Maps <Arrow external className="size-3.5" />
            </a>
            <WaBtn2 size="sm" className="px-3" href={waLink()} />
          </div>
        </div>
      </div>
    </div>
  );
}
