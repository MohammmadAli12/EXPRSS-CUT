import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { StickyCTA } from "@/components/layout/StickyCTA";
import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { PopularServices } from "@/components/sections/PopularServices";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { OffersSection } from "@/components/offers/OffersSection";
import { CutsGallery } from "@/components/sections/CutsGallery";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ClientReviews } from "@/components/sections/ClientReviews";
import { FaqLocation } from "@/components/sections/FaqLocation";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <TrustStrip />
        <PopularServices />
        <ServicesSection />
        {/* Stable hook for StickyCTA: the offers layout swaps after hydration */}
        <div data-offers-zone>
          <OffersSection />
        </div>
        <CutsGallery />
        <ExperienceSection />
        <ClientReviews />
        <FaqLocation />
        <FinalCTA />
      </main>
      <Footer />
      <StickyCTA />
    </>
  );
}
