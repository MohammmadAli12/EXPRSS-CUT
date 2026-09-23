import { HOURS, SITE, TEL, formatMinutes } from "@/lib/site";
import { OFFERS, type ImageFocus, type Offer } from "./offers";
import type { Faq } from "./faq";

/**
 * Facial page content. Prices and inclusions are read from offers.ts (the owner-
 * supplied packages) so the two pages can never disagree. Type 1–4 are the same
 * packages the homepage calls Signature / Deluxe / Executive / Platinum — the owner
 * asked for them to be shown by facial type here. Men Pedi & Mani is deliberately
 * not a facial offer.
 */

export type FacialOffer = Offer & {
  /** Display name on this page */
  label: string;
};

const pick = (id: string) => {
  const o = OFFERS.find((x) => x.id === id);
  if (!o) throw new Error(`Missing offer ${id}`);
  return o;
};

const facial = (
  id: string,
  number: string,
  label: string,
  image?: { src: string; alt: string; focus: ImageFocus },
): FacialOffer => {
  const base = pick(id);
  return {
    ...base,
    number,
    label,
    ...(image ? { image: image.src, alt: image.alt, focus: image.focus } : {}),
  };
};

/* Type 1–4 photos are landscape (≈1.87:1): shown whole, fitted to the photo band's
   height, with the photo's own blurred copy filling any spare width — never cropped. */
const WHOLE = { visible: 1, top: 0, aspect: 866 / 463 };

export const FACIAL_OFFERS: FacialOffer[] = [
  facial("signature", "01", "Type 1 Facial", {
    src: "/images/facial/type-1.webp",
    alt: "Client relaxing while a facial cleansing brush is used on his forehead",
    focus: { position: "50% 50%", zoomOut: WHOLE },
  }),
  facial("deluxe", "02", "Type 2 Facial", {
    src: "/images/facial/type-2.webp",
    alt: "Therapist using a skin scrubber device on a bearded client's cheek",
    focus: { position: "50% 50%", zoomOut: { ...WHOLE, aspect: 1733 / 926 } },
  }),
  facial("executive", "03", "Type 3 Facial", {
    src: "/images/facial/type-3.webp",
    alt: "Face mask being brushed onto a client lying on a towel",
    focus: { position: "50% 50%", zoomOut: WHOLE },
  }),
  facial("platinum", "04", "Type 4 Facial", {
    src: "/images/facial/type-4.webp",
    alt: "Therapist brushing a cream mask onto a relaxed client's face",
    focus: { position: "50% 50%", zoomOut: { ...WHOLE, aspect: 867 / 463 } },
  }),
  facial("hydra-facial", "05", "Hydra Facial", {
    src: "/images/offers/hydra-facial.png",
    alt: "Hydra facial treatment being performed on a reclining client",
    /* Portrait source: the band shows the face, handpiece, both gloved hands and the machine */
    focus: { position: "50% 50%", zoomOut: { visible: 0.56, top: 0.2, aspect: 1145 / 1374, x: 50 } },
  }),
  facial("kings-ritual", "06", "The King's Ritual", {
    src: "/images/offers/kings-ritual.png",
    alt: "Client in a robe receiving hair, facial, manicure and pedicure care together",
    /* Zoomed from the left so the baked-in wall sign stays out of frame */
    focus: { position: "50% 8%", scale: 1.6, origin: "10% 8%" },
  }),
];

/** Lowest facial package price, for "from" copy */
export const FACIAL_FROM = Math.min(...FACIAL_OFFERS.map((o) => o.offerPrice));

/** Booking form preset for general facial CTAs */
export const FACIAL_PRESET = "service:facial";

export const FACIAL_HERO_IMAGE = "/images/services/facial-treatment.png";

/** "10 PM" when every day closes at the same hour, otherwise null */
export const CLOSING_TIME = (() => {
  const closes = new Set(HOURS.map((h) => h.close));
  return closes.size === 1 ? formatMinutes([...closes][0]).replace(":00", "") : null;
})();

/* ───────────────────────── Why a facial ───────────────────────── */

export const SKIN_CONCERNS = [
  { id: "dull", label: "Dull / Tired Skin", note: "Cleanse and refresh a tired-looking face." },
  { id: "dry", label: "Dry Skin", note: "Put moisture back into skin that feels tight." },
  { id: "oily", label: "Oily Skin", note: "Clear away excess oil and daily grime." },
  { id: "tan", label: "Tan / Uneven Appearance", note: "Care for skin that sees a lot of sun." },
  { id: "cleansing", label: "Deep Cleansing", note: "Go further than an everyday face wash." },
  { id: "hydration", label: "Hydration", note: "Leave skin feeling soft and comfortable." },
] as const;

