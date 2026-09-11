import { cn } from "@/lib/cn";

export function Wordmark({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  return (
    <span className={cn("inline-flex flex-col leading-none", className)}>
      <span
        className={cn(
          "text-[17px] font-semibold uppercase tracking-[0.26em] sm:text-[19px]",
          tone === "dark" ? "text-ink" : "text-ivory",
        )}
      >
        Express Cuts
      </span>
      <span
        className={cn(
          "mt-[7px] text-[12px] font-semibold uppercase tracking-[0.34em]",
          tone === "dark" ? "text-ink-muted" : "text-ivory-muted",
        )}
      >
        Men&rsquo;s Salon
      </span>
    </span>
  );
}
