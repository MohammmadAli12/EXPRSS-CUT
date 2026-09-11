"use client";

import { useSyncExternalStore } from "react";
import { formatMinutes, hoursFor } from "@/lib/site";
import { cn } from "@/lib/cn";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/** Current open/closed state, computed in salon time (IST) from the supplied hours. */
function computeStatus() {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const day = DAYS.indexOf(get("weekday"));
  const mins = Number(get("hour")) * 60 + Number(get("minute"));
  const today = hoursFor(day);
  if (mins >= today.open && mins < today.close) return `open|Open now · until ${formatMinutes(today.close)}`;
  if (mins < today.open) return `closed|Closed · opens ${formatMinutes(today.open)}`;
  const tomorrow = hoursFor((day + 1) % 7);
  return `closed|Closed · opens ${formatMinutes(tomorrow.open)} tomorrow`;
}

const subscribe = (onChange: () => void) => {
  const id = window.setInterval(onChange, 60_000);
  return () => window.clearInterval(id);
};

export function OpenStatus() {
  const status = useSyncExternalStore(subscribe, computeStatus, () => "");
  if (!status) return null;
  const [state, text] = status.split("|");
  return (
    <p className="inline-flex items-center gap-2 rounded-full bg-ivory px-3 py-1.5 text-[12px] font-medium text-ink-soft">
      <span
        aria-hidden
        className={cn("size-1.5 rounded-full", state === "open" ? "bg-[#2f7d4f]" : "bg-ink/40")}
      />
      {text}
    </p>
  );
}
