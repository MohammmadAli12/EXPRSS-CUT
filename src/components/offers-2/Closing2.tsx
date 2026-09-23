import Image from "next/image";
import Link from "next/link";
import { Armchair, Clock, MapPin, MessageCircle, Navigation, Phone, Scissors, Zap } from "lucide-react";
import { SERVICE_NAV, SITE, TEL } from "@/lib/site";
import { CTA_IMAGE_2, waGeneral2 } from "@/data/offers-2";
import { CallBtn2, WaBtn2, Wordmark2 } from "./ui2";

/* lucide v1 has no brand marks, so the three social glyphs are inline paths */
function Instagram({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className={className} aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
function Facebook({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className={className} aria-hidden>
      <path d="M14.5 8.5H17V5.5h-2.5A3.5 3.5 0 0 0 11 9v2H9v3h2v6h3v-6h2.2l.4-3H14V9.3c0-.5.2-.8.5-.8z" />
    </svg>
  );
}
function Youtube({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className={className} aria-hidden>
      <rect x="2.5" y="6" width="19" height="12" rx="4" />
      <path d="M10.5 9.5v5l4.5-2.5z" />
    </svg>
  );
}

const WHY = [
  { icon: Scissors, title: "Every modern style", note: "From classic cuts to latest trends." },
  { icon: Zap, title: "Fast walk-ins", note: "Quality service, minimal waiting time." },
  { icon: Armchair, title: "Clean and comfortable", note: "Hygienic, premium and relaxing ambience." },
];

/** The site's navigation, as this page's footer lists it */
const FOOT_NAV = [
  { label: "Home", href: "/" },
  ...SERVICE_NAV,
  { label: "Offers", href: "/offers" },
  { label: "Our Story", href: "/our-story" },
];

/** Why us · Visit us · the dark CTA band · the SEO block · this page's footer. */
export function Closing2() {
  return (
    <>
      <section aria-labelledby="o2-why-title" className="bg-[#efe7da] py-12 lg:py-14">
        <div className="mx-auto w-full max-w-[1240px] px-5 sm:px-6">
          <h2
            id="o2-why-title"
            className="text-center font-[family-name:var(--font-o2-serif)] text-[clamp(22px,2.4vw,30px)] font-semibold text-[#1a1612]"
          >
            Why men in KR Puram choose Express Cuts
          </h2>
          <ul className="mt-9 grid gap-8 sm:grid-cols-3 sm:gap-0">
            {WHY.map(({ icon: Icon, title, note }, i) => (
              <li
                key={title}
                className={i > 0 ? "sm:border-l sm:border-[#1a1612]/12 sm:pl-8" : "sm:pr-8"}
              >
                <div className="flex items-start gap-4">
                  <Icon aria-hidden className="size-8 shrink-0 text-[#b0834f]" strokeWidth={1.4} />
                  <div>
                    <h3 className="text-[15.5px] font-semibold text-[#1a1612]">{title}</h3>
                    <p className="mt-1.5 text-[13.5px] leading-snug text-[#6b625a]">{note}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="visit" aria-labelledby="o2-visit-title" className="bg-[#f6f1e9] py-12 lg:py-14">
        <div className="mx-auto grid w-full max-w-[1240px] gap-8 px-5 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.1fr)] lg:items-center lg:gap-10">
          <div>
            <h2
              id="o2-visit-title"
              className="font-[family-name:var(--font-o2-serif)] text-[clamp(22px,2.4vw,30px)] font-semibold text-[#1a1612]"
            >
              Visit us in KR Puram
            </h2>
            <ul className="mt-5 space-y-3.5 text-[14.5px] text-[#4a423b]">
              <li className="flex items-center gap-3">
                <Clock aria-hidden className="size-5 shrink-0 text-[#b0834f]" strokeWidth={1.6} />
                <span className="tabular">All days 8:00 AM – 10:00 PM</span>
              </li>
              <li className="flex items-center gap-3">
                <Navigation aria-hidden className="size-5 shrink-0 text-[#b0834f]" strokeWidth={1.6} />
                Walk-ins until 9:30 PM
              </li>
            </ul>
          </div>

          <div>
            <address className="flex gap-3 text-[14.5px] not-italic leading-relaxed text-[#4a423b]">
              <MapPin aria-hidden className="mt-0.5 size-5 shrink-0 text-[#d91f1f]" strokeWidth={1.8} />
              <span>
                25/2, Ayyappa Nagar Main Rd,
                <br />
                Krishnarajapuram, Bengaluru 560037
              </span>
            </address>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={SITE.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-full bg-[linear-gradient(180deg,#a57a4d,#7a5230)] px-5 text-[12.5px] font-semibold uppercase tracking-[0.06em] text-white transition-[filter] hover:brightness-[1.07]"
              >
                <Navigation aria-hidden className="size-4" strokeWidth={2} />
                Get directions
              </a>
              <a
                href={TEL}
                aria-label={`Call ${SITE.phoneDisplay}`}
                className="inline-flex h-11 items-center gap-2 rounded-full border border-[#1a1612]/20 px-5 text-[12.5px] font-semibold uppercase tracking-[0.06em] text-[#1a1612] transition-colors hover:border-[#1a1612]"
              >
                <Phone aria-hidden className="size-4" strokeWidth={2} />
                Call Now
              </a>
            </div>
          </div>

          <div className="overflow-hidden rounded-[10px] border border-[#1a1612]/10 bg-[#efe7da]">
            <iframe
              title="Google Map showing Express Cuts Men's Salon, Ayyappa Nagar, KR Puram"
              src={SITE.mapsEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block h-[210px] w-full border-0 sm:h-[240px]"
            />
          </div>
        </div>
      </section>

      <section aria-labelledby="o2-cta-title" className="relative isolate overflow-hidden bg-[#1a1612]">
        <Image
          src={CTA_IMAGE_2}
          alt=""
          aria-hidden
          fill
          loading="lazy"
          sizes="100vw"
          className="-z-10 object-cover object-[64%_28%]"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(26_22_18/0.95)_0%,rgb(26_22_18/0.82)_45%,rgb(26_22_18/0.55)_100%)]"
        />
        <div className="mx-auto flex w-full max-w-[1240px] flex-col gap-6 px-5 py-10 sm:px-6 lg:flex-row lg:items-center lg:gap-12 lg:py-12">
          <div className="lg:flex-1">
            <h2
              id="o2-cta-title"
              className="font-[family-name:var(--font-o2-serif)] text-[clamp(26px,3vw,36px)] font-semibold text-[#f3ece1]"
            >
              Ready for a new you?
            </h2>
            <p className="mt-2 text-[14.5px] text-[#bfb4a5]">Great style. Greater confidence.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <CallBtn2 />
            <WaBtn2 href={waGeneral2("Hi, I'd like to book a slot at Express Cuts.")} />
          </div>
          <p
            aria-hidden
            className="hidden shrink-0 text-right font-[family-name:var(--font-o2-script)] text-[34px] leading-[1.1] text-[#f3ece1]/90 xl:block"
          >
            A New You
            <br />
            Everyday
          </p>
        </div>
      </section>

      {/* Local-SEO copy: the services and areas this page should be found for */}
      <section aria-labelledby="o2-seo-title" className="bg-[#f6f1e9] py-11">
        <div className="mx-auto w-full max-w-[860px] px-5 sm:px-6">
          <h2
            id="o2-seo-title"
            className="font-[family-name:var(--font-o2-serif)] text-[19px] font-semibold text-[#1a1612]"
          >
            A men&rsquo;s salon in KR Puram, built around grooming offers
          </h2>
          <p className="mt-3 text-[14px] leading-relaxed text-[#4a423b]">
            Express Cuts Men&rsquo;s Salon sits on Ayyappa Nagar Main Rd in Krishnarajapuram, a short ride from Hoodi
            and the rest of KR Puram. A men&rsquo;s haircut starts at ₹99 and a beard trim at ₹70, so a sharp cut or a
            clean line-up never needs planning — walk in any day between 8 AM and 10 PM.
          </p>
          <p className="mt-3 text-[14px] leading-relaxed text-[#4a423b]">
            Beyond the barber shop basics, our grooming combo offers bring haircut, beard trim, head massage, men&rsquo;s
            facial and hair color together from ₹249. The Hydra Facial for men is ₹1,999, and The King&rsquo;s Ritual
            adds hair spa, pedicure and manicure in one sitting — grooming for men in Bengaluru, priced in plain sight.
          </p>
        </div>
      </section>

      <footer className="border-t border-[#1a1612]/10 bg-[#f6f1e9]">
        <div className="mx-auto w-full max-w-[1240px] px-5 sm:px-6">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-5 py-7">
            <Link href="/" aria-label="Express Cuts Men's Salon — home">
              <Wordmark2 />
            </Link>
            <nav aria-label="Offer page 2 footer" className="flex flex-wrap gap-x-5 gap-y-2 text-[13px] text-[#4a423b]">
              {FOOT_NAV.map((item) => (
                <Link key={item.label} href={item.href} className="transition-colors hover:text-[#1a1612]">
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="ml-auto flex items-center gap-4">
              <span aria-hidden className="flex items-center gap-3 text-[#b0834f]">
                <Instagram className="size-[18px]" />
                <Facebook className="size-[18px]" />
                <Youtube className="size-[18px]" />
                <MessageCircle className="size-[18px]" strokeWidth={1.6} />
              </span>
              <a href={TEL} className="flex items-center gap-2 text-[14px] font-semibold text-[#1a1612]">
                <Phone aria-hidden className="size-4 text-[#b0834f]" strokeWidth={1.9} />
                <span className="tabular">{SITE.phoneDisplay}</span>
              </a>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#1a1612]/10 py-4">
            <small className="text-[12px] text-[#6b625a]">© 2026 Express Cuts Men&rsquo;s Salon. All rights reserved.</small>
            <span aria-hidden className="font-[family-name:var(--font-o2-script)] text-[22px] text-[#7a6a58]">
              A New You Everyday
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
