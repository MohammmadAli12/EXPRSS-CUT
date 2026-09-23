import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { StickyCTA } from "@/components/layout/StickyCTA";
import { StoryHero } from "@/components/our-story/StoryHero";
import { ProofStrip, StoryStart } from "@/components/our-story/StoryStart";
import { StoryServices, VisitSteps } from "@/components/our-story/StoryServices";
import { HygieneProducts, SalonGallery } from "@/components/our-story/HygieneProducts";
import { OffersStrip, StoryCTA, StoryFaq, StoryLocation, StoryReviews } from "@/components/our-story/StoryClose";
import { STORY_FAQS, STORY_HERO } from "@/data/our-story";
import { faqPlainText } from "@/data/beard";
import { GOOGLE_REVIEWS_URL } from "@/data/reviews";
import { HOURS, SITE } from "@/lib/site";

const TITLE = "About Express Cuts | Men's Salon in KR Puram Since 2020";
const DESCRIPTION =
  "Express Cuts is a men's salon in Ayyappa Nagar, KR Puram, Bengaluru, since 2020. Haircuts, beard grooming, facials, hair spa, hair color and complete men's grooming.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/our-story" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/our-story",
    type: "website",
    images: [{ url: STORY_HERO.src, width: STORY_HERO.width, height: STORY_HERO.height, alt: STORY_HERO.alt }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: [STORY_HERO.src] },
};

/** Minutes from midnight → "08:00" for schema.org opening hours */
const hhmm = (mins: number) => `${String(Math.floor(mins / 60)).padStart(2, "0")}:${String(mins % 60).padStart(2, "0")}`;

const SALON = {
  "@type": "HairSalon",
  "@id": "#express-cuts-kr-puram",
  name: `${SITE.name} - KR Puram`,
  telephone: "+91-8970000135",
  foundingDate: String(SITE.established),
  priceRange: "₹₹",
  image: STORY_HERO.src,
  hasMap: SITE.mapsUrl,
  sameAs: [SITE.mapsUrl, GOOGLE_REVIEWS_URL],
  areaServed: ["KR Puram", "Krishnarajapuram", "Ayyappa Nagar", "Hoodi", "Bengaluru"],
  address: {
    "@type": "PostalAddress",
    streetAddress: "25/2, Ayyappa Nagar Main Rd, Priyadarshini Layout",
    addressLocality: "Krishnarajapuram, Bengaluru",
    addressRegion: "Karnataka",
    postalCode: "560037",
    addressCountry: "IN",
  },
  geo: { "@type": "GeoCoordinates", latitude: 12.9986, longitude: 77.6969 },
  openingHoursSpecification: HOURS.map((h) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: h.days.map((d) => ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][d]),
    opens: hhmm(h.open),
    closes: hhmm(h.close),
  })),
};

/* AboutPage + the salon itself + the four visible questions. No review or
   aggregateRating markup: the page shows real reviews but does not mark them up. */
const SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      name: TITLE,
      description: DESCRIPTION,
      about: { "@id": "#express-cuts-kr-puram" },
      primaryImageOfPage: STORY_HERO.src,
    },
    SALON,
    {
      "@type": "FAQPage",
      mainEntity: STORY_FAQS.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: { "@type": "Answer", text: faqPlainText(faq) },
      })),
    },
  ],
};

export default function OurStoryPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA).replace(/</g, "\\u003c") }}
        />
        <StoryHero />
        <StoryStart />
        <ProofStrip />
        {/* StoryServices carries id="services", the hook StickyCTA uses to end the phone bar's window */}
        <StoryServices />
        <VisitSteps />
        <HygieneProducts />
        <SalonGallery />
        <StoryReviews />
        <OffersStrip />
        <StoryFaq />
        <StoryLocation />
        <StoryCTA />
      </main>
      <Footer />
      <StickyCTA />
    </>
  );
}
