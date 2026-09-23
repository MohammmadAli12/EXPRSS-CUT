"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { SECTIONS_2 } from "@/data/offers-2";

type Zones = {
  /** The hero is on screen — its own buttons are the call to action */
  heroOnScreen: boolean;
  /** An offer band is on screen — the cards' own buttons are the call to action */
  offersOnScreen: boolean;
};

const CtaZones = createContext<Zones>({ heroOnScreen: true, offersOnScreen: false });

export const useCtaZones2 = () => useContext(CtaZones);

/**
 * Offer Page 2 shows one set of calls to action at a time on phones. This watches
 * the hero and the five offer bands and tells the header and the bottom bar when
 * to step aside, so the sticky bar can never sit on top of a card's buttons.
 */
export function CtaZones2({ children }: { children: React.ReactNode }) {
  const [heroOnScreen, setHero] = useState(true);
  const [offersOnScreen, setOffers] = useState(false);

  useEffect(() => {
    const ids = SECTIONS_2.map((s) => s.id);
    const state = new Map<string, boolean>();

    const apply = () => {
      setHero(state.get("hero") ?? false);
      setOffers(ids.some((id) => state.get(id)));
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) state.set(e.target.id, e.isIntersecting);
        apply();
      },
      /* Ignore a sliver at the very edge of the screen: a band only counts once it is really here */
      { rootMargin: "-12% 0px -12% 0px" },
    );

    /* Bands re-mount when the pinned layout swaps, so re-observe on DOM changes */
    const observeAll = () => {
      for (const id of ["hero", ...ids]) {
        const el = document.getElementById(id);
        if (el) io.observe(el);
      }
    };
    observeAll();
    const mo = new MutationObserver(observeAll);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  const value = useMemo(() => ({ heroOnScreen, offersOnScreen }), [heroOnScreen, offersOnScreen]);
  return <CtaZones value={value}>{children}</CtaZones>;
}
