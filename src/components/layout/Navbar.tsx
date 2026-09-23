"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMotionValueEvent, useScroll } from "motion/react";
import { ChevronDown, Menu, Phone } from "lucide-react";
import { NAV, TEL, inServices, isGroup, waLink, type NavItem } from "@/lib/site";
import { cn } from "@/lib/cn";
import { Wordmark } from "@/components/ui/Wordmark";
import { CallBtn2, WaBtn2 } from "@/components/offer-card/actions";
import { MenuSheet } from "./MenuSheet";

const link =
  "relative inline-flex items-center gap-1 py-2 text-[13px] font-medium tracking-[0.005em] transition-colors duration-300";

/** The champagne rule under the current page */
function Underline({ on }: { on: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        "absolute inset-x-0 bottom-0.5 h-px origin-left bg-champagne transition-transform duration-500 ease-editorial",
        on ? "scale-x-100" : "scale-x-0",
      )}
    />
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 16));

  return (
    <header
      /* Its own surface on every page: the navigation never blends into a hero
         photograph or the type underneath it. Scrolling only deepens the edge. */
      className={cn(
        "fixed inset-x-0 top-0 z-50 bg-ivory transition-shadow duration-500 ease-editorial",
        scrolled
          ? "shadow-[0_1px_0_var(--color-line),0_10px_24px_-20px_rgb(18_17_16/0.5)]"
          : "shadow-[0_1px_0_var(--color-line)]",
      )}
    >
      <nav aria-label="Primary" className="shell flex h-[var(--nav-h)] items-center gap-6">
        <Link href="/" aria-label="Express Cuts Men's Salon — home" className="shrink-0">
          <Wordmark />
        </Link>

        <ul className="mx-auto hidden items-center gap-7 whitespace-nowrap lg:flex">
          {NAV.map((item) =>
            isGroup(item) ? (
              <li key={item.label}>
                <ServicesMenu label={item.label} items={item.children} pathname={pathname} />
              </li>
            ) : (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={item.href === pathname ? "page" : undefined}
                  className={cn(link, item.href === pathname ? "text-ink" : "text-ink-soft hover:text-ink")}
                >
                  {item.label}
                  <Underline on={item.href === pathname} />
                </Link>
              </li>
            ),
          )}
        </ul>

        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <div className="hidden items-center gap-2 sm:flex">
            <CallBtn2 size="sm" label="Call Now" />
            <WaBtn2 size="sm" href={waLink("Hi, I'd like to book a slot at Express Cuts.")} />
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

/**
 * Services: a button, not a link — there is no services page, it opens the list.
 * Pointer users get it on hover, everyone gets it on click; Escape and a click
 * outside close it and return focus to the button.
 */
function ServicesMenu({ label, items, pathname }: { label: string; items: NavItem[]; pathname: string }) {
  const id = useId();
  const [open, setOpen] = useState(false);
  /* A click pins the menu open, so it survives the pointer leaving it */
  const [pinned, setPinned] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const active = inServices(pathname);

  useEffect(() => {
    if (!open) return;
    const close = () => {
      setOpen(false);
      setPinned(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      close();
      buttonRef.current?.focus();
    };
    const onPointer = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) close();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  /* Close once focus has left the menu entirely (tabbing past the last link) */
  const onBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (e.currentTarget.contains(e.relatedTarget as Node | null)) return;
    setOpen(false);
    setPinned(false);
  };

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => !pinned && setOpen(false)}
      onBlur={onBlur}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => {
          setOpen(!pinned);
          setPinned(!pinned);
        }}
        className={cn(link, active || open ? "text-ink" : "text-ink-soft hover:text-ink")}
      >
        {label}
        <ChevronDown
          aria-hidden
          className={cn("size-3.5 transition-transform duration-300 ease-editorial", open && "rotate-180")}
          strokeWidth={1.8}
        />
        <Underline on={active} />
      </button>

      <ul
        id={id}
        aria-label={label}
        className={cn(
          "absolute left-1/2 top-full z-10 w-[190px] -translate-x-1/2 rounded-[14px] border border-line bg-ivory/98 p-2 shadow-float backdrop-blur-sm transition-[opacity,transform] duration-300 ease-editorial",
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0",
        )}
      >
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              tabIndex={open ? undefined : -1}
              aria-current={item.href === pathname ? "page" : undefined}
              onClick={() => {
                setOpen(false);
                setPinned(false);
              }}
              className={cn(
                "block rounded-[9px] px-3 py-2 text-[13.5px] transition-colors duration-200",
                item.href === pathname ? "bg-cream text-ink" : "text-ink-soft hover:bg-cream hover:text-ink",
              )}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
