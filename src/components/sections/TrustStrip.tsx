import { BadgeIndianRupee, CalendarDays, Gem, MapPin } from "lucide-react";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/cn";

const ITEMS = [
  { icon: Gem, label: "Premium Quality" },
  { icon: BadgeIndianRupee, label: "Value-Based Pricing" },
  { icon: CalendarDays, label: `Since ${SITE.established}` },
  { icon: MapPin, label: "KR Puram" },
];

export function TrustStrip() {
  return (
    <section aria-label="Why clients choose Express Cuts" className="border-y border-line bg-paper">
      <ul className="shell grid grid-cols-2 lg:grid-cols-4">
        {ITEMS.map(({ icon: Icon, label }, i) => (
          <li
            key={label}
            className={cn(
              "flex items-center gap-3 py-5 text-[14px] font-medium text-ink-soft lg:justify-center lg:py-7",
              i > 0 && "lg:border-l lg:border-line",
            )}
          >
            <Icon aria-hidden className="size-5 shrink-0 text-ink" strokeWidth={1.25} />
            {label}
          </li>
        ))}
      </ul>
    </section>
  );
}
