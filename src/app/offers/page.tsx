import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Hero2 } from "@/components/offers-2/Hero2";
import { TabBar2 } from "@/components/offers-2/TabBar2";
import { Band2 } from "@/components/offers-2/Band2";
import { Closing2 } from "@/components/offers-2/Closing2";
import { MobileBar2 } from "@/components/offers-2/MobileBar2";
import { CtaZones2 } from "@/components/offers-2/CtaZones2";
import { ALL_OFFERS_2, HERO_2, SECTIONS_2 } from "@/data/offers-2";
import { GOOGLE_RATING } from "@/data/reviews";
import { SITE } from "@/lib/site";
import { offerSans as sans, offerScript as script, offerSerif as serif } from "@/components/offer-card/fonts";

/* This page's type, loaded with the offer card it shares with the homepage, so the
   shared layout and every other page are untouched */

const TITLE = "Men's Salon Offers in KR Puram | Haircut ₹99 | Express Cuts";
const DESCRIPTION =
  "Men's haircut ₹99, beard trim ₹70, grooming combos from ₹249, Hydra Facial ₹1,999 at Express Cuts Men's Salon, Ayyappa Nagar, KR Puram, Bengaluru. Walk-ins welcome, open 8 AM–10 PM.";

/** The site's only Offers page: the approved design, on its canonical route. */
export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/offers" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/offers",
    type: "website",
    images: [{ url: HERO_2.src, width: HERO_2.width, height: HERO_2.height, alt: HERO_2.alt }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: [HERO_2.src] },
};

const SALON = {
  "@context": "https://schema.org",
  "@type": "HairSalon",
  name: `${SITE.name} – KR Puram`,
  telephone: "+91-8970000135",
  priceRange: "₹₹",
  hasMap: SITE.mapsUrl,
  address: {
    "@type": "PostalAddress",
    streetAddress: "25/2, Ayyappa Nagar Main Rd, Priyadarshini Layout",
    addressLocality: "Krishnarajapuram, Bengaluru",
    addressRegion: "Karnataka",
    postalCode: "560037",
    addressCountry: "IN",
  },
  geo: { "@type": "GeoCoordinates", latitude: 12.9986, longitude: 77.6969 },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "08:00",
      closes: "22:00",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: GOOGLE_RATING.value,
    reviewCount: GOOGLE_RATING.count,
    bestRating: 5,
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Men's grooming offers in KR Puram",
    itemListElement: ALL_OFFERS_2.map((o) => ({
      "@type": "Offer",
      name: o.name,
      price: o.price,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      itemOffered: { "@type": "Service", name: o.name, serviceType: o.includes.join(", ") },
    })),
  },
};

const BREADCRUMBS = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "/" },
    { "@type": "ListItem", position: 2, name: "Offers", item: "/offers" },
  ],
};

export default function OffersPage() {
  return (
    <div className={`${serif.variable} ${sans.variable} ${script.variable} bg-[#f6f1e9] text-[#1a1612]`}>
      <CtaZones2>
      {/* One navigation for the whole site; the page's own header is gone */}
      <Navbar />
      <main
        id="main"
        className="pb-[74px] pt-[var(--nav-h)] font-[family-name:var(--font-o2-sans)] sm:pb-0"
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(SALON).replace(/</g, "\\u003c") }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMBS).replace(/</g, "\\u003c") }}
        />
        <Hero2 />
        <TabBar2 />
        {SECTIONS_2.map((section) => (
          <Band2 key={section.id} section={section} />
        ))}
        <Closing2 />
      </main>
      <MobileBar2 />
      </CtaZones2>
    </div>
  );
}
