/**
 * Grooming packages — exact names, prices and inclusions from the client brief.
 * `focus` only controls the photographic crop inside the card's image frame.
 */

export type ImageFocus = {
  /** CSS object-position */
  position: string;
  /** Optional extra zoom used to keep baked-in wall signage out of frame */
  scale?: number;
  origin?: string;
  /**
   * Zoom OUT past the frame: the sharp photo shows `visible` of its height
   * starting at `top` (fractions of the source height), centred at `x`% of the
   * frame, over a blurred copy of itself. `aspect` is the source width / height.
   */
  zoomOut?: { visible: number; top: number; aspect: number; x?: number };
};

export type Offer = {
  id: string;
  number: string;
  name: string;
  actualPrice: number;
  offerPrice: number;
  services: string[];
  image: string;
  alt: string;
  focus: ImageFocus;
};

export const OFFERS: Offer[] = [
  {
    id: "classic",
    number: "01",
    name: "Classic",
    actualPrice: 320,
    offerPrice: 249,
    services: ["Men Hair Cut", "Beard Trim / Shaving", "Head Massage"],
    image: "/images/offers/classic.jpg",
    alt: "Man with a neatly styled side-swept haircut and trimmed beard",
    focus: { position: "50% 40%", zoomOut: { visible: 0.8, top: 0.06, aspect: 735 / 919, x: 50 } },
  },
  {
    id: "premium",
    number: "02",
    name: "Premium",
    actualPrice: 620,
    offerPrice: 399,
    services: ["Men Hair Cut", "Beard Trim / Shaving", "Head Massage", "De-Tan"],
    image: "/images/offers/premium.png",
    alt: "Barber cleaning up a textured fade with clippers",
    focus: { position: "40% 40%", scale: 1.45, origin: "22% 45%" },
  },
  {
    id: "signature",
    number: "03",
    name: "Signature",
    actualPrice: 920,
    offerPrice: 699,
    services: ["Men Hair Cut", "Beard Trim / Shaving", "Head Massage", "Type-1 Facial"],
    image: "/images/offers/signature.jpg",
    alt: "Client relaxing while a facial mask is brushed on",
    focus: { position: "50% 46%" },
  },
  {
    id: "deluxe",
    number: "04",
    name: "Deluxe",
    actualPrice: 1320,
    offerPrice: 899,
    services: [
      "Men Hair Cut",
      "Beard Trim / Shaving",
      "Head Massage",
      "Type-2 Facial",
      "Hair Color",
    ],
    image: "/images/offers/deluxe.jpg",
    alt: "Face mask being applied with a brush and sponge",
    focus: { position: "50% 48%" },
  },
  {
    id: "executive",
    number: "05",
    name: "Executive",
    actualPrice: 1520,
    offerPrice: 1099,
    services: [
      "Men Hair Cut",
      "Beard Trim / Shaving",
      "Head Massage",
      "Type-3 Facial",
      "Hair Color - Streak",
    ],
    image: "/images/offers/executive.png",
    alt: "Stylist blow-drying a client's streaked, highlighted hair",
    focus: { position: "50% 30%", scale: 1.5, origin: "15% 36%" },
  },
  {
    id: "platinum",
    number: "06",
    name: "Platinum",
    actualPrice: 1920,
    offerPrice: 1399,
    services: [
      "Men Hair Cut",
      "Beard Trim / Shaving",
      "Head Massage",
      "Type-4 Facial",
      "Hair Color - L'Oréal",
    ],
    image: "/images/offers/platinum.png",
    alt: "Client with highlighted, styled hair relaxing in the salon lounge",
    focus: { position: "50% 30%", scale: 1.6, origin: "44% 40%" },
  },
  {
    id: "pedi-mani",
    number: "07",
    name: "Men Pedi & Mani",
    actualPrice: 1600,
    offerPrice: 999,
    services: ["Men Hair Cut", "Beard Trim / Shaving", "Manicure", "Pedicure"],
    image: "/images/offers/pedi-mani.png",
    alt: "Client seated in a lounge chair during a pedicure",
    focus: { position: "50% 16%", zoomOut: { visible: 0.9, top: 0.06, aspect: 1145 / 1374, x: 50 } },
  },
  {
    id: "hydra-facial",
    number: "08",
    name: "Hydra Facial",
    actualPrice: 3999,
    offerPrice: 1999,
    services: [
      "Instant Glow",
      "Hydration Boost for Your Skin",
      "Brightens Skin Tone",
      "Improves Skin Texture",
      "Deep Cleans Oil & Dirt",
      "Removes Tan",
      "Anti-Aging Benefits",
    ],
    image: "/images/offers/hydra-facial.png",
    alt: "Hydra facial treatment being performed on a reclining client",
    focus: { position: "50% 38%" },
  },
  {
    id: "kings-ritual",
    number: "09",
    name: "The King's Ritual",
    actualPrice: 5800,
    offerPrice: 2999,
    services: [
      "Men Hair Cut",
      "Beard Trim / Shaving",
      "Hair Spa",
      "Hydra Facial",
      "Pedicure",
      "Manicure",
    ],
    image: "/images/offers/kings-ritual.png",
    alt: "Client in a robe receiving hair, facial, manicure and pedicure care together",
    focus: { position: "50% 10%", scale: 1.5, origin: "30% 16%" },
  },
];

export const saving = (o: Offer) => o.actualPrice - o.offerPrice;
