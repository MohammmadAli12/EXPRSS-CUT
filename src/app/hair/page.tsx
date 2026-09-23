import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { StickyCTA } from "@/components/layout/StickyCTA";
import { HairHero } from "@/components/hair/HairHero";
import { HaircutStrip } from "@/components/hair/HaircutStrip";
import { HairTypeGuide } from "@/components/hair/HairTypeGuide";
import { CutsTrack } from "@/components/hair/CutsTrack";
import { StyleHelp } from "@/components/hair/StyleHelp";
import { HairProcess } from "@/components/hair/HairProcess";
import { HairCTA } from "@/components/hair/HairCTA";

export const metadata: Metadata = {
  title: "Hair Cut & Styling",
  description:
    "Men's hair cuts and styling at Express Cuts, KR Puram. Classic cuts, fades, tapers and modern styles from ₹99. Walk-ins welcome.",
};

export default function HairPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <HairHero />
        <HaircutStrip />
        <HairTypeGuide />
        {/* Stable hook for StickyCTA: it steps aside while the pinned track is on screen */}
        <div data-offers-zone>
          <CutsTrack />
        </div>
        <StyleHelp />
        <HairProcess />
        <HairCTA />
      </main>
      <Footer />
      <StickyCTA />
    </>
  );
}
