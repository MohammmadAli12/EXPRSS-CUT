import { HOURS, SITE, TEL, formatMinutes } from "@/lib/site";
import { OFFERS } from "./offers";

/**
 * FAQ — questions and answers as supplied by the salon owner. Facts that also
 * appear elsewhere on the page are read from site.ts / offers.ts so they can't drift.
 */

export type FaqPart = string | { text: string; href: string; external?: boolean };
export type Faq = { q: string; a: FaqPart[] };

const hours = (i: number) => `${formatMinutes(HOURS[i].open)} – ${formatMinutes(HOURS[i].close)}`;
const names = OFFERS.map((o) => o.name);

export const FAQS: Faq[] = [
  {
    q: "What are your salon timings?",
    a: [`Monday to Friday: ${hours(0)}\nSaturday and Sunday: ${hours(1)}`],
  },
  {
    q: "Where is Express Cuts Men's Salon located?",
    a: [`${SITE.addressLines.join(" ").replace(/,$/, "")}.`],
  },
  {
    q: "How can I book an appointment?",
    a: [
      "Book through the website, call ",
      { text: SITE.phoneDisplay, href: TEL },
      ", or contact us on ",
      { text: "WhatsApp", href: SITE.whatsappUrl, external: true },
      ".",
    ],
  },
  {
    q: "What grooming services do you offer?",
    a: [
      "Hair Cuts, Hair Styling, Hair Color, Hair Spa, Nanoplastia, Keratin, Hydra Facial, Jennot, O3 and other facials, Heel Peel, Pedicure, Manicure and many more.",
    ],
  },
  {
    q: "Is Express Cuts unisex?",
    a: ["The salon is identified as Salon-Unisex."],
  },
  {
    q: "How far is the salon from Hoodi Circle?",
    a: ["The salon is located approximately 2 KM from Hoodi Circle."],
  },
  {
    q: "What grooming packages are available?",
    a: [`${names.slice(0, -1).join(", ")} and ${names.at(-1)}.`],
  },
  {
    q: "What makes Express Cuts different?",
    a: ["High-quality service with value-based pricing in KR Puram."],
  },
];
