/**
 * Single source of truth for Express Cuts business facts.
 * Everything here comes from the client-supplied brief — do not add claims.
 */

export const SITE = {
  name: "Express Cuts Men's Salon",
  shortName: "Express Cuts",
  established: 2020,
  phone: "8970000135",
  phoneDisplay: "+91 89700 00135",
  whatsappUrl: "https://wa.me/918970000135",
  mapsUrl: "https://maps.app.goo.gl/vHPC961Ncd1EBFVN6",
  addressLines: [
    "25/2, Ayyappa Nagar Main Rd,",
    "Priyadarshini Layout, Krishnarajapuram,",
    "Bengaluru, Karnataka 560037",
  ],
  landmark: "2 KM from Hoodi Circle",
  neighbourhood: "Ayyappa Nagar, KR Puram",
} as const;

export const TEL = "tel:+918970000135";

export function waLink(text?: string) {
  return text
    ? `${SITE.whatsappUrl}?text=${encodeURIComponent(text)}`
    : SITE.whatsappUrl;
}

export type NavItem = { label: string; href: string };

/** Final site architecture. Only "/" exists today; the rest are future pages. */
export const NAV: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Hair", href: "/hair" },
  { label: "Beard", href: "/beard" },
  { label: "Facial", href: "/facial" },
  { label: "Hair Spa", href: "/hair-spa" },
  { label: "Skin Care", href: "/skin-care" },
  { label: "Hair Color", href: "/hair-color" },
  { label: "Keratin", href: "/keratin" },
  { label: "Offers", href: "/offers" },
  { label: "Our Story", href: "/our-story" },
  { label: "Locations", href: "/locations" },
];

export const CONTACT_NAV: NavItem = { label: "Contact", href: "/contact" };

export type HoursRow = {
  label: string;
  short: string;
  days: readonly number[]; // 0 = Sunday
  open: number; // minutes from midnight
  close: number;
  display: string;
};

export const HOURS: readonly HoursRow[] = [
  {
    label: "Monday – Friday",
    short: "Mon – Fri",
    days: [1, 2, 3, 4, 5],
    open: 8 * 60,
    close: 22 * 60,
    display: "08:00 AM – 10:00 PM",
  },
  {
    label: "Saturday – Sunday",
    short: "Sat – Sun",
    days: [0, 6],
    open: 7 * 60,
    close: 22 * 60,
    display: "07:00 AM – 10:00 PM",
  },
];

export function hoursFor(day: number): HoursRow {
  return HOURS.find((h) => h.days.includes(day)) ?? HOURS[0];
}

export function formatMinutes(total: number) {
  const h = Math.floor(total / 60);
  const m = total % 60;
  const suffix = h >= 12 ? "PM" : "AM";
  const h12 = ((h + 11) % 12) + 1;
  return `${h12}:${String(m).padStart(2, "0")} ${suffix}`;
}

export const formatPrice = (n: number) => `₹${n}`;
