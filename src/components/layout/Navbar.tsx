"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMotionValueEvent, useScroll } from "motion/react";
import { Menu, Phone } from "lucide-react";
import { NAV, TEL } from "@/lib/site";
import { cn } from "@/lib/cn";
import { Wordmark } from "@/components/ui/Wordmark";
import { Arrow, btn } from "@/components/ui/button";
import { BookTrigger } from "@/components/booking/BookTrigger";
import { MenuSheet } from "./MenuSheet";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 16));

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-500 ease-editorial",
        scrolled ? "bg-ivory/95 shadow-[0_1px_0_var(--color-line)]" : "bg-transparent",
      )}
    >
      <nav aria-label="Primary" className="shell flex h-[var(--nav-h)] items-center gap-6">
        <Link href="/" aria-label="Express Cuts Men's Salon — home" className="shrink-0">
          <Wordmark />
        </Link>

        <ul className="mx-auto hidden items-center gap-[1.05rem] whitespace-nowrap xl:flex 2xl:gap-[1.35rem]">
          {NAV.map((item) => {
            const active = item.href === pathname;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative inline-block py-2 text-[13px] font-medium tracking-[0.005em] transition-colors duration-300",
                    active ? "text-ink" : "text-ink-soft hover:text-ink",
                  )}
                >
                  {item.label}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute inset-x-0 bottom-0.5 h-px origin-left bg-champagne transition-transform duration-500 ease-editorial",
                      active ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="ml-auto flex items-center gap-2 xl:ml-0">
          <div className="hidden sm:block">
            <BookTrigger className={btn("ink", "sm")}>
              Book Appointment <Arrow className="size-3.5" />
            </BookTrigger>
          </div>
          <a
            href={TEL}
            aria-label="Call Express Cuts"
            className="grid size-11 place-items-center rounded-full border border-ink/15 transition-colors hover:border-ink sm:hidden"
          >
            <Phone aria-hidden className="size-4" strokeWidth={1.6} />
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
            aria-controls="site-menu"
            className="grid size-11 place-items-center rounded-full border border-ink/15 transition-colors hover:border-ink"
          >
            <Menu aria-hidden className="size-[18px]" strokeWidth={1.6} />
            <span className="sr-only">Open menu</span>
          </button>
        </div>
      </nav>

      <MenuSheet open={menuOpen} onClose={() => setMenuOpen(false)} pathname={pathname} />
    </header>
  );
}
