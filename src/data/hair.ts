import type { ImageFocus } from "./offers";

/**
 * Hair Cut & Styling page content.
 * Style names, descriptors and guide copy are exactly as supplied by the owner.
 * `focus` only controls the crop inside each frame — the source files are untouched.
 */

/* ───────────────────────── The looks ───────────────────────── */

export type CutStyle = {
  id: string;
  number: string;
  name: string;
  /** One very short style descriptor */
  descriptor: string;
  image: string;
  alt: string;
  focus: ImageFocus;
};

export const CUT_STYLES: CutStyle[] = [
  {
    id: "classic",
    number: "01",
    name: "Classic",
    descriptor: "Timeless. Always right.",
    image: "/images/hair/cuts/classic-side-part.png",
    alt: "Side profile of a polished classic side part with a tapered back",
    focus: { position: "52% 22%" },
  },
  {
    id: "buzz-fade",
    number: "02",
    name: "Buzz Fade",
    descriptor: "Clean. Sharp. Minimal.",
    image: "/images/hair/cuts/buzz-fade.webp",
    alt: "Side profile of a short buzz cut with a clean skin fade",
    focus: { position: "55% 30%" },
  },
  {
    id: "flow-cut",
    number: "03",
    name: "Flow Cut",
    descriptor: "Natural. Effortless.",
    image: "/images/hair/cuts/flow-cut.jpg",
    alt: "Back view of a grown-out flow cut swept away from the face",
    focus: { position: "46% 40%" },
  },
  {
    id: "high-taper-fade",
    number: "04",
    name: "High Taper Fade",
    descriptor: "Bold. Modern. Defined.",
    image: "/images/hair/cuts/high-taper-fade.webp",
    alt: "Textured crop with a high taper fade and a straight fringe",
    focus: { position: "45% 28%" },
  },
  {
    id: "low-taper-fade",
    number: "05",
    name: "Low Taper Fade",
    descriptor: "Clean. Subtle. Versatile.",
    image: "/images/hair/cuts/low-taper-fade.webp",
    alt: "Side profile of a messy fringe finished with a low taper fade",
    focus: { position: "52% 28%" },
  },
  {
    id: "messy-quiff",
    number: "06",
    name: "Messy Quiff",
    descriptor: "Textured. Stylish. Modern.",
    image: "/images/hair/cuts/messy-quiff.webp",
    alt: "Wavy messy quiff with a tapered side and short stubble",
    focus: { position: "48% 26%" },
  },
  {
    id: "mid-taper-fade",
    number: "07",
    name: "Mid Taper Fade",
    descriptor: "Balanced. Sharp. Trendy.",
    image: "/images/hair/cuts/mid-taper-fade.webp",
    alt: "Side profile of a volume top styled over a mid taper fade",
    focus: { position: "50% 26%" },
  },
  {
    id: "textured-cut",
    number: "08",
    name: "Textured Cut",
    descriptor: "Natural. Modern. Versatile.",
    image: "/images/cuts/textured.jpg",
    alt: "Textured, swept medium-length haircut with light stubble",
    /* The bottom of the frame keeps the source's corner watermark out of view */
    focus: { position: "50% 100%" },
  },
  {
    id: "wolf-cut",
    number: "09",
    name: "Wolf Cut",
    descriptor: "Edgy. Laid-back. Different.",
    image: "/images/hair/cuts/wolf-cut.jpg",
    alt: "Shoulder-length layered wolf cut with a full beard",
    focus: { position: "50% 30%" },
  },
  {
    id: "disconnected-side-part",
    number: "10",
    name: "Disconnected Side Part",
    descriptor: "Bold. Refined. Distinctive.",
    image: "/images/offers/classic.jpg",
    alt: "Swept-back disconnected side part with a tapered side and beard",
    focus: { position: "50% 28%" },
  },
];

/* ───────────────────────── Know your hair type ───────────────────────── */

