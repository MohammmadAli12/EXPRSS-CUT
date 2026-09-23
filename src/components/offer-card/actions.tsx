import { MessageCircle, Phone } from "lucide-react";
import { TEL } from "@/lib/site";
import { cn } from "@/lib/cn";

/**
 * The site's two actions, as drawn for Offer Page 2: a brown gradient CALL and a
 * WhatsApp green. Every page uses these, so the CTA language is the same
 * everywhere.
 *
 * Both carry `data-local-cta`: the global bottom bar watches for that attribute
 * and steps aside while any of these is on screen (see layout/StickyCTA).
 */

const base =
  "group/btn inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold uppercase tracking-[0.08em] transition-[filter,transform] duration-300 hover:brightness-[1.07] active:scale-[0.98]";

const SIZES = {
  xs: "h-9 px-3.5 text-[11px]",
  sm: "h-10 px-4 text-[12px]",
  md: "h-11 px-6 text-[12.5px]",
  lg: "h-[52px] px-7 text-[14px]",
} as const;

type Size = keyof typeof SIZES;

export const BROWN = "bg-[linear-gradient(180deg,#a57a4d,#7a5230)] text-white shadow-[0_8px_18px_-10px_rgb(122_82_48/0.9)]";
export const GREEN = "bg-[#1FA855] text-white shadow-[0_8px_18px_-10px_rgb(31_168_85/0.9)] hover:bg-[#178a45]";

export function CallBtn2({
  size = "md",
  className,
  label = "Call Now",
  context,
}: {
  size?: Size;
  className?: string;
  label?: string;
  context?: string;
}) {
  return (
    <a
      href={TEL}
      data-local-cta
      aria-label={`Call Express Cuts${context ? ` ${context}` : ""}`}
      className={cn(base, SIZES[size], BROWN, className)}
    >
      <Phone aria-hidden className="size-4" strokeWidth={2} />
      {label}
    </a>
  );
}

export function WaBtn2({
  href,
  size = "md",
  className,
  label = "WhatsApp",
  context,
}: {
  href: string;
  size?: Size;
  className?: string;
  label?: string;
  context?: string;
}) {
  return (
    <a
      href={href}
      data-local-cta
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Message Express Cuts on WhatsApp${context ? ` ${context}` : ""}`}
      className={cn(base, SIZES[size], GREEN, className)}
    >
      <MessageCircle aria-hidden className="size-4" strokeWidth={2} />
      {label}
    </a>
  );
}
