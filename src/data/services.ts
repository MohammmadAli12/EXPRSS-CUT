import type { ImageFocus } from "./offers";

export type Service = {
  id: string;
  /** Two display lines, as set on the card */
  title: [string, string];
  /** Supporting line for future service pages */
  blurb: string;
  href: string;
  image: string;
  alt: string;
  focus: ImageFocus;
};

export const SERVICES: Service[] = [
  {
    id: "hair-cut",
    title: ["Hair Cut", "& Styling"],
    blurb: "Hair cuts and styling.",
    href: "/hair",
    image: "/images/services/hair-cut.png",
    alt: "Barber cutting a client's textured hair with scissors",
    focus: { position: "64% 50%" },
  },
  {
    id: "beard",
    title: ["Beard", "Grooming"],
    blurb: "Beard trims, shaping and shaves.",
    href: "/beard",
    image: "/images/services/beard-grooming.png",
    alt: "Barber shaping a client's beard line with a trimmer",
    focus: { position: "74% 50%" },
  },
  {
    id: "facial",
    title: ["Facial", "Treatment"],
    blurb: "Jennot, O3 and other facials.",
    href: "/facial",
    image: "/images/services/facial-treatment.png",
    alt: "Therapist brushing a facial mask onto a reclining client",
    focus: { position: "62% 50%" },
  },
  {
    id: "hair-spa",
    title: ["Hair Spa", "& Care"],
    blurb: "Hair spa and hair treatments.",
    href: "/hair-spa",
    image: "/images/services/hair-spa.png",
    alt: "Client at the wash basin during a hair spa",
    focus: { position: "42% 50%" },
  },
  {
    id: "skin-care",
    title: ["Skin Care", "For Men"],
    blurb: "Hydra Facial, De-Tan and skin care.",
    href: "/skin-care",
    image: "/images/services/skin-care.jpg",
    alt: "Client relaxing during a skin-care mask treatment",
    focus: { position: "50% 42%" },
  },
  {
    id: "keratin",
    title: ["Keratin", "Treatment"],
    blurb: "Keratin and Nanoplastia.",
    href: "/keratin",
    image: "/images/services/keratin.png",
    alt: "Stylist brushing keratin treatment through a client's hair",
    focus: { position: "40% 88%", scale: 1.12, origin: "30% 85%" },
  },
];
