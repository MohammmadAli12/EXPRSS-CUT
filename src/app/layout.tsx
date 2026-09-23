import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Inter, Mrs_Saint_Delafield } from "next/font/google";
import "./globals.css";
import { MotionPrefs } from "@/components/motion/MotionPrefs";
import { SITE } from "@/lib/site";

const display = Bodoni_Moda({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-bodoni",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin", "latin-ext"], // latin-ext carries the ₹ glyph
  variable: "--font-inter",
  display: "swap",
});

const signature = Mrs_Saint_Delafield({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-signature",
  display: "swap",
});

const description =
  "Hair cuts, beard grooming, facials, hair spa, keratin and grooming packages at value-based pricing. Ayyappa Nagar, KR Puram, Bengaluru — 2 KM from Hoodi Circle. Call 8970000135.";

export const metadata: Metadata = {
  ...(SITE.url ? { metadataBase: new URL(SITE.url) } : {}),
  title: {
    default: "Express Cuts Men's Salon · KR Puram, Bengaluru",
    template: "%s · Express Cuts Men's Salon",
  },
  description,
  openGraph: {
    title: "Express Cuts Men's Salon · KR Puram",
    description,
    type: "website",
    locale: "en_IN",
    images: [{ url: "/images/hero/hero.png", width: 1536, height: 1024 }],
  },
};

export const viewport: Viewport = {
  themeColor: "#f7f3ee",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HairSalon",
  name: SITE.name,
  telephone: "+91-8970000135",
  foundingDate: String(SITE.established),
  hasMap: SITE.mapsUrl,
  address: {
    "@type": "PostalAddress",
    streetAddress: "25/2, Ayyappa Nagar Main Rd, Priyadarshini Layout",
    addressLocality: "Krishnarajapuram, Bengaluru",
    addressRegion: "Karnataka",
    postalCode: "560037",
    addressCountry: "IN",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "22:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday", "Sunday"],
      opens: "07:00",
      closes: "22:00",
    },
  ],
};

const DIRECTION_CONTRACT = `<!--
THESIS: A local KR Puram salon presented as a men's grooming house: editorial fashion layout with real prices in plain sight. Refuses the discount-banner salon template.
OWN-WORLD: Warm ivory and cream grounds, near-black ink, champagne italic accents, one red reserved for offer prices. Bodoni display, Inter UI, a single script signature. Brown Call and green WhatsApp pills, 18px photo frames, hairline dividers.
STORY: Who they are, then what they do, then nine combos at exact prices, then why trust them, then where they are. WhatsApp or call at every turn.
FIRST VIEWPORT: The salon interior filling the screen, its own cream field under the type; Bodoni "A Better / You Everyday" on the left third; WhatsApp + Call pills beneath; nav with Home active.
FORM: Brief-pinned to REFRENCE IMAGE.png (pinned direction beats the roll). Seed key: pinned-reference.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
-->`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-IN"
      className={`${display.variable} ${sans.variable} ${signature.variable}`}
    >
      <body>
        <div hidden dangerouslySetInnerHTML={{ __html: DIRECTION_CONTRACT }} />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <MotionPrefs>
          {children}
        </MotionPrefs>
      </body>
    </html>
  );
}
