import { ALL_OFFERS_2, type Offer2 } from "./offers-2";
import { OFFERS } from "./offers";

/**
 * The nine grooming packages on the homepage.
 *
 * Names, prices, savings, inclusions and badges come from the approved offers
 * data (src/data/offers-2.ts) — the same records the offers page renders, so the
 * two can never drift. Only the photograph is the homepage's own: its files, its
 * numbering, and the focus point that keeps each subject in the 4:3 frame.
 *
 * The three à-la-carte offers (haircut, beard trim, wash & style) are not
 * packages, so the homepage section does not list them.
 */

export type HomeOffer = Offer2 & {
  /** The 01–09 chip over the photograph */
  number: string;
  /** Extra zoom, where object-position alone cannot keep signage out of frame */
  scale?: number;
  origin?: string;
};

type Photo = { offer: string; position: string; scale?: number; origin?: string };

/** Offer id → the homepage photograph, and how it sits in the card's 4:3 frame */
const PHOTOS: Record<string, Photo> = {
  classic: { offer: "classic", position: "50% 32%" },
  /* The wider homepage frames of these two are zoomed to the same window the
     offers page shows, which also keeps the wall signage out */
  premium: { offer: "premium", position: "0% 39%", scale: 1.19, origin: "0% 39%" },
  signature: { offer: "signature", position: "50% 42%" },
  deluxe: { offer: "deluxe", position: "50% 45%" },
  executive: { offer: "executive", position: "42% 38%" },
  platinum: { offer: "platinum", position: "55% 40%" },
  "pedi-mani": { offer: "pedi-mani", position: "50% 30%" },
  hydra: { offer: "hydra-facial", position: "45% 30%" },
  kings: { offer: "kings-ritual", position: "0% 18%", scale: 1.4, origin: "0% 18%" },
};

export const HOME_OFFERS: HomeOffer[] = ALL_OFFERS_2.flatMap((offer) => {
  const photo = PHOTOS[offer.id];
  if (!photo) return [];
  const home = OFFERS.find((o) => o.id === photo.offer);
  if (!home) return [];
  return [
    {
      ...offer,
      number: home.number,
      image: home.image,
      alt: home.alt,
      position: photo.position,
      scale: photo.scale,
      origin: photo.origin,
    },
  ];
});