/* ───────────────────────── Guide ───────────────────────── */

const hydra = pick("hydra-facial");

export const FACIAL_FAQS: Faq[] = [
  {
    q: "What is a facial for men?",
    a: [
      "A facial is a skin-care treatment for the face — usually cleansing, exfoliation, a massage and a mask — that leaves skin feeling clean and refreshed. Steps vary by facial, so ask our team what yours includes.",
    ],
  },
  {
    q: "How often should men get a facial?",
    a: [
      "There is no fixed rule; many men choose roughly once a month. It depends on your skin and routine — call ",
      { text: SITE.phoneDisplay, href: TEL },
      " and our team can suggest what suits you.",
    ],
  },
  {
    q: "Which facial is suitable for dull skin?",
    a: [
      `Dull skin usually calls for deep cleansing and hydration. Our Hydra Facial offer lists instant glow, brighter skin tone and deep cleansing among its benefits. If you're unsure between Type 1–4, our team can recommend one at the salon.`,
    ],
  },
  {
    q: "What is a Hydra Facial?",
    a: [
      `A Hydra Facial is a multi-step treatment that cleanses, exfoliates and hydrates the skin using a dedicated device. At ${SITE.shortName} it is ₹${hydra.offerPrice} (regular ₹${hydra.actualPrice}).`,
    ],
  },
  {
    q: "What is the difference between a facial and cleanup?",
    a: [
      "A cleanup is a shorter, basic routine to clear dirt and oil. A facial goes further, typically adding massage, a mask and more time on the skin.",
    ],
  },
];

/* ───────────────────────── FAQ ───────────────────────── */

const typed = FACIAL_OFFERS.filter((o) => o.label.startsWith("Type"));
const kings = pick("kings-ritual");
const hoursText = HOURS.map((h) => `${h.label}: ${h.display}`).join("\n");

/** Every answer is built from owner-supplied data — no durations, extra prices or medical claims. */
export const FACIAL_PAGE_FAQS: Faq[] = [
  {
    q: "What facial treatments are available?",
    a: [
      `Our facial offers are ${typed.map((o) => `${o.label} (₹${o.offerPrice})`).join(", ")} and the Hydra Facial (₹${hydra.offerPrice}). ${kings.name} (₹${kings.offerPrice}) also includes a Hydra Facial. The salon's services also include Jennot, O3 and other facials — call `,
      { text: SITE.phoneDisplay, href: TEL },
      " to ask about them.",
    ],
  },
  {
    q: "How much is Hydra Facial?",
    a: [`The Hydra Facial offer is ₹${hydra.offerPrice}, down from the regular ₹${hydra.actualPrice}.`],
  },
  {
    q: "Do I need an appointment?",
    a: [
      "No — walk-ins are welcome. If you'd like to plan your visit, message us on ",
      { text: "WhatsApp", href: SITE.whatsappUrl, external: true },
      " or call ",
      { text: SITE.phoneDisplay, href: TEL },
      ".",
    ],
  },
  {
    q: "Are walk-ins accepted?",
    a: [`Yes, walk-ins are welcome during salon hours:\n${hoursText}`],
  },
  {
    q: "How long does a facial take?",
    a: [
      "It depends on the facial or package you choose. Call ",
      { text: SITE.phoneDisplay, href: TEL },
      " and our team will tell you how much time to set aside.",
    ],
  },
  {
    q: "Which facial should I choose?",
    a: [
      "Compare what each offer includes above — Type 1 to Type 4 combine a facial with grooming services, while the Hydra Facial focuses on the skin. If you're unsure, call ",
      { text: SITE.phoneDisplay, href: TEL },
      " and our team will help you pick.",
    ],
  },
  {
    q: "Can men get regular facials?",
    a: [
      "Yes. Many men make a facial part of their grooming routine. How often suits you depends on your skin and lifestyle — our team can advise at the salon.",
    ],
  },
  {
    q: "Where is Express Cuts located?",
    a: [
      `${SITE.addressLines.join(" ").replace(/,$/, "")} (${SITE.landmark}). `,
      { text: "Open in Google Maps", href: SITE.mapsUrl, external: true },
      ".",
    ],
  },
];
