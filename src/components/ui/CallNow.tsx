import { Phone } from "lucide-react";
import { SITE, TEL } from "@/lib/site";
import { cn } from "@/lib/cn";
import { Arrow, btn } from "@/components/ui/button";

/** The Hair Spa page's one action: a bright-green CALL NOW pill that dials the salon. */
export function CallNow({
  size = "lg",
  className,
  context,
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
  /** Appended to the accessible name, e.g. "about The King's Ritual" */
  context?: string;
}) {
  return (
    <a
      href={TEL}
      data-local-cta
      aria-label={`Call now: ${SITE.phoneDisplay}${context ? ` ${context}` : ""}`}
      className={cn(btn("go", size), "uppercase tracking-[0.1em]", className)}
    >
      <Phone aria-hidden className="size-4" strokeWidth={2} />
      Call Now
      <Arrow />
    </a>
  );
}
