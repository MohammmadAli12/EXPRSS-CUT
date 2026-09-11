"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Phone } from "lucide-react";
import { TEL } from "@/lib/site";
import { cn } from "@/lib/cn";
import { Arrow, btn } from "@/components/ui/button";
import { useBooking } from "@/components/booking/BookingProvider";

/**
 * Call Now + Book Now, kept on screen once the hero has scrolled away.
 * Steps aside where the page already offers the same actions (offers, final CTA, footer).
 */
export function StickyCTA() {
  const { openBooking, isOpen } = useBooking();
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    const offers = document.querySelector("[data-offers-zone]");
    const book = document.getElementById("book");
    const footer = document.querySelector("footer");
    const state = { hero: true, offers: false, end: false, footer: false };
    const update = () => setVisible(!state.hero && !state.offers && !state.end && !state.footer);

    const edge = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.target === hero) state.hero = e.isIntersecting;
        else if (e.target === book) state.end = e.isIntersecting;
        else state.footer = e.isIntersecting;
      }
      update();
    });
    /* The offers band counts as "in view" while it crosses the middle of the screen */
    const middle = new IntersectionObserver(
      ([e]) => {
        state.offers = e.isIntersecting;
        update();
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    if (hero) edge.observe(hero);
    if (book) edge.observe(book);
    if (footer) edge.observe(footer);
    if (offers) middle.observe(offers);
    return () => {
      edge.disconnect();
      middle.disconnect();
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && !isOpen && (
        <motion.div
          key="sticky-cta"
          initial={reduce ? { opacity: 0 } : { y: 28, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={reduce ? { opacity: 0 } : { y: 28, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 sm:inset-x-auto sm:bottom-6 sm:right-6"
        >
          <div className="flex gap-2 border-t border-line bg-ivory/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 sm:border-0 sm:bg-transparent sm:p-0">
            <a href={TEL} className={cn(btn("outline", "md"), "flex-1 bg-ivory sm:flex-none sm:shadow-float")}>
              <Phone aria-hidden className="size-4" strokeWidth={1.6} /> Call Now
            </a>
            <button
              type="button"
              aria-haspopup="dialog"
              onClick={() => openBooking()}
              className={cn(btn("ink", "md"), "flex-1 sm:flex-none sm:shadow-float")}
            >
              Book Now <Arrow />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
