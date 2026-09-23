import { Star } from "lucide-react";
import { cn } from "@/lib/cn";

/** Five stars filled to `value` (champagne over line). */
export function Stars({ value, className }: { value: number; className?: string }) {
  const row = (
    <>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} aria-hidden className="size-4 shrink-0" fill="currentColor" strokeWidth={0} />
      ))}
    </>
  );
  return (
    <span role="img" aria-label={`${value} out of 5 stars`} className={cn("relative inline-flex", className)}>
      <span className="flex gap-0.5 text-line">{row}</span>
      <span
        className="absolute inset-y-0 left-0 flex gap-0.5 overflow-hidden text-champagne"
        style={{ width: `${(value / 5) * 100}%` }}
      >
        {row}
      </span>
    </span>
  );
}
