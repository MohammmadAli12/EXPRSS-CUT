import { HAIR_SPA_FAQS } from "@/data/hair-spa";
import { faqPlainText } from "@/data/beard";
import { Eyebrow } from "@/components/ui/button";
import { Reveal } from "@/components/motion/Reveal";
import { FaqList } from "@/components/sections/FaqSection";

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: HAIR_SPA_FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faqPlainText(faq) },
  })),
};

const half = Math.ceil(HAIR_SPA_FAQS.length / 2);

/** Six short answers in two accordion columns (one on phones). */
export function HairSpaFaq() {
  return (
    <section id="faq" aria-labelledby="spa-faq-title" className="bg-ivory py-12 lg:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA).replace(/</g, "\\u003c") }}
      />
      <div className="shell">
        <Reveal>
          <Eyebrow>Hair Spa Guide</Eyebrow>
          <h2
            id="spa-faq-title"
            className="mt-3 font-display text-[clamp(2rem,3.2vw,2.6rem)] font-semibold leading-[1.04] tracking-[-0.015em]"
          >
            Men&rsquo;s Hair Spa FAQs
          </h2>
        </Reveal>
        <Reveal delay={0.08} className="mt-6 grid md:grid-cols-2 md:gap-x-10">
          <FaqList items={HAIR_SPA_FAQS.slice(0, half)} className="max-md:border-b-0" />
          <FaqList items={HAIR_SPA_FAQS.slice(half)} className="max-md:border-t-0" />
        </Reveal>
      </div>
    </section>
  );
}
