/**
 * The salon, photographed. Nine real pictures — five of the rooms as the owner
 * had them shot, four taken in the salon itself — and nothing else: the design
 * reference files are never shipped.
 */

export type GalleryCategory = "The Salon" | "The Space" | "The Experience" | "The Details";

export type GalleryPhoto = {
  src: string;
  alt: string;
  width: number;
  height: number;
  category: GalleryCategory;
};

const img = (name: string) => `/images/gallery/${name}.webp`;

/** The hero photograph: the room you walk into */
export const GALLERY_HERO = {
  src: img("express-cuts-salon-gallery-hero-kr-puram"),
  alt: "Inside Express Cuts Men's Salon in Ayyappa Nagar, KR Puram — styling chairs, product shelves and the reception desk",
  width: 1448,
  height: 603,
};

/* Rows alternate the wider room views with the closer, everyday pictures */
export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    src: img("express-cuts-salon-exterior-kr-puram"),
    alt: "Express Cuts Men's Salon storefront lit up on Ayyappa Nagar Main Rd, KR Puram",
    width: 1600,
    height: 720,
    category: "The Salon",
  },
  {
    src: img("express-cuts-salon-reception-ayyappa-nagar"),
    alt: "Express Cuts Men's Salon reception desk in Ayyappa Nagar, Bengaluru",
    width: 1145,
    height: 1374,
    category: "The Details",
  },
  {
    src: img("express-cuts-salon-wash-area-kr-puram"),
    alt: "Hair wash station at Express Cuts Men's Salon in KR Puram",
    width: 1400,
    height: 1050,
    category: "The Space",
  },
  {
    src: img("express-cuts-salon-styling-stations-kr-puram"),
    alt: "Styling chairs and lit mirrors on the salon floor at Express Cuts, KR Puram",
    width: 1460,
    height: 1077,
    category: "The Salon",
  },
  {
    src: img("mens-haircut-express-cuts-kr-puram"),
    alt: "Men's haircut finished with a taper fade at Express Cuts Men's Salon, KR Puram",
    width: 1100,
    height: 1467,
    category: "The Experience",
  },
  {
    src: img("express-cuts-salon-product-wall-kr-puram"),
    alt: "Shelves of hair and grooming products beside the styling chairs at Express Cuts, KR Puram",
    width: 1400,
    height: 1053,
    category: "The Details",
  },
  {
    src: img("express-cuts-salon-interior-kr-puram"),
    alt: "Wide view of the Express Cuts Men's Salon interior in Krishnarajapuram, Bengaluru",
    width: 1448,
    height: 1086,
    category: "The Space",
  },
  {
    src: img("express-cuts-facial-room-kr-puram"),
    alt: "Facial and skin treatment room at Express Cuts Men's Salon in KR Puram",
    width: 1100,
    height: 1467,
    category: "The Space",
  },
  {
    src: img("kids-haircut-express-cuts-kr-puram"),
    alt: "A young client's haircut finished at Express Cuts Men's Salon, Ayyappa Nagar",
    width: 1100,
    height: 1358,
    category: "The Experience",
  },
];

export const GALLERY_FILTERS: ("All Photos" | GalleryCategory)[] = [
  "All Photos",
  "The Salon",
  "The Space",
  "The Experience",
  "The Details",
];
