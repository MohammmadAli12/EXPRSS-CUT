import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { StickyCTA } from "@/components/layout/StickyCTA";
import { GalleryHero } from "@/components/gallery/GalleryHero";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { GalleryOffer, GalleryVisit } from "@/components/gallery/GalleryClose";
import { GALLERY_HERO, GALLERY_PHOTOS } from "@/data/gallery";
import { SITE } from "@/lib/site";

const TITLE = "Express Cuts Men's Salon Gallery | KR Puram, Bengaluru";
const DESCRIPTION =
  "Explore the Express Cuts Men's Salon gallery in KR Puram, Bengaluru, featuring our salon interior, exterior, grooming spaces, haircuts and men's grooming experience.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/gallery" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/gallery",
    type: "website",
    images: [
      {
        url: GALLERY_PHOTOS[0].src,
        width: GALLERY_PHOTOS[0].width,
        height: GALLERY_PHOTOS[0].height,
        alt: GALLERY_PHOTOS[0].alt,
      },
    ],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: [GALLERY_PHOTOS[0].src] },
};

const url = (path: string) => (SITE.url ? new URL(path, SITE.url).toString() : path);

const GALLERY_LD = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: TITLE,
  description: DESCRIPTION,
  url: url("/gallery"),
  about: {
    "@type": "HairSalon",
    name: `${SITE.name} – KR Puram`,
    telephone: "+91-8970000135",
    address: {
      "@type": "PostalAddress",
      streetAddress: "25/2, Ayyappa Nagar Main Rd, Priyadarshini Layout",
      addressLocality: "Krishnarajapuram, Bengaluru",
      addressRegion: "Karnataka",
      postalCode: "560037",
      addressCountry: "IN",
    },
    hasMap: SITE.mapsUrl,
  },
  mainEntity: {
    "@type": "ImageGallery",
    name: "Inside Express Cuts Men's Salon",
    image: [GALLERY_HERO, ...GALLERY_PHOTOS].map((photo) => ({
      "@type": "ImageObject",
      contentUrl: url(photo.src),
      caption: photo.alt,
      width: photo.width,
      height: photo.height,
    })),
  },
};

const BREADCRUMBS = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: url("/") },
    { "@type": "ListItem", position: 2, name: "Gallery", item: url("/gallery") },
  ],
};

export default function GalleryPage() {
  return (
    <>
      <Navbar />
      <main id="main" className="pt-[var(--nav-h)]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(GALLERY_LD).replace(/</g, "\u003c") }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMBS).replace(/</g, "\u003c") }}
        />
        <GalleryHero />
        <GalleryGrid />
        <GalleryOffer />
        <GalleryVisit />
      </main>
      <Footer />
      <StickyCTA />
    </>
  );
}
