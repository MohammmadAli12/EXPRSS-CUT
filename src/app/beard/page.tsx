import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { StickyCTA } from "@/components/layout/StickyCTA";
import { BeardHero } from "@/components/beard/BeardHero";
import { BeardOffer } from "@/components/beard/BeardOffer";
import { BeardStyles } from "@/components/beard/BeardStyles";
import { BeardTransformation } from "@/components/beard/BeardTransformation";
import { BeardCare } from "@/components/beard/BeardCare";
import { BeardFit } from "@/components/beard/BeardFit";
import { BeardServices } from "@/components/beard/BeardServices";
import { BeardProcess } from "@/components/beard/BeardProcess";
import { BeardFaq } from "@/components/beard/BeardFaq";
import { BeardCTA } from "@/components/beard/BeardCTA";

const TITLE = "Men’s Beard Grooming in KR Puram, Bengaluru | Express Cuts";
const DESCRIPTION =
  "Professional men's beard grooming in KR Puram, Bengaluru. Beard trim, shaping, line-up and shaving at Express Cuts Men's Salon, with walk-ins welcome and grooming offers available.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: "/images/beard/hero.png", width: 501, height: 750, alt: "Barber trimming a client's beard" }],
  },
};

export default function BeardPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <BeardHero />
        <BeardOffer />
        {/* StickyCTA hooks: #services ends the phone bar's window; the zone hides the desktop pair while pinned */}
        <div id="services" data-offers-zone>
          <BeardStyles />
        </div>
        <BeardTransformation />
        <BeardCare />
        <BeardFit />
        <BeardServices />
        <BeardProcess />
        <BeardFaq />
        <BeardCTA />
      </main>
      <Footer />
      <StickyCTA />
    </>
  );
}
