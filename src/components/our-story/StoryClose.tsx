import { Clock, MapPin, MessageCircle, Navigation, Phone } from "lucide-react";
import { HOURS, SITE, TEL, waLink } from "@/lib/site";
import { GOOGLE_REVIEWS_URL, REVIEWS } from "@/data/reviews";
import { OFFERS_LINE, STORY_FAQS, STORY_REVIEWERS } from "@/data/our-story";
import { Arrow, Eyebrow, btn } from "@/components/ui/button";
import { Reveal } from "@/components/motion/Reveal";
import { ReviewCard } from "@/components/sections/ClientReviews";
import { FaqList } from "@/components/sections/FaqSection";
import { OpenStatus } from "@/components/sections/OpenStatus";

/** The three reviews the owner asked for, verbatim from src/data/reviews.ts. */
export function StoryReviews() {
  const picked = STORY_REVIEWERS.map((name) => REVIEWS.find((r) => r.author === name)).filter(
    (r): r is NonNullable<typeof r> => Boolean(r),
  );

  return (
    <section id="reviews" aria-labelledby="story-reviews-title" className="bg-ivory py-14 lg:py-16">
      <div className="shell">
        <Reveal className="flex flex-wrap items-end justify-between gap-x-10 gap-y-5">
          <div>
            <Eyebrow>Google Reviews</Eyebrow>
            <h2
              id="story-reviews-title"
              className="mt-4 font-display text-[clamp(2rem,3.4vw,2.9rem)] font-semibold leading-[1.06] tracking-[-0.018em]"
            >
              Real People. Real Reviews.
            </h2>
          </div>
          <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer" className={btn("outline", "md", "uppercase tracking-[0.08em]")}>
            View all reviews <Arrow external />
          </a>
        </Reveal>

        <ul aria-label="Google reviews" className="mt-8 grid gap-4 md:grid-cols-3 lg:gap-5">
          {picked.map((review, i) => (
            <li key={review.author}>
              <Reveal delay={i * 0.06} className="h-full">
                <ReviewCard review={review} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** A compact bridge from the story into the offers page. */
export function OffersStrip() {
  return (
    <section aria-labelledby="story-offers-title" className="on-dark bg-night py-10 text-ivory lg:py-11">
      <div className="shell flex flex-wrap items-center gap-x-10 gap-y-5">
        <div className="min-w-[260px] flex-1">
          <h2
            id="story-offers-title"
            className="tabular font-display text-[clamp(1.5rem,2.6vw,2.1rem)] font-semibold uppercase leading-tight tracking-[0.01em]"
          >
            {OFFERS_LINE}
          </h2>
          <p className="mt-2 text-[14.5px] text-ivory-muted">Explore current men&rsquo;s grooming offers at Express Cuts.</p>
        </div>
        <a href="/offers" className={btn("ivory", "lg", "uppercase tracking-[0.08em] bg-champagne-soft hover:bg-white")}>
          See offers <Arrow />
        </a>
      </div>
    </section>
  );
}

/** Four short answers — nothing beyond what the business has confirmed. */
export function StoryFaq() {
  return (
    <section id="faq" aria-labelledby="story-faq-title" className="bg-ivory py-14 lg:py-16">
      <div className="shell grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-14">
        <Reveal>
          <Eyebrow>Frequently Asked Questions</Eyebrow>
          <h2
            id="story-faq-title"
            className="mt-4 font-display text-[clamp(2rem,3.4vw,2.9rem)] font-semibold leading-[1.06] tracking-[-0.018em]"
          >
            Quick Answers.
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <FaqList items={STORY_FAQS} />
        </Reveal>
      </div>
    </section>
  );
}

/** Address, hours and the real Google Maps embed. */
export function StoryLocation() {
  return (
    <section id="find-us" aria-labelledby="story-location-title" className="bg-cream py-14 lg:py-16">
      <div className="shell grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-center lg:gap-14">
        <Reveal>
          <Eyebrow>Visit our men&rsquo;s salon in Ayyappa Nagar</Eyebrow>
          <h2
            id="story-location-title"
            className="mt-4 font-display text-[clamp(2rem,3.4vw,2.9rem)] font-semibold leading-[1.06] tracking-[-0.018em]"
          >
            Your Men&rsquo;s Salon in KR Puram.
          </h2>

          <h3 className="mt-6 text-[16px] font-semibold text-ink">{SITE.name} - KR Puram</h3>
          <address className="mt-3 flex gap-3 text-[15px] not-italic leading-relaxed text-ink-soft">
            <MapPin aria-hidden className="mt-1 size-[18px] shrink-0 text-champagne" strokeWidth={1.7} />
            <span>
              25/2, Ayyappa Nagar Main Rd,
              <br />
              Priyadarshini Layout, Krishnarajapuram,
              <br />
              Bengaluru, Karnataka 560037
            </span>
          </address>

          <dl className="mt-5 flex flex-wrap gap-x-10 gap-y-4 text-[14.5px]">
            <div className="flex gap-3">
              <dt className="sr-only">Hours</dt>
              <Clock aria-hidden className="mt-0.5 size-[18px] shrink-0 text-champagne" strokeWidth={1.7} />
              <dd className="m-0">
                {HOURS.map((h) => (
                  <span key={h.label} className="tabular block text-ink-soft">
                    {h.short}: {h.display}
                  </span>
                ))}
              </dd>
            </div>
            <div className="flex gap-3">
              <dt className="sr-only">Phone</dt>
              <Phone aria-hidden className="mt-0.5 size-[18px] shrink-0 text-champagne" strokeWidth={1.7} />
              <dd className="m-0">
                <a href={TEL} className="tabular font-semibold text-ink underline decoration-ink/25 underline-offset-4 hover:decoration-ink">
                  {SITE.phoneDisplay}
                </a>
              </dd>
            </div>
          </dl>

          <OpenStatus className="mt-5" />

          <div className="mt-7 flex flex-wrap gap-3">
            <a href={TEL} aria-label={`Call ${SITE.phoneDisplay}`} className={btn("go", "md", "uppercase tracking-[0.08em]")}>
              <Phone aria-hidden className="size-4" strokeWidth={2} />
              Call Now <Arrow />
            </a>
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className={btn("outline", "md", "uppercase tracking-[0.08em]")}>
              <MessageCircle aria-hidden className="size-4" strokeWidth={1.9} />
              WhatsApp <Arrow />
            </a>
            <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer" className={btn("outline", "md", "uppercase tracking-[0.08em]")}>
              <Navigation aria-hidden className="size-4" strokeWidth={1.9} />
              Get directions <Arrow external />
            </a>
          </div>
        </Reveal>

        <Reveal variant="clip" delay={0.1}>
          <div className="overflow-hidden rounded-[18px] bg-paper shadow-card">
            <iframe
              title="Google Map showing Express Cuts Men's Salon, Ayyappa Nagar Main Rd, KR Puram"
              src={SITE.mapsEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block h-[280px] w-full border-0 bg-cream sm:h-[360px]"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** The quiet dark close. */
export function StoryCTA() {
  return (
    <section id="book" aria-labelledby="story-cta-title" className="on-dark bg-night py-14 text-ivory lg:py-16">
      <div className="shell flex flex-wrap items-center gap-x-12 gap-y-6">
        <div className="min-w-[280px] flex-1">
          <p className="eyebrow text-champagne-soft">Your next visit starts here</p>
          <h2
            id="story-cta-title"
            className="mt-4 font-display text-[clamp(2.1rem,3.6vw,3.1rem)] font-semibold leading-[1.04] tracking-[-0.02em]"
          >
            Look Good. Feel Better.
          </h2>
          <p className="mt-3 text-[15.5px] text-ivory-soft">
            Experience Express Cuts Men&rsquo;s Salon in KR Puram, Bengaluru.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href={TEL} aria-label={`Call ${SITE.phoneDisplay}`} className={btn("go", "lg", "uppercase tracking-[0.08em]")}>
            <Phone aria-hidden className="size-4" strokeWidth={2} />
            Call Now <Arrow />
          </a>
          <a href={waLink()} target="_blank" rel="noopener noreferrer" className={btn("outline-light", "lg", "uppercase tracking-[0.08em]")}>
            <MessageCircle aria-hidden className="size-4" strokeWidth={1.9} />
            WhatsApp <Arrow />
          </a>
        </div>
      </div>
    </section>
  );
}
