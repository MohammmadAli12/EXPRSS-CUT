import { BadgeIndianRupee, CalendarDays, Gem, MapPin, Scissors } from "lucide-react";
import { cn } from "@/lib/cn";

const ITEMS = [
  { icon: Gem, label: "Quality Service" },
  { icon: BadgeIndianRupee, label: "Value-Based Pricing" },
  { icon: Scissors, label: "Men’s Grooming" },
  { icon: CalendarDays, label: "Established 2020" },
  { icon: MapPin, label: "Central KR Puram" },
];

export function TrustStrip() {
  return (
    <section aria-label="Why clients choose Express Cuts" className="border-y border-line bg-paper">
      <ul className="shell grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
        {ITEMS.map(({ icon: Icon, label }, i) => (
          <li
            key={label}
            className={cn(
              "flex items-center gap-3 py-5 text-[14px] font-medium text-ink-soft lg:justify-center lg:py-7",
              i > 0 && "lg:border-l lg:border-line",
              i === ITEMS.length - 1 && "col-span-2 sm:col-span-1",
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
