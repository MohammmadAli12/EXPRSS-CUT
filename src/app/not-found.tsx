import type { Metadata } from "next";
import Link from "next/link";
import { Phone } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BookTrigger } from "@/components/booking/BookTrigger";
import { Arrow, Eyebrow, btn } from "@/components/ui/button";
import { SITE, TEL } from "@/lib/site";

export const metadata: Metadata = { title: "Coming soon" };

/** Future routes in the navigation land here until their pages are built. */
export default function NotFound() {
  return (
    <>
      <Navbar />
      <main id="main" className="bg-ivory">
        <section className="shell flex min-h-[82svh] flex-col justify-center pb-24 pt-36">
          <Eyebrow>Coming soon</Eyebrow>
          <h1 className="mt-6 font-display text-[clamp(2.8rem,6vw,5rem)] font-medium leading-[1] tracking-[-0.02em]">
            This page is
            <br />
            <em className="text-champagne">on its way.</em>
          </h1>
          <p className="mt-7 max-w-[46ch] text-[16px] leading-relaxed text-ink-soft">
            We&rsquo;re still preparing this part of the site. Services, grooming packages and
            booking are all on the homepage in the meantime.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/" className={btn("ink", "md")}>
              Back to home <Arrow />
            </Link>
            <BookTrigger className={btn("outline", "md")}>Book Now</BookTrigger>
            <a href={TEL} className={btn("outline", "md")}>
              <Phone aria-hidden className="size-4" strokeWidth={1.6} /> {SITE.phoneDisplay}
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
