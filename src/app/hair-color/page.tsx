import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { StickyCTA } from "@/components/layout/StickyCTA";
import { HairColorHero } from "@/components/hair-color/HairColorHero";
import { HairColorFind } from "@/components/hair-color/HairColorFind";
import { HairColorLooks } from "@/components/hair-color/HairColorLooks";
import { HairColorProcess } from "@/components/hair-color/HairColorProcess";
import { HairColorPackages } from "@/components/hair-color/HairColorPackages";
import { HAIR_COLOR_HERO } from "@/data/hair-color";
import { HOURS, SITE } from "@/lib/site";

const TITLE = "Men's Hair Color in KR Puram, Bengaluru | Express Cuts";
const DESCRIPTION =
  "Professional men's hair color, highlights, streaks and grey coverage at Express Cuts Men's Salon in KR Puram, Bengaluru.";
const OG_IMAGE = {
  url: HAIR_COLOR_HERO.src,
  width: HAIR_COLOR_HERO.width,
  height: HAIR_COLOR_HERO.height,
  alt: HAIR_COLOR_HERO.alt,
};

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  /* Resolves against metadataBase once NEXT_PUBLIC_SITE_URL is set for the live domain */
  alternates: { canonical: "/hair-color" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/hair-color", type: "website", images: [OG_IMAGE] },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: [OG_IMAGE.url] },
};

/** Minutes from midnight → "08:00" for schema.org opening hours */
const hhmm = (mins: number) => `${String(Math.floor(mins / 60)).padStart(2, "0")}:${String(mins % 60).padStart(2, "0")}`;

/* Hair colour as a service of the salon described site-wide in the root layout */
const SERVICE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Men's Hair Color",
  serviceType: "Men's hair colour, highlights, streaks and grey coverage",
  areaServed: "KR Puram, Krishnarajapuram, Bengaluru",
  provider: {
    "@type": "HairSalon",
    name: `${SITE.name} – KR Puram`,
    telephone: "+91-8970000135",
    hasMap: SITE.mapsUrl,
    foundingDate: String(SITE.established),
    address: {
      "@type": "PostalAddress",
      streetAddress: "25/2, Ayyappa Nagar Main Rd, Priyadarshini Layout",
      addressLocality: "Krishnarajapuram, Bengaluru",
      addressRegion: "Karnataka",
      postalCode: "560037",
      addressCountry: "IN",
    },
    openingHoursSpecification: HOURS.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days.map((d) => ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][d]),
      opens: hhmm(h.open),
      closes: hhmm(h.close),
    })),
  },
};

export default function HairColorPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(SERVICE_SCHEMA).replace(/</g, "\\u003c") }}
        />
        <HairColorHero />
        <HairColorFind />
        <HairColorLooks />
        <HairColorProcess />
        <HairColorPackages />
      </main>
      <Footer />
      <StickyCTA callOnly />
    </>
  );
}
