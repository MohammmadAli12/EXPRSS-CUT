import type { ImageFocus } from "./offers";

/**
 * "Cuts made for you" — the owner-supplied style photographs.
 * `focus` only controls the crop inside the 4:5 frame (hair and face stay in view).
 */

export type Cut = {
  id: string;
  number: string;
  label: string;
  image: string;
  alt: string;
  focus: ImageFocus;
};

export const CUTS: Cut[] = [
  {
    id: "fade",
    number: "01",
    label: "Fade",
    image: "/images/cuts/fade.jpg",
    alt: "Side profile of a skin fade with a slicked-back top and full beard",
    focus: { position: "50% 18%" },
  },
  {
    id: "classic",
    number: "02",
    label: "Classic",
    image: "/images/offers/classic.jpg",
    alt: "Neatly styled classic side-swept haircut with a trimmed beard",
    focus: { position: "50% 40%" },
  },
  {
    id: "textured",
    number: "03",
    label: "Textured",
    image: "/images/cuts/textured.jpg",
    alt: "Textured, swept medium-length haircut with light stubble",
    /* The bottom of the frame keeps the source's corner watermark out of view */
    focus: { position: "50% 100%" },
  },
  {
    id: "beard",
    number: "04",
    label: "Beard",
    image: "/images/cuts/beard.jpg",
    alt: "Side profile of a sculpted, sharply lined beard",
    focus: { position: "50% 62%" },
  },
  {
    id: "hair-color",
    number: "05",
    label: "Hair Color",
    image: "/images/cuts/hair-color.jpg",
    alt: "Tousled haircut with warm brown colour highlights",
    focus: { position: "50% 12%" },
  },
  {
    id: "keratin",
    number: "06",
    label: "Keratin",
    image: "/images/services/keratin.png",
    alt: "Stylist brushing keratin treatment through a client's hair",
    focus: { position: "40% 88%", scale: 1.12, origin: "30% 85%" },
  },
];
