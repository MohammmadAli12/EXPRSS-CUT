import { MapPin } from "lucide-react";
import { SITE } from "@/lib/site";
import { BEARD_FAQS, faqPlainText } from "@/data/beard";
import { Arrow, Eyebrow } from "@/components/ui/button";
import { FaqList } from "@/components/sections/FaqSection";
import { Reveal } from "@/components/motion/Reveal";

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: BEARD_FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faqPlainText(faq) },
  })),
};

/** The homepage's accordion, fed the beard questions; FAQPage data mirrors it exactly. */
export function BeardFaq() {
  return (
    <section id="find-us" aria-labelledby="beard-faq-title" className="bg-ivory py-16 lg:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA).replace(/</g, "\\u003c") }}
      />
      <div className="shell grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
        <Reveal>
          <Eyebrow>Beard FAQ</Eyebrow>
          <h2
            id="beard-faq-title"
            className="mt-4 font-display text-[clamp(2rem,3.4vw,2.8rem)] font-semibold leading-[1.04] tracking-[-0.015em]"
          >
            Frequently Asked Questions
          </h2>
          <address className="mt-7 not-italic">
            <p className="flex gap-3 text-[14.5px] leading-[1.6] text-ink-soft">
              <MapPin aria-hidden className="mt-1 size-4 shrink-0 text-champagne" strokeWidth={1.6} />
              <span>
                <span className="font-semibold text-ink">{SITE.name}</span>
                <br />
                {SITE.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
                <span className="mt-1 block text-ink-muted">{SITE.landmark}</span>
              </span>
            </p>
          </address>
          <a
            href={SITE.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn mt-5 inline-flex items-center gap-2 text-[14px] font-medium text-ink underline decoration-ink/30 underline-offset-4 transition-colors hover:decoration-ink"
          >
            Get directions <Arrow external className="size-3.5" />
          </a>
        </Reveal>

        <FaqList items={BEARD_FAQS} />
      </div>
    </section>
  );
}
