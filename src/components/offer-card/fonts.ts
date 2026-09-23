import { Allura, Jost, Playfair_Display } from "next/font/google";

/**
 * The offer card's type. Loaded here, next to the card, so every page that shows
 * an offer card gets the same faces without the shared layout being touched:
 * Offer Page 2 applies these on its page wrapper, the homepage on its offers
 * section only.
 */
export const offerSerif = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["500", "600", "700"],
  variable: "--font-o2-serif",
  display: "swap",
});

export const offerSans = Jost({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-o2-sans",
  display: "swap",
});

/** Offer Page 2's script accent — only that page uses it */
export const offerScript = Allura({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-o2-script",
  display: "swap",
});

/** The two variables the card itself needs */
export const OFFER_CARD_FONTS = `${offerSerif.variable} ${offerSans.variable}`;
