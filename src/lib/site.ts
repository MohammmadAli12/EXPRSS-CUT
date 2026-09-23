/**
 * Single source of truth for Express Cuts business facts.
 * Everything here comes from the client-supplied brief — do not add claims.
 */

export const SITE = {
  /** Public origin, once the domain is live — set NEXT_PUBLIC_SITE_URL to enable canonical/OG URLs */
  url: process.env.NEXT_PUBLIC_SITE_URL,
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
  /* Keyless embed of the same place the short maps link opens */
  mapsEmbedUrl: `https://www.google.com/maps?q=${encodeURIComponent(
    "Express Cuts Men's Salon, 25/2, Ayyappa Nagar Main Rd, Priyadarshini Layout, Krishnarajapuram, Bengaluru, Karnataka 560037",
  )}&output=embed`,
} as const;

export const TEL = "tel:+918970000135";

export function waLink(text?: string) {
  return text
    ? `${SITE.whatsappUrl}?text=${encodeURIComponent(text)}`
    : SITE.whatsappUrl;
}

export type NavItem = { label: string; href: string };
/** A top-level entry that opens a list instead of navigating */
export type NavGroup = { label: string; children: NavItem[] };

/**
 * The service pages that exist. Add a page here when it is built — the navbar,
 * the menu sheet and the footer all read this list, so nothing ever links to a
 * route that isn't there.
 */
export const SERVICE_NAV: NavItem[] = [
  { label: "Hair", href: "/hair" },
  { label: "Beard", href: "/beard" },
  { label: "Facial", href: "/facial" },
  { label: "Hair Spa", href: "/hair-spa" },
  { label: "Hair Color", href: "/hair-color" },
];

/** The top-level entries; every service sits under Services. */
export const NAV: (NavItem | NavGroup)[] = [
  { label: "Home", href: "/" },
  { label: "Services", children: SERVICE_NAV },
  { label: "Offers", href: "/offers" },
  { label: "Gallery", href: "/gallery" },
  { label: "Our Story", href: "/our-story" },
];

export const isGroup = (item: NavItem | NavGroup): item is NavGroup => "children" in item;

/** True while the current route belongs to the Services group */
export const inServices = (pathname: string) => SERVICE_NAV.some((s) => s.href === pathname);

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

/** True only while the supplied hours cover every day of the week */
export const OPEN_ALL_WEEK = new Set(HOURS.flatMap((h) => h.days)).size === 7;

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
