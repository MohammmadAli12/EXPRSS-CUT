"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Phone, X } from "lucide-react";
import { NAV, SITE, TEL } from "@/lib/site";
import { cn } from "@/lib/cn";
import { Wordmark } from "@/components/ui/Wordmark";
import { HoursList } from "@/components/ui/HoursList";
import { Arrow, Eyebrow, btn } from "@/components/ui/button";
import { BookTrigger } from "@/components/booking/BookTrigger";

type Props = { open: boolean; onClose: () => void; pathname: string };

export function MenuSheet({ open, onClose, pathname }: Props) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      document.documentElement.classList.add("modal-open");
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  return (
    <dialog
      ref={ref}
      id="site-menu"
      aria-label="Site menu"
      className="menu-dialog"
      onClose={() => {
        document.documentElement.classList.remove("modal-open");
        onClose();
      }}
    >
      <div className="flex min-h-full flex-col">
        <div className="shell flex h-[var(--nav-h)] shrink-0 items-center justify-between">
          <Link href="/" onClick={onClose} aria-label="Express Cuts Men's Salon — home">
            <Wordmark />
          </Link>
          <button
            type="button"
            autoFocus
            onClick={onClose}
            aria-label="Close menu"
            className="grid size-11 place-items-center rounded-full border border-ink/15 transition-colors hover:border-ink"
          >
            <X aria-hidden className="size-[18px]" strokeWidth={1.6} />
          </button>
        </div>

        <div className="shell grid flex-1 gap-14 pb-12 pt-6 lg:grid-cols-12 lg:gap-10 lg:pt-12">
          <nav aria-label="Menu" className="lg:col-span-7">
            <ul className="grid gap-x-12 sm:grid-cols-2">
              {NAV.map((item, i) => {
                const active = item.href === pathname;
                return (
                  <li
                    key={item.href}
                    className="menu-item border-b border-line"
                    style={{ "--i": i } as React.CSSProperties}
                  >
                    <Link
                      href={item.href}
                      onClick={onClose}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex items-baseline justify-between py-3.5 font-display text-[28px] leading-tight transition-colors sm:text-[32px]",
                        active ? "italic text-champagne" : "text-ink hover:text-champagne",
                      )}
                    >
                      {item.label}
                      <span className="tabular font-sans text-[12px] not-italic text-ink-muted">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div
            className="menu-item flex flex-col gap-10 text-[14px] lg:col-span-4 lg:col-start-9"
            style={{ "--i": NAV.length } as React.CSSProperties}
          >
            <div className="flex flex-wrap gap-2">
              <BookTrigger onBeforeOpen={onClose} className={btn("ink", "md")}>
                Book Appointment <Arrow />
              </BookTrigger>
              <a href={TEL} className={btn("outline", "md")}>
                <Phone aria-hidden className="size-4" strokeWidth={1.6} /> Call Now
              </a>
            </div>
            <div>
              <Eyebrow>Visit</Eyebrow>
              <address className="mt-4 not-italic leading-relaxed text-ink-soft">
                {SITE.addressLines.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </address>
              <a
                href={SITE.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn mt-3 inline-flex items-center gap-1.5 font-medium underline-offset-4 hover:underline"
              >
                Get directions <Arrow external className="size-3.5" />
              </a>
            </div>
            <div>
              <Eyebrow>Hours</Eyebrow>
              <HoursList className="mt-4" />
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
}
