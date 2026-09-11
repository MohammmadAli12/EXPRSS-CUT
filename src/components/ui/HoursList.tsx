import { HOURS } from "@/lib/site";
import { cn } from "@/lib/cn";

export function HoursList({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  return (
    <dl className={cn("space-y-2.5 text-[14px]", className)}>
      {HOURS.map((row) => (
        <div key={row.label} className="flex items-baseline justify-between gap-6">
          <dt className={tone === "dark" ? "text-ink-muted" : "text-ivory-muted"}>{row.label}</dt>
          <dd className={cn("tabular text-right", tone === "dark" ? "text-ink" : "text-ivory")}>
            {row.display}
          </dd>
        </div>
      ))}
    </dl>
  );
}
