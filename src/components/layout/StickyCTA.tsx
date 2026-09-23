"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { MessageCircle, Navigation, Phone } from "lucide-react";
import { SITE, TEL, waLink } from "@/lib/site";
import { cn } from "@/lib/cn";
import { Arrow, btn } from "@/components/ui/button";
import { BROWN, CallBtn2, GREEN, WaBtn2 } from "@/components/offer-card/actions";

const WA_TEXT = "Hi, I'd like to book a slot at Express Cuts.";

const bar =
  "inline-flex h-11 items-center justify-center gap-1.5 rounded-full text-[12.5px] font-medium transition-[filter,transform] duration-300 hover:brightness-[1.07] active:scale-[0.98]";

/**
 * The site's one floating call to action.
 *
 * It appears only when the screen has nothing else to act on. Every Call and
 * WhatsApp pill on the site carries `data-local-cta`; while any of them is in
 * view this bar stays away, and so it does over the page's own closing sections
 * (hero, final CTA, Find us, footer) — which is also why it never has to reserve
 * space in the layout.
 *
 * Phones get Call · WhatsApp · Directions; larger screens the floating pair.
 */
export function StickyCTA({ callOnly = false }: {
  /** Pages whose only action is a call: one bright-green Call Now, no WhatsApp */
  callOnly?: boolean;
} = {}) {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const state = { zone: true, local: false };
    const update = () => setVisible(!state.zone && !state.local);

    /* Sections the bar must never sit on top of */
    const inZone = new Set<Element>();
    const zoneIo = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) inZone.add(e.target);
        else inZone.delete(e.target);
      }
      state.zone = inZone.size > 0;
      update();
    });
    for (const el of [
      document.getElementById("hero"),
      document.getElementById("book"),
      document.getElementById("find-us"),
      document.querySelector("footer"),
    ]) {
      if (el) zoneIo.observe(el);
    }

    /* Every local Call/WhatsApp button, except the navigation's and this bar's own */
    const onScreen = new Set<Element>();
    const ctaIo = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) onScreen.add(e.target);
        else onScreen.delete(e.target);
      }
      state.local = onScreen.size > 0;
      update();
    });

    const watched = new WeakSet<Element>();
    const scan = () => {
      for (const el of document.querySelectorAll("[data-local-cta]")) {
        if (watched.has(el) || el.closest("header") || el.closest("[data-global-cta]")) continue;
        watched.add(el);
        ctaIo.observe(el);
      }
      /* Cards and bands re-mount while scrolling; forget what has left the page */
      for (const el of onScreen) if (!el.isConnected) onScreen.delete(el);
      state.local = onScreen.size > 0;
      update();
    };
    scan();

    /* Offer bands, pinned tracks and menus mount their buttons later */
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      zoneIo.disconnect();
      ctaIo.disconnect();
      mo.disconnect();
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="sticky-cta"
          data-global-cta
          initial={reduce ? { opacity: 0 } : { y: 28, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={reduce ? { opacity: 0 } : { y: 28, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 sm:inset-x-auto sm:bottom-6 sm:right-6"
        >
          {callOnly ? (
            <div className="border-t border-line bg-ivory/95 px-3 pb-[max(0.625rem,env(safe-area-inset-bottom))] pt-2.5 sm:border-0 sm:bg-transparent sm:p-0">
              <a
                href={TEL}
                aria-label={`Call now: ${SITE.phoneDisplay}`}
                className={cn(btn("go", "md"), "w-full uppercase tracking-[0.08em] sm:w-auto sm:shadow-float")}
              >
                <Phone aria-hidden className="size-4" strokeWidth={1.8} /> Call Now <Arrow />
              </a>
            </div>
          ) : (
            <>
              <nav
                aria-label="Quick actions"
                className="grid grid-cols-3 gap-2 border-t border-line bg-ivory/95 px-3 pb-[max(0.625rem,env(safe-area-inset-bottom))] pt-2.5 sm:hidden"
              >
                <a href={TEL} aria-label={`Call ${SITE.phoneDisplay}`} className={cn(bar, BROWN)}>
                  <Phone aria-hidden className="size-4" strokeWidth={1.8} /> Call
                </a>
                <a
                  href={waLink(WA_TEXT)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Message Express Cuts on WhatsApp"
                  className={cn(bar, GREEN)}
                >
                  <MessageCircle aria-hidden className="size-4" strokeWidth={1.8} /> WhatsApp
                </a>
                <a
                  href={SITE.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(bar, "border border-ink/20 bg-paper text-ink hover:border-ink")}
                >
                  <Navigation aria-hidden className="size-4" strokeWidth={1.8} /> Directions
                </a>
              </nav>

              <div className="hidden gap-2 sm:flex">
                <CallBtn2 size="md" label="Call Now" className="shadow-float" />
                <WaBtn2 size="md" className="shadow-float" href={waLink(WA_TEXT)} />
              </div>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
