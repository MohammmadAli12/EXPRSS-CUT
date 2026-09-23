import { Scissors } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Offer Page 2's wordmark. The CALL and WHATSAPP buttons now live with the offer
 * card (components/offer-card/actions), because the homepage shows the same card;
 * they are re-exported here so this page's own call sites are unchanged.
 */
export { BROWN, GREEN, CallBtn2, WaBtn2 } from "@/components/offer-card/actions";

/** Scissors mark + wordmark, as drawn in the design */
export function Wordmark2({ tone = "ink" }: { tone?: "ink" | "ivory" }) {
  const ink = tone === "ink";
  return (
    <span className="flex items-center gap-2.5">
      <Scissors
        aria-hidden
        className={cn("size-[26px] -rotate-90", ink ? "text-[#b0834f]" : "text-[#d4b489]")}
        strokeWidth={1.4}
      />
      <span className="leading-none">
        <span
          className={cn(
            "block text-[17px] font-semibold tracking-[0.2em]",
            ink ? "text-[#1a1612]" : "text-[#f3ece1]",
          )}
        >
          EXPRESS CUTS
        </span>
        <span className="mt-1 block text-[9.5px] font-medium tracking-[0.3em] text-[#b0834f]">MEN&rsquo;S SALON</span>
      </span>
    </span>
  );
}
