import type { ImageFocus } from "./offers";

/**
 * Popular services — names, prices and copy exactly as supplied by the salon owner.
 * Photographs are the owner's service images (the same files as the service cards).
 */

export type PopularService = {
  id: string;
  title: string;
  /** One or more short paragraphs, as supplied */
  description: string[];
  price: {
    /** The price the client pays today */
    offer: number;
    /** Regular price, shown struck through when present */
    actual?: number;
    /** "Starts at" pricing */
    from?: boolean;
  };
  icon: "scissors" | "beard" | "shower";
  image: string;
  alt: string;
  focus: ImageFocus;
};

export const POPULAR_SERVICES: PopularService[] = [
  {
    id: "haircut",
    title: "Men’s Haircut",
    description: ["Professional haircut tailored to your style."],
    price: { actual: 149, offer: 99 },
    icon: "scissors",
    image: "/images/services/hair-cut.png",
    alt: "Barber cutting a client's textured hair with a comb and scissors",
    focus: { position: "55% 32%" },
  },
  {
    id: "beard",
    title: "Beard Trim & Line-Up",
    description: ["Keep your beard sharp and well-defined."],
    price: { actual: 100, offer: 70 },
    icon: "beard",
    image: "/images/services/beard-grooming.png",
    alt: "Barber shaping a client's beard line with a trimmer",
    focus: { position: "62% 40%" },
  },
  {
    id: "wash-cut-style",
    title: "Wash, Cut & Style",
    description: [
      "The full package. Includes a relaxing wash, detailed cut, and professional styling.",
      "The ultimate men’s grooming experience in KR Puram.",
    ],
    price: { offer: 199, from: true },
    icon: "shower",
    image: "/images/services/hair-spa.png",
    alt: "Client relaxing at the wash basin during a hair wash",
    focus: { position: "50% 38%" },
  },
];

/** Starting haircut price, as quoted in the hero */
export const HAIRCUT_FROM = POPULAR_SERVICES[0].price.offer;

/**
 * The same three services, shaped for the shared offer card (see
 * components/offer-card). Nothing is added here: no savings — the brief
 * publishes none for these — and no inclusions, only the copy above.
 */
export const SERVICE_CARDS = POPULAR_SERVICES.map((s) => ({
  id: s.id,
  name: s.title,
  price: s.price.offer,
  wasPrice: s.price.actual,
  priceNote: s.price.from ? "Starts at" : undefined,
  description: s.description,
  image: s.image,
  alt: s.alt,
  position: s.focus.position,
}));
