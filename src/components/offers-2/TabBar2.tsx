"use client";

import { useEffect, useRef, useState } from "react";
import { Crown, Gift, Scissors, Sparkles, Sun } from "lucide-react";
import { SECTIONS_2 } from "@/data/offers-2";
import { cn } from "@/lib/cn";

const ICONS = [Scissors, Gift, Sparkles, Sun, Crown];
const LABELS = ["Hair & Beard", "Combos", "Facial & Color", "Summer Specials", "King's Ritual"];

/** Height of this bar; the bands leave room for it under the header */
export const TAB_H = 58;

/**
 * Dark category bar that sticks under this page's header. The active tab follows
 * the page; clicking one jumps to that band, pinned sections included. It is the
 * only element on the page that scrolls sideways, and only on phones.
 */
export function TabBar2() {
  const [active, setActive] = useState(SECTIONS_2[0].id);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    /* Looked up on every pass: a pinned band re-mounts when the layout swaps, and
       a cached node would go stale (detached nodes report top 0 and win every time) */
    const pick = () => {
      const line = window.innerHeight * 0.4;
      let current = SECTIONS_2[0].id;
      for (const s of SECTIONS_2) {
        const el = document.getElementById(s.id);
        if (el && el.isConnected && el.getBoundingClientRect().top <= line) current = s.id;
      }
      setActive(current);
    };

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        pick();
      });
    };
    pick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  /* Keep the live tab in sight by scrolling the strip itself — `scrollIntoView`
     would also move the page, which jumps the reader mid-scroll. */
  useEffect(() => {
    const strip = navRef.current;
    const tab = strip?.querySelector<HTMLElement>(`a[href="#${active}"]`);
    if (!strip || !tab) return;
    const left = tab.offsetLeft - (strip.clientWidth - tab.offsetWidth) / 2;
    strip.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
  }, [active]);

  return (
    <div className="sticky top-[var(--nav-h)] z-40 bg-[#1a1612] text-[#f3ece1]" style={{ height: TAB_H }}>
      <div className="mx-auto flex h-full w-full max-w-[1240px] items-center gap-3 px-5 sm:px-6">
        <nav
          ref={navRef}
          aria-label="Offer categories"
          className="no-scrollbar flex flex-1 items-center gap-1 overflow-x-auto"
        >
          {SECTIONS_2.map((s, i) => {
            const Icon = ICONS[i] ?? Scissors;
            const on = active === s.id;
            return (
              <a
                key={s.id}
                href={`#${s.id}`}
                aria-current={on ? "true" : undefined}
                className={cn(
                  "flex shrink-0 items-center gap-2 rounded-full px-3.5 py-2 text-[13px] transition-colors duration-300",
                  on ? "bg-[#d4b489]/15 text-[#e6c79a]" : "text-[#cdc3b6] hover:text-[#f3ece1]",
                )}
              >
                <Icon aria-hidden className="size-[17px] text-[#d4b489]" strokeWidth={1.6} />
                {LABELS[i] ?? s.title}
              </a>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
