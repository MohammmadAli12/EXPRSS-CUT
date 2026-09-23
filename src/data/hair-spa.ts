import { OFFERS } from "./offers";
import type { Faq } from "./faq";

/**
 * Hair Spa page content. The King's Ritual is the only confirmed package that
 * includes a hair spa, so no standalone hair spa price is shown anywhere. Wording
 * stays cosmetic — no claims about hair loss, scalp conditions or permanent repair.
 */

export const HAIR_SPA_HERO = {
  src: "/images/hair-spa/hero.png",
  width: 1536,
  height: 1024,
  alt: "Men's hair spa treatment at Express Cuts Men's Salon, KR Puram — scalp being lathered and massaged at the wash basin",
};

export const HAIR_SPA_CHIPS = [
  { id: "dry", label: "Dry Hair" },
  { id: "rough", label: "Rough Hair" },
  { id: "dull", label: "Dull Hair" },
  { id: "scalp", label: "Scalp Care" },
  { id: "nourish", label: "Hair Nourishment" },
  { id: "frizz", label: "Frizz Control" },
] as const;

/* Photographs cropped from the supplied "your hair experince.png" (text removed) */
export const HAIR_SPA_STEPS = [
  {
    title: "Consultation",
    note: "Hair & Scalp Analysis",
    src: "/images/hair-spa/steps/consultation.webp",
    alt: "Stylist discussing a client's hair and scalp before a men's hair spa",
  },
  {
    title: "Cleanse",
    note: "Deep Hair & Scalp Cleansing",
    src: "/images/hair-spa/steps/cleanse.webp",
    alt: "Client's hair and scalp being lathered at the wash basin",
  },
  {
    title: "Massage",
    note: "Relaxing Scalp Massage",
    src: "/images/hair-spa/steps/massage.webp",
    alt: "Relaxing scalp massage during a men's hair spa",
  },
  {
    title: "Treatment",
    note: "Professional Hair Treatment",
    src: "/images/hair-spa/steps/treatment.webp",
    alt: "Professional hair treatment being applied to a client's scalp",
  },
  {
    title: "Finish",
    note: "Fresh & Groomed Hair",
    src: "/images/hair-spa/steps/finish.webp",
    alt: "Client with fresh, groomed hair after his hair spa",
  },
] as const;

/* Close-ups cropped from the supplied "hair care on men.png" (text removed) */
export const HAIR_NEEDS = [
  { title: "Dry & Rough Hair", note: "Hair Nourishment", src: "/images/hair-spa/needs/dry-rough.webp", alt: "Close-up of dry, rough men's hair" },
  { title: "Dull & Lifeless Hair", note: "Hair Refresh", src: "/images/hair-spa/needs/dull.webp", alt: "Close-up of dull men's hair" },
  { title: "Scalp Care", note: "Scalp Cleansing", src: "/images/hair-spa/needs/scalp.webp", alt: "Close-up of a man's scalp and hair parting" },
  { title: "Frizz & Unruly Hair", note: "Hair Smoothing", src: "/images/hair-spa/needs/frizz.webp", alt: "Close-up of frizzy, unruly men's hair" },
  { title: "Hair Nourishment", note: "Hair Care Treatment", src: "/images/hair-spa/needs/nourishment.webp", alt: "Close-up of thick, dark men's hair" },
] as const;

const kings = OFFERS.find((o) => o.id === "kings-ritual");
if (!kings) throw new Error("Missing offer kings-ritual");

/** The one confirmed package with a hair spa — prices and inclusions from offers.ts */
export const KINGS_RITUAL = {
  name: kings.name,
  offerPrice: kings.offerPrice,
  actualPrice: kings.actualPrice,
  saving: kings.actualPrice - kings.offerPrice,
  /* Owner's list says "Men Hair Cut"; this page is all-men, so the label drops "Men" */
  services: kings.services.map((s) => s.replace(/^Men /, "")),
  image: kings.image,
};

export const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

export const HAIR_SPA_FAQS: Faq[] = [
  {
    q: "What is a hair spa for men?",
    a: ["A men's hair spa is a grooming treatment involving hair and scalp cleansing, massage and hair treatment."],
  },
  {
    q: "Is hair spa good for dry hair?",
    a: ["Hair spa can be part of a hair-care routine for dry and rough-looking hair."],
  },
  {
    q: "How often should men get a hair spa?",
    a: ["Frequency depends on your hair, scalp and selected treatment."],
  },
  {
    q: "Who should get a hair spa?",
    a: [
      "Men with dry, rough, dull or difficult-to-manage hair may consider a hair spa as part of their grooming routine.",
    ],
  },
  {
    q: "Hair Spa vs Hair Wash — What's the Difference?",
    a: [
      "A regular wash mainly cleans the hair, while a hair spa adds treatment and massage to the grooming experience.",
    ],
  },
  {
    q: "Can I get a haircut and hair spa together?",
    a: [
      "Yes. The King's Ritual combines a haircut, beard grooming, hair spa and other grooming services.",
    ],
  },
];
