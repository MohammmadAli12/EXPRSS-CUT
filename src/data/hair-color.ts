import { OFFERS } from "./offers";

/**
 * Hair Color page content. The three packages are the owner's Deluxe / Executive /
 * Platinum offers, shown here under the hair colour they include — the prices are
 * package prices, never a standalone colour price. Photographs are the five supplied
 * hair-colour files; each package keeps the photo that matches its colour.
 */

export const HAIR_COLOR_HERO = {
  /* Head-and-shoulders crop of the supplied grey-coverage photograph */
  src: "/images/hair-color/hero.jpg",
  width: 736,
  height: 720,
  alt: "Men's hair colour at Express Cuts Men's Salon, KR Puram — client with silver-grey coloured hair",
};

export const COLOR_CHIPS = [
  { id: "natural", label: "Natural Color" },
  { id: "grey", label: "Grey Coverage" },
  { id: "streaks", label: "Hair Streaks" },
  { id: "highlights", label: "Highlights" },
  { id: "bold", label: "Bold Colors" },
  { id: "loreal", label: "L'Oréal Color" },
] as const;

export const COLOR_LOOKS = [
  {
    title: "Natural Hair Color",
    note: "Clean & Natural Finish",
    src: "/images/hair-color/natural.jpg",
    alt: "Men's natural brown hair colour with a clean finish",
    position: "50% 30%",
  },
  {
    title: "Grey Coverage",
    note: "Natural Grey Coverage",
    src: "/images/hair-color/grey-coverage.jpg",
    alt: "Grey hair coverage for men at Express Cuts, KR Puram",
    position: "50% 16%",
  },
  {
    title: "Hair Streaks",
    note: "Bold & Defined Highlights",
    src: "/images/hair-color/streaks.jpg",
    alt: "Men's hair streaks with defined blonde sections",
    position: "50% 18%",
  },
  {
    title: "Hair Highlights",
    note: "Subtle Color Contrast",
    src: "/images/hair-color/highlights.jpg",
    alt: "Men's hair highlights giving a subtle colour contrast",
    position: "50% 16%",
  },
  {
    title: "Fashion Color",
    note: "Stand Out With Color",
    src: "/images/hair-color/fashion.jpg",
    alt: "Bold fashion hair colour for men in a blue shade",
    position: "50% 14%",
  },
] as const;

export const COLOR_STEPS = [
  { title: "Consultation", note: "Color & Hair Assessment" },
  { title: "Color Selection", note: "Choose Your Shade" },
  { title: "Application", note: "Professional Color Application" },
  { title: "Treatment", note: "Care & Processing" },
  { title: "Finish", note: "Styled & Groomed" },
] as const;

const pick = (id: string) => {
  const o = OFFERS.find((x) => x.id === id);
  if (!o) throw new Error(`Missing offer ${id}`);
  return o;
};

/** Package prices that include hair colour — read from the owner's offer list */
export const COLOR_PACKAGES = [
  {
    ...pick("deluxe"),
    label: "Hair Color + Type 2 Facial",
    /* Natural brown colour — matches a standard hair colour package */
    photo: "/images/hair-color/natural.jpg",
    photoAlt: "Client with natural brown hair colour after a grooming package at Express Cuts",
    position: "50% 26%",
  },
  {
    ...pick("executive"),
    label: "Hair Color Streak + Type 3 Facial",
    photo: "/images/hair-color/streaks.jpg",
    photoAlt: "Client with hair colour streaks after a grooming package at Express Cuts",
    position: "50% 16%",
  },
  {
    ...pick("platinum"),
    label: "L'Oréal Hair Color + Type 4 Facial",
    photo: "/images/hair-color/highlights.jpg",
    photoAlt: "Client with L'Oréal hair colour highlights after a grooming package at Express Cuts",
    position: "50% 22%",
  },
];

export const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;
