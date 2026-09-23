"use client";

import { ALL_OFFERS_2, inr2, waGeneral2 } from "@/data/offers-2";
import { cn } from "@/lib/cn";
import { CallBtn2, WaBtn2 } from "./ui2";
import { useCtaZones2 } from "./CtaZones2";

const haircut = ALL_OFFERS_2.find((o) => o.id === "haircut")!;

/**
 * Phone-only action bar. It stays out of the way while the hero or an offer band
 * is on screen — those have their own buttons — and slides back in afterwards, so
 * only one set of calls to action is ever visible and the bar never covers a card.
 */
export function MobileBar2() {
  const { heroOnScreen, offersOnScreen } = useCtaZones2();
  const hidden = heroOnScreen || offersOnScreen;

  return (
    <div
      aria-hidden={hidden}
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 flex items-center gap-2.5 border-t border-[#1a1612]/10 bg-white px-3.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] pt-2.5 shadow-[0_-10px_30px_-18px_rgb(0_0_0/0.5)] transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:hidden",
        hidden ? "pointer-events-none translate-y-full opacity-0" : "translate-y-0 opacity-100",
      )}
    >
      <p className="shrink-0 border-r border-[#1a1612]/10 pr-3 text-[11.5px] leading-tight text-[#6b625a]">
        Haircut
        <span className="tabular block text-[21px] font-extrabold leading-none text-[#1a1612]">
          {inr2(haircut.price)}
        </span>
      </p>
      <CallBtn2 size="sm" label="Call" className="flex-1" />
      <WaBtn2
        size="sm"
        className="flex-1"
        href={waGeneral2(`Hi, I'd like to book the ${haircut.name} (${inr2(haircut.price)}).`)}
      />
    </div>
  );
}
