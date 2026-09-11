import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { StickyCTA } from "@/components/layout/StickyCTA";
import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { OffersSection } from "@/components/offers/OffersSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ClientReviews } from "@/components/sections/ClientReviews";
import { FaqSection } from "@/components/sections/FaqSection";
import { VisitSalon } from "@/components/sections/VisitSalon";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <TrustStrip />
        <ServicesSection />
        {/* Stable hook for StickyCTA: the offers layout swaps after hydration */}
        <div data-offers-zone>
          <OffersSection />
        </div>
        <ExperienceSection />
        <ClientReviews />
        <FaqSection />
        <VisitSalon />
        <FinalCTA />
      </main>
      <Footer />
      <StickyCTA />
    </>
  );
}
