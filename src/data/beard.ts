import { SITE, TEL } from "@/lib/site";
import type { Faq } from "./faq";
import type { ImageFocus } from "./offers";
import { POPULAR_SERVICES } from "./popular";

/**
 * Beard Grooming page content — style names, descriptors, steps and FAQ as
 * supplied by the owner. Prices are read from popular.ts so they cannot drift;
 * no durations or extra prices are stated because none have been confirmed.
 */

/** "Beard Trim & Line-Up" — ₹100 regular, ₹70 offer */
export const BEARD_OFFER = POPULAR_SERVICES.find((s) => s.id === "beard")!;

/* ───────────────────────── Beard styles ───────────────────────── */

export type BeardStyle = {
  id: string;
  number: string;
  name: string;
  descriptor: string;
  image: string;
  alt: string;
  focus: ImageFocus;
};

export const BEARD_STYLES: BeardStyle[] = [
  {
    id: "boxed-beard",
    number: "01",
    name: "Boxed Beard",
    descriptor: "Clean. Structured. Refined.",
    image: "/images/beard/styles/boxed-beard.jpg",
    alt: "Boxed beard style for men, side profile with a sharp cheek line",
    focus: { position: "30% 62%" },
  },
  {
    id: "heavy-stubble",
    number: "02",
    name: "Heavy Stubble",
    descriptor: "Rugged. Simple. Effortless.",
    image: "/images/beard/styles/heavy-stubble.jpg",
    alt: "Heavy stubble beard style with a defined moustache",
    focus: { position: "50% 58%" },
  },
  {
    id: "italian-beard",
    number: "03",
    name: "Italian Beard",
    descriptor: "Stylish. Defined. Distinctive.",
    image: "/images/beard/styles/italian-beard.jpg",
    alt: "Italian beard style for men with a clean, lined jaw",
    /* Zoomed in slightly: keeps the jawline central and the cape's logo out of frame */
    focus: { position: "50% 50%", scale: 1.2, origin: "52% 52%" },
  },
  {
    id: "long-full-beard",
    number: "04",
    name: "Long Full Beard",
    descriptor: "Bold. Full. Characterful.",
    image: "/images/beard/styles/long-full-beard.jpg",
    alt: "Long full beard being shaped with a trimmer",
    focus: { position: "45% 45%" },
  },
  {
    id: "verdi-beard",
    number: "05",
    name: "Verdi Beard",
    descriptor: "Classic. Refined. Statement.",
    image: "/images/beard/styles/verdi-beard.jpg",
    alt: "Verdi beard style with a full, rounded beard and styled moustache",
    focus: { position: "50% 55%" },
  },
  {
    id: "modern-beard-fade",
    number: "06",
    name: "Modern Beard Fade",
    descriptor: "Sharp. Blended. Contemporary.",
    image: "/images/beard/styles/modern-beard-fade.jpg",
    alt: "Modern beard fade blending from the sideburn into a full beard",
    focus: { position: "62% 55%" },
  },
];

/* ───────────────────────── Care guide ───────────────────────── */

export const CARE_TIPS = [
  { title: "Cleanse Regularly", line: "Wash your beard to keep it fresh and free of build-up." },
  { title: "Moisturise & Condition", line: "Keep the hair soft and the skin beneath comfortable." },
  { title: "Trim & Maintain", line: "Regular trims keep the shape and lines looking sharp." },
  { title: "Use the Right Products", line: "Choose oils, balms and washes made for beards." },
] as const;

/** Built later; the link lands on the shared "coming soon" page until then. */
export const BEARD_GUIDE_HREF = "/beard-guide";

/* ───────────────────────── Which beard suits you ───────────────────────── */

export const FIT_FACTORS = [
  { title: "Face Shape", line: "The outline of a beard can balance the shape of your face." },
  { title: "Growth Pattern", line: "Where your beard grows fullest guides the shape." },
  { title: "Beard Density", line: "Fuller and lighter growth suit different lengths." },
  { title: "Desired Length", line: "From stubble to full, length sets the upkeep." },
  { title: "Personal Style", line: "Your everyday look and how much maintenance you want." },
] as const;

/* ───────────────────────── Services ───────────────────────── */

export type BeardService = {
  id: string;
  name: string;
  line: string;
  /** Only services with an owner-confirmed price carry one */
  price?: { offer: number; actual?: number };
};

export const BEARD_SERVICES: BeardService[] = [
  {
    id: "trim-line-up",
    name: BEARD_OFFER.title,
    line: "A clean trim finished with a sharp, balanced line-up.",
    price: { offer: BEARD_OFFER.price.offer, actual: BEARD_OFFER.price.actual },
  },
  { id: "shape", name: "Beard Shape & Line-Up", line: "A defined outline on the cheeks and neck." },
  { id: "shave", name: "Clean Shave", line: "A smooth, close finish for a fresh start." },
  { id: "styling", name: "Beard Styling", line: "Shaping and finishing for a particular look." },
];

export const BEARD_MENU_MESSAGE = "Hi Express Cuts, could you share your full beard grooming menu and prices?";

/* ───────────────────────── Process ───────────────────────── */

export const BEARD_PROCESS = [
  { number: "01", title: "Consultation", line: "We understand your beard goals and preferred style." },
  { number: "02", title: "Shape & Trim", line: "Precision trimming for the desired form." },
  { number: "03", title: "Line-Up", line: "Define the beard with clean, balanced lines." },
  { number: "04", title: "Finish", line: "Styling and finishing touches for the final look." },
] as const;

/* ───────────────────────── FAQ ───────────────────────── */

const address = `${SITE.addressLines.join(" ").replace(/,$/, "")}.`;

export const BEARD_FAQS: Faq[] = [
  {
    q: "How much is a beard trim at Express Cuts?",
    a: [
      `The current ${BEARD_OFFER.title} offer is ₹${BEARD_OFFER.price.offer}, reduced from ₹${BEARD_OFFER.price.actual}.`,
    ],
  },
  {
    q: "What does beard grooming include?",
    a: ["Beard grooming can include trimming, shaping and line-up depending on the selected service."],
  },
  {
    q: "Can I walk in without an appointment?",
    a: ["Walk-ins are welcome. You can also book ahead or call ", { text: SITE.phoneDisplay, href: TEL }, "."],
  },
  {
    q: "Where is Express Cuts located?",
    a: [address, ` About ${SITE.landmark}.`],
  },
  {
    q: "Can I show my barber a reference beard style?",
    a: ["Yes, customers can discuss the desired look with the barber before the service."],
  },
];

/** Plain-text answers for FAQPage structured data */
export const faqPlainText = (faq: Faq) =>
  faq.a.map((part) => (typeof part === "string" ? part : part.text)).join("");
