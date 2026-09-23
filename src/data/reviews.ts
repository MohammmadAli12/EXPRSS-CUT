/**
 * Client reviews — VERBATIM from the salon's Google Business Profile, as supplied
 * by the salon owner (Sep 2026). Dates are Google's relative labels at that time.
 *
 * Never write, paraphrase, translate, complete or tidy review text (05 and 10 end
 * mid-sentence in the source — keep them that way). Never invent reviewer names,
 * ratings or photos.
 *
 * Avatars: only URLs supplied for that reviewer. Reviews 07 and 08 were supplied
 * with the same avatar URL, so both show initials until the correct one is known.
 */

export type Review = {
  /** Reviewer name exactly as shown on Google */
  author: string;
  /** Profile line exactly as shown, e.g. "Local Guide · 32 reviews · 73 photos" */
  meta: string;
  rating: 1 | 2 | 3 | 4 | 5;
  /** Google's date label, e.g. "7 months ago" */
  date: string;
  /** Review text exactly as posted */
  text: string;
  /** Google profile photo, only when supplied for this reviewer */
  avatar?: string;
  /** Link to the review on Google, if supplied */
  sourceUrl?: string;
};

/** "Read all reviews on Google" destination, as supplied */
export const GOOGLE_REVIEWS_URL = "https://maps.app.goo.gl/vv6XdyztiHF6L5rK9";

export const REVIEWS: Review[] = [
  {
    author: "Kiran Kumar",
    meta: "6 reviews · 1 photo",
    rating: 5,
    date: "Edited a month ago",
    text: "Thank you so much for the excellent haircut today Salman (Hair Stylist). Your attention to detail and understanding of what suits me makes a huge difference, and I really appreciate the care you put into your work. I always leave your chair feeling more confident and well-groomed, and I genuinely appreciate you as skilled barber and for your dedication at work.",
    sourceUrl: GOOGLE_REVIEWS_URL,
  },
  {
    author: "Darshancn Darshan",
    meta: "5 reviews",
    rating: 5,
    date: "7 months ago",
    text: "got my haircut done by Salman and had a great experience. His skills are excellent, and the haircut was very stylish. The classic package was also totally worth the price.",
  },
  {
    author: "Vinay K",
    meta: "3 reviews",
    rating: 5,
    date: "7 months ago",
    text: "Great experience at the salon. Mohammad Shami did an excellent job—very friendly, attentive, and the head massage was extremely relaxing. Will definitely visit again.",
    avatar:
      "https://lh3.googleusercontent.com/a/ACg8ocI6lJgir071YjjMRzZfoelprEBOCEjzE4mRmJ-r9GKHaEIR3-5p=w45-h45-p-rp-mo-br100",
  },
  {
    author: "Akshaya kumar",
    meta: "Local Guide · 32 reviews · 73 photos",
    rating: 5,
    date: "8 months ago",
    text: "Wajid did a very good haircut. He was very frank and patient. The cost here is good. Looks costly but price is good",
  },
  {
    author: "Enoch Immanuel",
    meta: "11 reviews",
    rating: 5,
    date: "3 months ago",
    text: "They understand you well and give you the haircut you want, Shami was particularly great.\n\nPrice…",
    avatar:
      "https://lh3.googleusercontent.com/a-/ALV-UjW_UJLB_MfX43V-phFsICt806fLBA5zImYPdJINks3P5D_90Prd=w45-h45-p-rp-mo-br100",
  },
  {
    author: "Chethan gowda",
    meta: "4 reviews",
    rating: 5,
    date: "3 months ago",
    text: "I had haircut with shami he made it so elegant loved his work thank you shami",
  },
  {
    author: "prince raj",
    meta: "Local Guide · 15 reviews · 29 photos",
    rating: 5,
    date: "7 months ago",
    text: "I took haircut, shaving and message in the shop and it was really great job done. Wazid was really professional in his work and did his job amazingly. Charges are also very nominal with exceptional service.",
  },
  {
    author: "Sooraj Neminath Kotabagi",
    meta: "Local Guide · 187 reviews · 197 photos",
    rating: 5,
    date: "8 months ago",
    text: "Got a haircut from Shami and I’m really satisfied. He understood exactly what I wanted and paid attention to the details. The cut was neat, stylish, and well-finished. Definitely recommend him for a clean and professional haircut 👍",
  },
  {
    author: "Abhishek Kadavergu",
    meta: "Local Guide · 170 reviews · 480 photos",
    rating: 5,
    date: "a year ago",
    text: "Express Cut offers great service at reasonable prices. The stylist is professional and skilled. The salon has a pleasant ambience, good music, and the staff is polite. Overall, a great experience!",
    avatar:
      "https://lh3.googleusercontent.com/a-/ALV-UjXfuZYPxzwKw_P2KAydX2s2ZsZJTOrHbfdOMVHq5Lf17nOt1Nc-nw=w45-h45-p-rp-mo-ba12-br100",
  },
  {
    author: "Md Sadiq Ali",
    meta: "3 reviews",
    rating: 5,
    date: "7 months ago",
    text: "Best experience in haircut i have got and specially with a barber named as Salman gave the good suggestions and the good...",
  },
];

/**
 * Figures supplied by the salon owner from the Google listing.
 * They change over time — update value, count and asOf together.
 */
export const GOOGLE_RATING = { value: 4.7, count: 990, asOf: "Sep 2026" } as const;
