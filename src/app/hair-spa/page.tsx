import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { StickyCTA } from "@/components/layout/StickyCTA";
import { HairSpaHero } from "@/components/hair-spa/HairSpaHero";
import { HairSpaIntro } from "@/components/hair-spa/HairSpaIntro";
import { HairSpaProcess } from "@/components/hair-spa/HairSpaProcess";
import { HairSpaNeeds } from "@/components/hair-spa/HairSpaNeeds";
import { HairSpaWhy } from "@/components/hair-spa/HairSpaWhy";
import { HairSpaFaq } from "@/components/hair-spa/HairSpaFaq";
import { HairSpaVisit } from "@/components/hair-spa/HairSpaVisit";
import { HairSpaCTA } from "@/components/hair-spa/HairSpaCTA";
import { HAIR_SPA_HERO } from "@/data/hair-spa";
import { SITE } from "@/lib/site";

const TITLE = "Men's Hair Spa in KR Puram, Bengaluru | Express Cuts";
const DESCRIPTION =
  "Professional men's hair spa and hair treatment in KR Puram, Bengaluru. Hair nourishment, scalp care and grooming at Express Cuts Men's Salon.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: HAIR_SPA_HERO.src, width: HAIR_SPA_HERO.width, height: HAIR_SPA_HERO.height, alt: HAIR_SPA_HERO.alt }],
  },
};

/* The salon itself is described site-wide (HairSalon JSON-LD in the root layout) */
const SERVICE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Men's Hair Spa",
  serviceType: "Hair spa and hair treatment for men",
  areaServed: "KR Puram, Bengaluru",
  provider: {
    "@type": "HairSalon",
    name: `${SITE.name} – KR Puram`,
    telephone: "+91-8970000135",
    foundingDate: String(SITE.established),
  },
};

export default function HairSpaPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(SERVICE_SCHEMA).replace(/</g, "\u003c") }}
        />
        <HairSpaHero />
        <HairSpaIntro />
        <HairSpaProcess />
        <HairSpaNeeds />
        <HairSpaWhy />
        <HairSpaFaq />
        <HairSpaVisit />
        <HairSpaCTA />
      </main>
      <Footer />
      <StickyCTA callOnly />
    </>
  );
}
