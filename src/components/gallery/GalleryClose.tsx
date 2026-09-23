import Image from "next/image";
import Link from "next/link";
import { MapPin, Navigation, Phone } from "lucide-react";
import { POPULAR_SERVICES } from "@/data/popular";
import { GALLERY_PHOTOS } from "@/data/gallery";
import { SITE, TEL, waLink } from "@/lib/site";
import { Eyebrow, btn } from "@/components/ui/button";
import { Reveal } from "@/components/motion/Reveal";
import { CallBtn2, WaBtn2 } from "@/components/offer-card/actions";

const HAIRCUT = POPULAR_SERVICES[0];
/* The salon floor, reused from the gallery set: a wide picture reads in a wide band */
const OFFER_PHOTO = GALLERY_PHOTOS.find((p) => p.src.includes("product-wall"))!;

/** The one offer on this page: the ₹99 haircut, priced from the services data. */
export function GalleryOffer() {
  return (
    <section aria-labelledby="gallery-offer-title" className="relative isolate overflow-hidden bg-cream">
      {/* The angled photograph from the design, behind the copy on small screens */}
      <div
        aria-hidden
        className="absolute inset-y-0 right-0 hidden w-[58%] [clip-path:polygon(18%_0,100%_0,100%_100%,0_100%)] lg:block"
      >
        <Image
          src={OFFER_PHOTO.src}
          alt=""
          fill
          sizes="58vw"
          className="object-cover object-[46%_58%] opacity-95"
        />
        <span className="absolute inset-0 bg-gradient-to-r from-cream via-cream/5 to-cream/70" />
      </div>

      <div className="shell relative flex flex-wrap items-center justify-between gap-x-10 gap-y-7 py-14 lg:py-20">
        <Reveal>
          <Eyebrow>Express Cuts offer</Eyebrow>
          <h2
            id="gallery-offer-title"
            className="mt-3.5 font-display text-[clamp(2rem,3.6vw,3rem)] font-semibold leading-[1.04] tracking-[-0.018em]"
          >
            Men&rsquo;s Haircut from{" "}
            <span className="tabular text-price">₹{HAIRCUT.price.offer}</span>{" "}
            <s className="tabular text-[0.62em] font-medium text-ink-muted decoration-ink-muted decoration-1">
              ₹{HAIRCUT.price.actual}
            </s>
          </h2>
          <p className="mt-3 text-[14.5px] text-ink-soft">Walk-ins Welcome · KR Puram</p>
        </Reveal>

        <Reveal delay={0.08} className="flex flex-wrap items-center gap-2.5">
          <CallBtn2 label="Call" context="about the ₹99 haircut" />
          <WaBtn2 href={waLink(`Hi, I'd like a men's haircut (₹${HAIRCUT.price.offer}) at Express Cuts.`)} />
        </Reveal>
      </div>
    </section>
  );
}

/** Where the salon is, with the real map and the three ways to reach it. */
export function GalleryVisit() {
  return (
    <section id="find-us" aria-labelledby="gallery-visit-title" className="bg-ivory py-14 lg:py-16">
      <div className="shell grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-center lg:gap-14">
        <Reveal>
          <Eyebrow>Visit Express Cuts</Eyebrow>
          <h2
            id="gallery-visit-title"
            className="mt-4 font-display text-[clamp(2rem,3.4vw,2.9rem)] font-semibold leading-[1.06] tracking-[-0.018em]"
          >
            Men&rsquo;s Salon in
            <br />
            Ayyappa Nagar, KR Puram
          </h2>

          <address className="mt-6 flex gap-3 text-[15px] not-italic leading-relaxed text-ink-soft">
            <MapPin aria-hidden className="mt-0.5 size-[18px] shrink-0 text-champagne" strokeWidth={1.7} />
            <span>
              {SITE.addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </span>
          </address>

          <p className="mt-4 flex items-center gap-3 text-[15px]">
            <Phone aria-hidden className="size-[18px] shrink-0 text-champagne" strokeWidth={1.7} />
            <a href={TEL} className="tabular font-semibold text-ink underline-offset-4 hover:underline">
              {SITE.phoneDisplay}
            </a>
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-2.5">
            <CallBtn2 label="Call" context="about visiting the salon" />
            <WaBtn2 href={waLink("Hi, I'd like to visit Express Cuts in KR Puram.")} />
            <a
              href={SITE.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={btn("outline", "md", "uppercase tracking-[0.08em]")}
            >
              <Navigation aria-hidden className="size-4" strokeWidth={1.8} /> Get Directions
            </a>
          </div>
        </Reveal>

        <Reveal variant="clip">
          <div className="overflow-hidden rounded-[18px] border border-line">
            <iframe
              title="Google Map showing Express Cuts Men's Salon, Ayyappa Nagar Main Rd, KR Puram"
              src={SITE.mapsEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block h-[300px] w-full border-0 bg-cream sm:h-[380px]"
            />
          </div>
        </Reveal>
      </div>

      {/* Where else to look on the site */}
      <nav aria-label="More about Express Cuts" className="shell mt-12 border-t border-line pt-6">
        <ul className="flex flex-wrap gap-x-6 gap-y-2.5 text-[14px] text-ink-soft">
          {[
            { href: "/hair", label: "Men's Haircuts & Styling" },
            { href: "/beard", label: "Men's Beard Grooming" },
            { href: "/facial", label: "Men's Facial" },
            { href: "/hair-spa", label: "Men's Hair Spa" },
            { href: "/hair-color", label: "Men's Hair Color" },
            { href: "/offers", label: "Men's Grooming Offers" },
            { href: "/our-story", label: "Our Story" },
          ].map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="underline-offset-4 transition-colors hover:text-ink hover:underline">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