export type HairType = {
  id: string;
  name: string;
  /** Two short lines, as supplied */
  lines: [string, string];
  image: string;
  alt: string;
  focus: ImageFocus;
};

/** Cropped onto the hair of five of the style photographs — no separate swatch files exist. */
export const HAIR_TYPES: HairType[] = [
  {
    id: "straight",
    name: "Straight",
    lines: ["Easy to manage.", "Needs neat, structured cuts."],
    image: "/images/hair/cuts/classic-side-part.png",
    alt: "Close crop of straight, combed hair",
    focus: { position: "50% 12%" },
  },
  {
    id: "wavy",
    name: "Wavy",
    lines: ["Natural volume.", "Works well with textured styles."],
    image: "/images/hair/cuts/messy-quiff.webp",
    alt: "Close crop of loose, wavy hair",
    focus: { position: "50% 10%" },
  },
  {
    id: "curly",
    name: "Curly",
    lines: ["Fuller look.", "Needs shape and definition."],
    image: "/images/hair/cuts/buzz-fade.webp",
    alt: "Close crop of tight, curly hair",
    focus: { position: "52% 8%" },
  },
  {
    id: "thick",
    name: "Thick",
    lines: ["Adds natural volume.", "Works with structured styles."],
    image: "/images/hair/cuts/mid-taper-fade.webp",
    alt: "Close crop of thick, dense hair",
    focus: { position: "45% 12%" },
  },
  {
    id: "thin",
    name: "Thin",
    lines: ["Lightweight styles.", "Works well with smart layering."],
    image: "/images/hair/cuts/low-taper-fade.webp",
    alt: "Close crop of fine, lightweight hair",
    focus: { position: "50% 10%" },
  },
];

/* ───────────────────────── Face shape guide ───────────────────────── */

export type FaceShape = {
  id: string;
  name: string;
  line: string;
  /** SVG path drawn inside a 48 × 60 box */
  path: string;
};

export const FACE_SHAPES: FaceShape[] = [
  {
    id: "oval",
    name: "Oval",
    line: "Most styles work.",
    path: "M24 3c11 0 18 11 18 25s-8 29-18 29S6 42 6 28 13 3 24 3Z",
  },
  {
    id: "round",
    name: "Round",
    line: "Add height and definition.",
    path: "M24 4c12 0 20 11 20 26S36 57 24 57 4 45 4 30 12 4 24 4Z",
  },
  {
    id: "square",
    name: "Square",
    line: "Structured styles work well.",
    path: "M8 14a10 10 0 0 1 10-10h12a10 10 0 0 1 10 10v28a10 10 0 0 1-10 10H18A10 10 0 0 1 8 42Z",
  },
  {
    id: "heart",
    name: "Heart",
    line: "Keep balance around the jaw.",
    path: "M6 16a12 12 0 0 1 12-12h12a12 12 0 0 1 12 12c0 18-10 41-18 41S6 34 6 16Z",
  },
  {
    id: "diamond",
    name: "Diamond",
    line: "Texture and volume work well.",
    path: "M24 3c8 5 18 16 18 27S32 57 24 57 6 41 6 30 16 8 24 3Z",
  },
];

/* ───────────────────────── Our process ───────────────────────── */

export type ProcessStep = { number: string; title: string; line: string };

export const PROCESS_STEPS: ProcessStep[] = [
  { number: "01", title: "Consultation", line: "We understand your style and preference." },
  { number: "02", title: "Precision Cut", line: "Expert cutting techniques for the perfect look." },
  { number: "03", title: "Styling", line: "Professional styling to complete your look." },
  { number: "04", title: "Walk Out Confident", line: "A sharper, more confident you." },
];

/* ───────────────────────── Hair guide ───────────────────────── */

export const HAIR_GUIDE_TOPICS = ["By Face Shape", "By Hair Type", "Maintenance Tips"] as const;

/** Built later; the link lands on the shared "coming soon" page until then. */
export const HAIR_GUIDE_HREF = "/hair-guide";
