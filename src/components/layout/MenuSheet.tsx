"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, X } from "lucide-react";
import { NAV, SITE, inServices, isGroup, waLink } from "@/lib/site";
import { cn } from "@/lib/cn";
import { Wordmark } from "@/components/ui/Wordmark";
import { HoursList } from "@/components/ui/HoursList";
import { Arrow, Eyebrow } from "@/components/ui/button";
import { CallBtn2, WaBtn2 } from "@/components/offer-card/actions";

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
            <ul className="grid gap-x-12">
              {NAV.map((item, i) => (
                <li
                  key={isGroup(item) ? item.label : item.href}
                  className="menu-item border-b border-line"
                  style={{ "--i": i } as React.CSSProperties}
                >
                  {isGroup(item) ? (
                    <ServicesGroup item={item} index={i} pathname={pathname} onClose={onClose} />
                  ) : (
                    <Link
                      href={item.href}
                      onClick={onClose}
                      aria-current={item.href === pathname ? "page" : undefined}
                      className={cn(
                        "flex items-baseline justify-between py-3.5 font-display text-[28px] leading-tight transition-colors sm:text-[32px]",
                        item.href === pathname ? "italic text-champagne" : "text-ink hover:text-champagne",
                      )}
                    >
                      {item.label}
                      <span className="tabular font-sans text-[12px] not-italic text-ink-muted">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div
            className="menu-item flex flex-col gap-10 text-[14px] lg:col-span-4 lg:col-start-9"
            style={{ "--i": NAV.length } as React.CSSProperties}
          >
            <div className="flex flex-wrap gap-2">
              <CallBtn2 />
              <WaBtn2 href={waLink("Hi, I'd like to book a slot at Express Cuts.")} />
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

/** Services opens in place, so the sheet keeps its four-line rhythm */
function ServicesGroup({
  item,
  index,
  pathname,
  onClose,
}: {
  item: { label: string; children: { label: string; href: string }[] };
  index: number;
  pathname: string;
  onClose: () => void;
}) {
  const active = inServices(pathname);
  const [open, setOpen] = useState(active);

  return (
    <>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex w-full items-baseline justify-between py-3.5 font-display text-[28px] leading-tight transition-colors sm:text-[32px]",
          active ? "italic text-champagne" : "text-ink hover:text-champagne",
        )}
      >
        <span className="inline-flex items-center gap-3">
          {item.label}
          <ChevronDown
            aria-hidden
            className={cn("size-5 transition-transform duration-300 ease-editorial", open && "rotate-180")}
            strokeWidth={1.6}
          />
        </span>
        <span className="tabular font-sans text-[12px] not-italic text-ink-muted">
          {String(index + 1).padStart(2, "0")}
        </span>
      </button>

      <ul className={cn("overflow-hidden pl-1 transition-all duration-400 ease-editorial", open ? "max-h-72 pb-4" : "max-h-0")}>
        {item.children.map((child) => (
          <li key={child.href}>
            <Link
              href={child.href}
              onClick={onClose}
              tabIndex={open ? undefined : -1}
              aria-current={child.href === pathname ? "page" : undefined}
              className={cn(
                "block py-1.5 text-[16px] transition-colors",
                child.href === pathname ? "text-champagne" : "text-ink-soft hover:text-ink",
              )}
            >
              {child.label}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
