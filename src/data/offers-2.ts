import { SITE } from "@/lib/site";

/**
 * Offer Page 2 (/offers-2) content — kept separate from the /offers data file so
 * the two variants can never affect each other. Prices, inclusions and badges are
 * the owner's published offers; nothing here is derived or estimated.
 *
 * Hair Spa and Hair Color have no standalone price and are not listed as offers.
 */

export type Offer2 = {
  id: string;
  name: string;
  price: number;
  wasPrice?: number;
  /** Prefix before the price, e.g. "from" */
  priceNote?: string;
  includes: string[];
  badge?: string;
  image: string;
  alt: string;
  /** CSS object-position that keeps the face/subject in frame */
  position: string;
};

export type Section2 = {
  id: string;
  number: string;
  title: string;
  description: string;
  /** Two-line gold accent under the panel rule */
  accent: [string, string];
  /** Rotated script line beside the cards, where the design has one */
  script?: string;
  tone: "dark" | "cream";
  offers: Offer2[];
};

const img = (name: string) => `/images/offers-2/${name}.webp`;

export const SECTIONS_2: Section2[] = [
  {
    id: "hair",
    number: "01",
    title: "Hair & Beard",
    description: "Men's haircut and beard offers in KR Puram.",
    accent: ["Sharp looks", "Bolder confidence"],
    tone: "dark",
    offers: [
      {
        id: "haircut",
        name: "Men's Haircut",
        price: 99,
        wasPrice: 149,
        includes: ["Men's haircut"],
        badge: "Most Popular",
        image: img("haircut"),
        alt: "Barber giving a men's haircut at Express Cuts Men's Salon in KR Puram, Bengaluru",
        position: "60% 30%",
      },
      {
        id: "beard",
        name: "Beard Trim & Line-Up",
        price: 70,
        wasPrice: 100,
        includes: ["Beard trim", "Line-up & shaping"],
        image: img("beard-trim"),
        alt: "Beard trim and line-up for a client at the men's salon near Ayyappa Nagar, KR Puram",
        position: "55% 38%",
      },
      {
        id: "wash-cut-style",
        name: "Wash, Cut & Style",
        price: 199,
        priceNote: "from",
        includes: ["Hair wash", "Detailed haircut", "Styling"],
        image: img("wash-style"),
        alt: "Relaxing hair wash before a men's haircut at Express Cuts, Krishnarajapuram",
        position: "45% 45%",
      },
    ],
  },
  {
    id: "combos",
    number: "02",
    title: "Grooming Combos",
    description: "Haircut, beard and massage together, for less.",
    accent: ["Good grooming", "Great days ahead"],
    script: "More Than A Haircut",
    tone: "cream",
    offers: [
      {
        id: "classic",
        name: "Classic Combo",
        price: 249,
        wasPrice: 320,
        includes: ["Haircut", "Beard trim", "Head massage"],
        badge: "Best Value",
        image: img("classic"),
        alt: "Client with a classic men's haircut and trimmed beard in KR Puram",
        position: "50% 32%",
      },
      {
        id: "premium",
        name: "Premium Combo",
        price: 399,
        wasPrice: 620,
        includes: ["Haircut", "Beard trim", "Head massage", "De-tan"],
        image: img("premium"),
        alt: "Barber finishing a fade at the barber shop in KR Puram, Bengaluru",
        position: "42% 40%",
      },
    ],
  },
  {
    id: "facial-color",
    number: "03",
    title: "Facial & Color Combos",
    description: "Grooming plus facial and hair color packages.",
    accent: ["Look good", "Feel better"],
    tone: "dark",
    offers: [
      {
        id: "signature",
        name: "Signature Combo",
        price: 699,
        wasPrice: 920,
        includes: ["Haircut", "Beard trim", "Head massage", "Facial (Type 1)"],
        image: img("signature"),
        alt: "Men's facial being applied during a grooming package in KR Puram",
        position: "50% 42%",
      },
      {
        id: "deluxe",
        name: "Deluxe Combo",
        price: 899,
        wasPrice: 1320,
        includes: ["Haircut", "Beard trim", "Head massage", "Facial (Type 2)", "Hair color"],
        badge: "Most Popular",
        image: img("deluxe"),
        alt: "Client during a men's facial at the salon near Ayyappa Nagar, KR Puram",
        position: "50% 45%",
      },
      {
        id: "executive",
        name: "Executive Combo",
        price: 1099,
        wasPrice: 1520,
        includes: ["Haircut", "Beard trim", "Head massage", "Facial (Type 3)", "Hair color – streaks"],
        image: img("executive"),
        alt: "Hair color for men styled with streaks at Express Cuts, Bengaluru",
        position: "42% 38%",
      },
      {
        id: "platinum",
        name: "Platinum Combo",
        price: 1399,
        wasPrice: 1920,
        includes: ["Haircut", "Beard trim", "Head massage", "Facial (Type 4)", "L'Oréal hair color"],
        image: img("platinum"),
        alt: "Client with L'Oréal hair color for men at the KR Puram salon",
        position: "55% 40%",
      },
    ],
  },
  {
    id: "summer",
    number: "04",
    title: "Summer Specials",
    description: "Beat the summer tan with packages made for men.",
    accent: ["Stay fresh", "All season"],
    script: "Summer Ready Always",
    tone: "cream",
    offers: [
      {
        id: "pedi-mani",
        name: "Men's Pedi & Mani Combo",
        price: 999,
        wasPrice: 1600,
        includes: ["Haircut", "Beard trim", "Manicure", "Pedicure"],
        image: img("pedi-mani"),
        alt: "Men's pedicure and manicure at Express Cuts Men's Salon, Krishnarajapuram",
        position: "50% 30%",
      },
      {
        id: "hydra",
        name: "Hydra Facial for Men",
        price: 1999,
        wasPrice: 3999,
        includes: [
          "Instant glow",
          "Hydration boost",
          "Deep cleansing",
          "Removes tan",
          "Brightens skin tone",
          "Anti-aging",
        ],
        badge: "Half Price",
        image: img("hydra"),
        alt: "Hydra facial for men in Bengaluru being performed at Express Cuts, KR Puram",
        position: "45% 30%",
      },
    ],
  },
  {
    id: "kings-ritual",
    number: "05",
    title: "The King's Ritual",
    description: "The complete grooming experience for today's man.",
    accent: ["Because", "You deserve it"],
    tone: "dark",
    offers: [
      {
        id: "kings",
        name: "The King's Ritual",
        price: 2999,
        wasPrice: 5800,
        includes: ["Haircut", "Beard trim", "Hair spa", "Hydra facial", "Pedicure", "Manicure"],
        badge: "Express Cuts Pick",
        image: img("kings"),
        alt: "Client enjoying the full King's Ritual grooming experience at Express Cuts, KR Puram",
        position: "45% 18%",
      },
    ],
  },
];

