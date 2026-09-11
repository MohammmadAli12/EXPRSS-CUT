import Link from "next/link";
import { CONTACT_NAV, NAV, SITE, TEL, waLink } from "@/lib/site";
import { Wordmark } from "@/components/ui/Wordmark";
import { HoursList } from "@/components/ui/HoursList";
import { Arrow } from "@/components/ui/button";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="on-dark bg-night text-ivory">
      <div className="shell py-16 lg:py-20">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          <Link href="/" aria-label="Express Cuts Men's Salon — home" className="self-start">
            <Wordmark tone="light" />
          </Link>
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-6 gap-y-3 text-[14px] text-ivory-soft">
              {[...NAV, CONTACT_NAV].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition-colors hover:text-ivory">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-14 grid gap-12 border-t border-ivory/10 pt-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <h2 className="eyebrow text-ivory-muted">Visit</h2>
            <address className="mt-5 text-[14.5px] not-italic leading-relaxed text-ivory-soft">
              {SITE.addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
            <a
              href={SITE.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn mt-4 inline-flex items-center gap-1.5 text-[13.5px] font-medium text-ivory underline-offset-4 hover:underline"
            >
              Open in Google Maps <Arrow external className="size-3.5" />
            </a>
          </div>

          <div className="lg:col-span-3">
            <h2 className="eyebrow text-ivory-muted">Contact</h2>
            <ul className="mt-5 space-y-3 text-[14.5px]">
              <li>
                <a href={TEL} className="text-ivory-soft transition-colors hover:text-ivory">
                  {SITE.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={waLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn inline-flex items-center gap-1.5 text-ivory-soft transition-colors hover:text-ivory"
                >
                  WhatsApp chat <Arrow external className="size-3.5" />
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h2 className="eyebrow text-ivory-muted">Hours</h2>
            <HoursList tone="light" className="mt-5 [&_dd]:text-left sm:[&>div]:flex-col sm:[&>div]:gap-1 lg:[&>div]:flex-col" />
          </div>

          <div className="flex flex-col justify-between gap-6 lg:col-span-2 lg:items-end lg:text-right">
            <p aria-hidden className="font-script text-[46px] leading-none text-champagne-soft">
              Stay sharp
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-ivory/10 pt-6 text-[12.5px] text-ivory-muted sm:flex-row sm:justify-between">
          <p>© {year} Express Cuts Men&rsquo;s Salon. All rights reserved.</p>
          <p>Est. 2020 · KR Puram, Bengaluru</p>
        </div>
      </div>
    </footer>
  );
}
