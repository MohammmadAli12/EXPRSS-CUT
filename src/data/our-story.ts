import { OFFERS } from "./offers";
import { POPULAR_SERVICES } from "./popular";
import type { Faq } from "./faq";

/**
 * Our Story page content. Everything here is either supplied by the owner or read
 * from the existing site data — no invented founder, milestones, prices, hygiene
 * claims or parking information.
 */

const img = (name: string) => `/images/our-story/${name}.webp`;

export const STORY_HERO = {
  src: img("hero"),
  width: 1448,
  height: 1086,
  alt: "Inside Express Cuts Men's Salon in Ayyappa Nagar, KR Puram — styling chairs, mirrors and the reception desk",
};

export const STORY_BODY =
  "Express Cuts Men's Salon was established in 2020 with a simple idea: men's grooming should be professional, approachable and easy to make part of everyday life. From a fresh haircut and beard trim to facial treatments, hair spa, hair color and complete grooming, Express Cuts brings multiple grooming services together under one roof in KR Puram, Bengaluru.";

export const STORY_IMAGE = {
  src: img("story"),
  width: 900,
  height: 664,
  alt: "Styling stations and mirrors at Express Cuts men's salon in Krishnarajapuram, Bengaluru",
};

/** Owner-supplied milestones only — nothing else is invented */
export const JOURNEY = [
  { year: "2020", lines: ["Established in Ayyappa Nagar, KR Puram"] },
  { year: "Today", lines: ["10,000+ Men Served", "990+ Google Reviews"] },
];

export const PROOF = [
  { value: "2020", label: "Established" },
  { value: "10,000+", label: "Men Served" },
  { value: "4.7", label: "Google Rating" },
  { value: "990+", label: "Google Reviews" },
  { value: "KR Puram · Bengaluru", label: "Our Home", wide: true },
];

/** Cards link to the dedicated service pages that already exist */
export const STORY_SERVICES = [
  {
    id: "hair",
    kicker: "Hair",
    title: "Men's Haircuts & Styling",
    href: "/hair",
    src: img("svc-hair"),
    alt: "Men's haircut and hair styling at Express Cuts Men's Salon in KR Puram",
    position: "50% 30%",
  },
  {
    id: "beard",
    kicker: "Beard",
    title: "Men's Beard Grooming",
    href: "/beard",
    src: img("svc-beard"),
    alt: "Men's beard grooming at Express Cuts Salon in KR Puram",
    position: "50% 28%",
  },
  {
    id: "facial",
    kicker: "Facial",
    title: "Men's Facial & Skin Care",
    href: "/facial",
    src: img("svc-facial"),
    alt: "Men's facial treatment at Express Cuts Salon in KR Puram",
    position: "50% 42%",
  },
  {
    id: "hair-spa",
    kicker: "Hair Spa",
    title: "Men's Hair Spa & Hair Treatments",
    href: "/hair-spa",
    src: img("svc-spa"),
    alt: "Men's hair spa and hair treatment at Express Cuts Salon in KR Puram",
    position: "42% 45%",
  },
  {
    id: "hair-color",
    kicker: "Hair Color",
    title: "Men's Hair Color & Highlights",
    href: "/hair-color",
    src: img("svc-color"),
    alt: "Men's hair color service at Express Cuts Salon in KR Puram",
    position: "50% 22%",
  },
  {
    id: "offers",
    kicker: "Offers",
    title: "Men's Grooming Offers",
    href: "/offers",
    src: img("svc-offers"),
    alt: "Grooming package offers for men at Express Cuts Salon in Krishnarajapuram",
    position: "42% 40%",
  },
];

/** Prices come from the owner's offer data, never from this file */
const haircut = POPULAR_SERVICES.find((p) => p.id === "haircut");
const classic = OFFERS.find((o) => o.id === "classic");
export const OFFERS_LINE = `Haircut from ₹${haircut?.price.offer ?? 99} · Combos from ₹${classic?.offerPrice ?? 249}`;

export const VISIT_STEPS = [
  { n: "01", title: "Walk In or WhatsApp", note: "Drop in or message us to check availability." },
  { n: "02", title: "Tell Us Your Look", note: "Share what you want and let our service team guide you." },
  { n: "03", title: "Service at a Clean Station", note: "Enjoy your grooming experience in a clean, comfortable space." },
  { n: "04", title: "Finish & Style Check", note: "Leave feeling groomed, refreshed and ready." },
];

/** Only the hygiene statements the owner approved */
export const HYGIENE = [
  "Sanitised tools for every client",
  "Fresh towel every time",
  "Fresh blade for every shave",
  "Clean & hygienic stations",
];

/** Owner-confirmed product brands, set as wordmarks — no logo files are invented */
export const BRANDS = ["L'Oréal", "Schwarzkopf", "Streax", "VLCC", "Tenax"];

/** The five real photographs of the salon (the design reference file is never shipped) */
export const GALLERY = [
  {
    src: img("storefront"),
    alt: "Express Cuts Men's Salon storefront lit up at night on Ayyappa Nagar Main Rd, KR Puram",
    width: 900,
    height: 405,
  },
  {
    src: img("reception"),
    alt: "Reception desk inside Express Cuts Men's Salon in Krishnarajapuram, Bengaluru",
    width: 900,
    height: 1080,
  },
  {
    src: img("floor"),
    alt: "Styling chairs and product shelves on the salon floor at Express Cuts, KR Puram",
    width: 900,
    height: 675,
  },
  {
    src: img("wash-area"),
    alt: "Hair wash station and grooming area at Express Cuts men's salon near Hoodi",
    width: 900,
    height: 675,
  },
  {
    src: img("story"),
    alt: "Row of mirrors and grooming stations at Express Cuts Men's Salon, Bengaluru",
    width: 900,
    height: 664,
  },
];

/** The three reviewers the owner asked for; their text is read verbatim from reviews.ts */
export const STORY_REVIEWERS = ["Kiran Kumar", "Darshancn Darshan", "Vinay K"];

export const STORY_FAQS: Faq[] = [
  {
    q: "Is Express Cuts only for men?",
    a: ["Express Cuts is presented as a men's salon and provides men's grooming services."],
  },
  {
    q: "Do I need an appointment?",
    a: ["Walk-ins are welcome; customers can also contact the salon by phone or WhatsApp."],
  },
  {
    q: "Where exactly are you in KR Puram?",
    a: ["25/2, Ayyappa Nagar Main Rd, Priyadarshini Layout, Krishnarajapuram, Bengaluru, Karnataka 560037."],
  },
  {
    /* No parking information is confirmed for the business, so none is stated */
    q: "Is parking available?",
    a: ["Please contact the salon for current parking information."],
  },
];