/** The chain of services printed beside the King's Ritual card in the design */
export const KINGS_CHAIN = ["Hair", "Beard", "Spa", "Skin", "Hands & Feet"];

export const HERO_2 = {
  src: img("hero"),
  width: 736,
  height: 770,
  alt: "Client with freshly styled hair at Express Cuts Men's Salon, Ayyappa Nagar, KR Puram, Bengaluru",
};

export const CTA_IMAGE_2 = img("cta");

export const ALL_OFFERS_2 = SECTIONS_2.flatMap((s) => s.offers);

export const inr2 = (n: number) => `₹${n.toLocaleString("en-IN")}`;

/** What a price line and a WhatsApp message need of an offer — the card may hold more */
type Priced = Pick<Offer2, "name" | "price" | "priceNote">;

/** Offer price with its "from" prefix, where there is one */
export const priceLabel2 = (o: Pick<Priced, "price" | "priceNote">) =>
  `${o.priceNote ? `${o.priceNote} ` : ""}${inr2(o.price)}`;

/** WhatsApp link with the offer already typed into the message */
export const waFor2 = (o: Priced) =>
  `${SITE.whatsappUrl}?text=${encodeURIComponent(`Hi, I'd like to book the ${o.name} (${priceLabel2(o)}).`)}`;

/** WhatsApp link for the page-level buttons */
export const waGeneral2 = (text: string) => `${SITE.whatsappUrl}?text=${encodeURIComponent(text)}`;
