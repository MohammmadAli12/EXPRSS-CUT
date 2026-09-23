# Express Cuts — Design System (as built)

Documented from the shipped homepage (`src/`), not from intention. The visual authority is `C:\express cut\REFRENCE IMAGE.png`.

## World
A local salon presented as a men's grooming house: editorial fashion layout, warm paper grounds, near-black type, one champagne accent, and one red reserved **only** for offer prices. Photography is always the supplied salon imagery.

## Tokens (`src/app/globals.css` → `@theme`)
| Token | Value | Use |
|---|---|---|
| `ivory` | `#f7f3ee` | Page ground, dialogs, menu |
| `hero` | `#fbf8f5` | Hero ground (sampled from the hero photo's cream field) |
| `hero-mobile` | `#f7f1e8` | Mobile hero ground (<1024px) — sampled from the mobile photo's curved cream top so the curve has no seam |
| `cream` | `#efe8de` | Offers band |
| `paper` | `#ffffff` | Cards, trust strip, inputs |
| `ink` | `#121110` | Type, primary buttons |
| `charcoal` / `night` | `#1b1917` / `#0f0e0d` | Final CTA band / footer |
| `line` | `#e5dcd0` | Hairlines, dividers, input borders |
| `champagne` | `#a9845a` | Italic display accents, check icons, active-nav underline (large text/icons only — 3.1:1) |
| `champagne-soft` | `#e8dccb` | Accents on dark grounds, "Save ₹X" chip text |
| `price` | `#c8102e` | Offer price and form errors only |
| `call` / `call-deep` | `#1b7a4a` / `#145c38` | Green Call / WhatsApp actions only: offer-card Call pill, Find us card, phone action bar (5.4:1 with white) |
| `ink-soft` / `ink-muted` | `#2e2b28` / `#4a4540` | Body, lists, descriptions / labels, metadata, eyebrows, struck prices (12.8:1 / 8.6:1 on ivory) |
| `ivory-soft` / `ivory-muted` | `#ece6dd` / `#c9c0b4` | Body / labels on charcoal and night |

Secondary text is always a **solid** token (`ink-soft`, `ink-muted`, `ivory-soft`, `ivory-muted`) — never translucent `ink/NN` text, which greys out and misbehaves over images. Opacity is for borders and decoration only. Easing: `--ease-editorial: cubic-bezier(0.22,1,0.36,1)`.

## Type
- **Display:** Bodoni Moda (variable, opsz), weight 600, **optical size pinned to 11** (`.font-display { font-optical-sizing: none; font-variation-settings: "opsz" var(--display-opsz) }`). Left on `auto`, large headings pick the hairline display cut and read as faint; 11 was chosen by rendering auto/36/24/18/11 × 500/600 beside the reference. Italic at 500 in `champagne` for the emphasised word ("*Everyday*", "*Feel Better.*"). H1 `clamp(3.1rem,6.2vw,5.5rem)` lh 0.98; H2 `clamp(2.2rem,4vw,3.4rem)` lh ~1.02; tracking −0.015 to −0.025em.
- **UI/body:** Inter (latin + latin-ext for ₹). Body 15–18px/1.55; nav 13px/500 at `ink-soft`, no wrapping. Nothing important below 12px (Wordmark sub-line and offer badges are 12px).
- **Eyebrow:** `.eyebrow` — 12px, 600, uppercase, 0.3em tracking, `ink-muted`.
- **Price:** Inter 800, 36px, −0.035em, tabular, solid `price`; regular price 16px `<s>` at `ink-muted`.
- **Script:** Mrs Saint Delafield — exactly two uses: "Step into our world" (photo caption) and "Stay sharp" (footer).

## Layout
- `.shell`: max 82rem, gutter `clamp(1.25rem,4vw,2.75rem)`. `pl-shell`/`px-shell` align full-bleed rows to the shell edge.
- Nav height 72px (84px ≥1024). Section rhythm 96–128px vertical.
- Rhythm: hero (impact) → trust strip → popular services → services (calm) → offers band (impact) → cuts made for you → experience (calm) → client reviews (compact) → FAQ + Find us (one screen) → charcoal final CTA → footer.
- Mobile hero (<1024px, `sections/HeroMobile.tsx`, reference `hero refrence mobile view4.png`): its own composition, not the desktop one shrunk. Eyebrow → "A Better / You *Everyday.*" → "Men’s haircuts, beard & grooming in KR Puram, Bengaluru." → full-width Book Your Appointment → "or call +91 89700 00135" → rating row → live open status → 3-up trust row (Hygienic & Safe · Walk-ins Welcome · Since 2020) → "₹99 haircut · walk-in · no hidden charges." → full-width `hero-mobile.png` (whole composition, its baked-in curve is the cream→photo transition) → `#hero-cta` bar (₹99 Haircut From · green Call Now · black Book Now), the bottom of the hero, not fixed. Desktop markup is wrapped in `hidden lg:contents`. Both hero photos go through `components/ui/MediaImage.tsx` (`getImageProps` inside `<picture>` with a 1×1 blank `<source>` for the other breakpoint), so each device downloads only its own photo — eager + `fetchPriority="high"`. Lazy loading alone did not prevent the hidden one from downloading.
- Hero proof block (desktop, under the CTAs): "Haircuts from ₹99 · Walk-ins welcome" (price from `popular.ts`), then Google rating (`GOOGLE_RATING`, links to Google) · live `OpenStatus`. It replaced the old "2020" block and "Explore Services" link (2020 now lives in the trust strip).
- Hero (≥1024): the photo frame starts `nav-h + 16px` down (the nav never touches the barber's head), is sized by `--hero-zoom` / `--art-free` in `globals.css`, crops only the cape at the bottom, and keeps the right-hand collage in frame.

## Components
- **Buttons** (`components/ui/button.tsx` → `btn(variant,size)`): pills; `ink` / `ivory` / `outline` / `outline-light`; heights 44/48/54. Trailing `Arrow` nudges 2px on hover.
- **Service card:** 4:5, radius 18, photo `object-cover` with per-item `focus`, white bottom veil, two-line title, 36px circular arrow that fills ink on hover.
- **Offer card:** identical anatomy for all nine — 4:3 photo (per-offer `objectPosition` + optional `scale/origin` to crop out baked-in wall signage; inside the pinned track its height comes from `--offer-img-h`, measured so the tallest card always fits, floor 150px), number chip, factual "Save ₹X" chip, name, red price + struck regular price, divider, champagne-check inclusions (flex-1 so CTAs align), black Book Now pill + green Call pill (`tel:+918970000135`). Single elevation: `--shadow-card`, no border.
- **Offer photo zoom-out:** `focus.zoomOut` (Classic, Men Pedi & Mani) shows more of the subject than the frame can hold: the sharp photo at the needed zoom with soft side edges (`.offer-zoom` mask) over a blurred copy of itself. Frame size is identical to every other card.
- **Popular card** (`sections/PopularServices.tsx`, data `src/data/popular.ts`): white, radius 18, `--shadow-card`; 16:10 photo; 48px ink icon disc (Scissors / drawn beard / ShowerHead) beside the title + description; bottom row of struck regular price + red offer price (or "Starts at ₹199") and an ink Book Now that preselects `popular:<id>` in the booking form.
- **Cut card** (`sections/CutsGallery.tsx`, data `src/data/cuts.ts`): white, `border-line`, radius 18; 4:5 photo (portrait sources, so hairstyle and face stay in frame; per-image `focus`), white label bar with number + label.
- **Review card:** `src/data/reviews.ts` only — 10 verbatim Google reviews supplied by the owner. Compact (320px): avatar (supplied Google photo or initials — never a stand-in face) + name + date, stars, text clamped to 4 lines (never completed), "Google review". The section is compact: heading + dated rating summary + "Read all reviews on Google", then the marquee (9 cols) beside a portrait salon photo (3 cols, ≥1024).
- **FAQ + Find us** (`sections/FaqLocation.tsx`): one two-column screen. Left: `FaqList` from `src/data/faq.ts` (hairline accordion, 16px questions, `grid-template-rows` + opacity transition, closed answers `inert`). Right (sticky ≥1024): "Find us" card — keyless Google Maps embed (`SITE.mapsEmbedUrl`, 220–240px), name, address, landmark, "Open 7 days" (only while `OPEN_ALL_WEEK`), live status, hours, green Call + WhatsApp, ink Get Directions.
- **Booking dialog:** native `<dialog>`, bottom sheet under 640px; composes a WhatsApp message. Nothing stored.
- **Menu sheet:** full-screen ivory `<dialog>`, Bodoni links, active item italic champagne.
- **Sticky CTA:** phones (<640px): compact Call (green) · WhatsApp (green outline) · Directions bar; larger: floating Call Now + Book Now. ≥1024px: after the hero, hidden over offers, Find us, final CTA and footer. <1024px: only from the hero through Popular Services (hidden once Complete Grooming reaches the viewport) and never while the hero's own `#hero-cta` bar is on screen.

## Motion
- Hero: CSS-only entrance (masked line rise for H1, staggered rise, 1.045→1 photo settle) so it runs before hydration.
- Services: clip-wipe reveal with stagger. Experience photo: inset wipe (never fully clipped — IntersectionObserver ignores zero-area clipped elements).
- Offers (all sizes): pinned track — native vertical scroll → horizontal translate (`useScroll` + light spring), position-keyed scale/opacity, photo parallax, once-only card sequence (image → name → price clip → list → CTA). ≥1024 × ≥760: intro beside the track. Otherwise: intro above, track + counter pinned below — no swipe, no horizontally scrollable container. Reduced motion: static grid; all CSS motion disabled globally.
- Popular services + Cuts (`components/motion/ScrollRail.tsx`): ≥768px a plain grid (3 / 3→6 columns, all items visible) with the services clip-wipe stagger. Phones: one card per screen in a pinned frame centred between the nav and the action bar; native vertical scroll drives the row sideways with the offers math (progress → x through the same spring), position-keyed scale/opacity, "01 / 06" counter. Phone layout is CSS (`max-md:`) so it paints right before hydration. `OffersSection` is separate and untouched.
- Reviews: slow continuous left-to-right marquee (`useAnimationFrame`, 22px/s, duplicated row with an `inert` copy). Pauses on mouse hover, focus, off-screen, hidden tab, and via a Pause/Play button. No 3D, rotation or scaling. Reduced motion: three static cards.
- Reduced motion: components read the preference with `useMediaQuery("(prefers-reduced-motion: reduce)")` (hydration-safe), never `useReducedMotion` in a render path; `MotionPrefs` (`MotionConfig reducedMotion="user"`) makes transform animations instant.

## Data
`src/data/offers.ts`, `src/data/services.ts`, `src/data/popular.ts`, `src/data/cuts.ts`, `src/data/reviews.ts`, `src/data/faq.ts`, `src/lib/site.ts` hold every fact, price, route and hour. Future pages should read from these. Google rating: 4.7 · 990 as of Sep 2026 (owner-confirmed) — update `GOOGLE_RATING` value, count and asOf together.
