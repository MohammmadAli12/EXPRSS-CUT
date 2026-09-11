"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { Check, Phone, X } from "lucide-react";
import { OFFERS } from "@/data/offers";
import { SERVICES } from "@/data/services";
import { SITE, TEL, formatMinutes, hoursFor, waLink } from "@/lib/site";
import { Arrow, btn } from "@/components/ui/button";
import { cn } from "@/lib/cn";

type DialogProps = { open: boolean; preset?: string; nonce: number; onClose: () => void };

export function BookingDialog({ open, preset, nonce, onClose }: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      returnFocus.current = document.activeElement as HTMLElement | null;
      dialog.showModal();
      document.documentElement.classList.add("modal-open");
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open, nonce]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      className="booking-dialog"
      onClose={() => {
        document.documentElement.classList.remove("modal-open");
        onClose();
        returnFocus.current?.focus?.();
      }}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
    >
      {/* Keyed so every open starts from a fresh form */}
      <BookingForm key={nonce} preset={preset} titleId={titleId} onDone={onClose} />
    </dialog>
  );
}

/* ───────────────────────── Form ───────────────────────── */

type Values = { name: string; phone: string; service: string; date: string; time: string; note: string };
type Errors = Partial<Record<keyof Values, string>>;

function localISODate(d = new Date()) {
  const shifted = new Date(d.getTime() - d.getTimezoneOffset() * 60_000);
  return shifted.toISOString().slice(0, 10);
}

function slotsFor(date: string) {
  if (!date) return [];
  const day = new Date(`${date}T00:00`);
  const hours = hoursFor(day.getDay());
  const isToday = date === localISODate();
  const now = new Date();
  const nowMins = now.getHours() * 60 + now.getMinutes();
  const slots: number[] = [];
  for (let m = hours.open; m <= hours.close - 30; m += 30) {
    if (isToday && m < nowMins + 30) continue;
    slots.push(m);
  }
  return slots;
}

function serviceLabel(value: string) {
  const [kind, id] = value.split(":");
  if (kind === "offer") {
    const o = OFFERS.find((x) => x.id === id);
    if (o) return `${o.name} package (₹${o.offerPrice})`;
  }
  if (kind === "service") {
    const s = SERVICES.find((x) => x.id === id);
    if (s) return s.title.join(" ");
  }
  return "Not sure yet";
}

function normalisePhone(raw: string) {
  let digits = raw.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) digits = digits.slice(2);
  if (digits.length === 11 && digits.startsWith("0")) digits = digits.slice(1);
  return digits;
}

function BookingForm({ preset, titleId, onDone }: { preset?: string; titleId: string; onDone: () => void }) {
  const [values, setValues] = useState<Values>({
    name: "",
    phone: "",
    service: preset ?? "",
    date: "",
    time: "",
    note: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [sentUrl, setSentUrl] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const minDate = useMemo(() => localISODate(), []);
  const slots = useMemo(() => slotsFor(values.date), [values.date]);
  const uid = useId();

  const set = (key: keyof Values) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const v = e.target.value;
    setValues((prev) => ({ ...prev, [key]: v, ...(key === "date" ? { time: "" } : null) }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Errors = {};
    if (values.name.trim().length < 2) next.name = "Please enter your name.";
    const phone = normalisePhone(values.phone);
    if (!/^[6-9]\d{9}$/.test(phone)) next.phone = "Enter a 10-digit mobile number.";
    if (!values.date) next.date = "Choose a preferred date.";
    setErrors(next);
    const firstInvalid = (Object.keys(next) as (keyof Values)[])[0];
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    const date = new Date(`${values.date}T00:00`).toLocaleDateString("en-IN", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    const message = [
      "Hi Express Cuts, I'd like to book an appointment.",
      "",
      `Name: ${values.name.trim()}`,
      `Phone: ${phone}`,
      `Service: ${serviceLabel(values.service)}`,
      `Date: ${date}`,
      `Time: ${values.time ? formatMinutes(Number(values.time)) : "Flexible"}`,
      values.note.trim() ? `Note: ${values.note.trim()}` : null,
    ]
      .filter((line) => line !== null)
      .join("\n");

    const url = waLink(message);
    window.open(url, "_blank", "noopener,noreferrer");
    setSentUrl(url);
  };

  if (sentUrl) {
    return (
      <div className="px-6 pb-8 pt-6 sm:px-10 sm:pb-10 sm:pt-8">
        <CloseRow onClose={onDone} />
        <span className="mt-2 grid size-12 place-items-center rounded-full bg-ink text-ivory">
          <Check aria-hidden className="size-5" strokeWidth={2} />
        </span>
        <h2 id={titleId} className="mt-6 font-display text-[34px] font-medium leading-[1.05]">
          Your request is ready
          <br />
          <em className="text-champagne">in WhatsApp.</em>
        </h2>
        <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
          Send the message there and the salon will confirm your slot. If WhatsApp
          didn&rsquo;t open,{" "}
          <a href={sentUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-ink underline underline-offset-4">
            open it again
          </a>{" "}
          or call{" "}
          <a href={TEL} className="font-medium text-ink underline underline-offset-4">
            {SITE.phoneDisplay}
          </a>
          .
        </p>
        <button type="button" onClick={onDone} className={btn("ink", "md", "mt-8 w-full sm:w-auto")}>
          Done
        </button>
      </div>
    );
  }

  const field =
    "mt-2 block h-12 w-full rounded-xl border border-line bg-paper px-4 text-[15px] text-ink placeholder:text-[#7a736b] transition-colors hover:border-ink/30 focus:border-ink focus:outline-none focus-visible:outline-none aria-[invalid=true]:border-price";
  const label = "block text-[12.5px] font-medium text-ink-soft";

  const err = (key: keyof Values) =>
    errors[key] ? (
      <p id={`${uid}-${key}-err`} className="mt-1.5 text-[12.5px] text-price">
        {errors[key]}
      </p>
    ) : null;

  const a11y = (key: keyof Values) => ({
    "aria-invalid": errors[key] ? true : undefined,
    "aria-describedby": errors[key] ? `${uid}-${key}-err` : undefined,
  });

  return (
    <form ref={formRef} noValidate onSubmit={submit} className="px-6 pb-7 pt-6 sm:px-10 sm:pb-9 sm:pt-8">
      <CloseRow onClose={onDone} />
      <p className="eyebrow text-ink-muted">Book an appointment</p>
      <h2 id={titleId} className="mt-4 font-display text-[clamp(2rem,6vw,2.5rem)] font-medium leading-[1.02]">
        Reserve your <em className="text-champagne">chair</em>
      </h2>
      <p className="mt-3 text-[14px] leading-relaxed text-ink-soft">
        Share a few details. We&rsquo;ll send them to the salon on WhatsApp, and they&rsquo;ll confirm your slot.
      </p>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${uid}-name`} className={label}>
            Your name
          </label>
          <input
            id={`${uid}-name`}
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={set("name")}
            className={field}
            {...a11y("name")}
          />
          {err("name")}
        </div>
        <div>
          <label htmlFor={`${uid}-phone`} className={label}>
            Mobile number
          </label>
          <input
            id={`${uid}-phone`}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="98XXX XXXXX"
            value={values.phone}
            onChange={set("phone")}
            className={field}
            {...a11y("phone")}
          />
          {err("phone")}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={`${uid}-service`} className={label}>
            Service or package
          </label>
          <select id={`${uid}-service`} name="service" value={values.service} onChange={set("service")} className={cn(field, "appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%2212%22 fill=%22none%22 stroke=%22%23121110%22 stroke-width=%221.6%22><path d=%22M2 4.5l4 4 4-4%22/></svg>')] bg-[length:12px] bg-[position:right_1rem_center] bg-no-repeat pr-10")}>
            <option value="">Not sure yet — I&rsquo;ll decide at the salon</option>
            <optgroup label="Grooming packages">
              {OFFERS.map((o) => (
                <option key={o.id} value={`offer:${o.id}`}>
                  {o.name} — ₹{o.offerPrice}
                </option>
              ))}
            </optgroup>
            <optgroup label="Services">
              {SERVICES.map((s) => (
                <option key={s.id} value={`service:${s.id}`}>
                  {s.title.join(" ")}
                </option>
              ))}
            </optgroup>
          </select>
        </div>

        <div>
          <label htmlFor={`${uid}-date`} className={label}>
            Preferred date
          </label>
          <input
            id={`${uid}-date`}
            name="date"
            type="date"
            min={minDate}
            value={values.date}
            onChange={set("date")}
            className={field}
            {...a11y("date")}
          />
          {err("date")}
        </div>
        <div>
          <label htmlFor={`${uid}-time`} className={label}>
            Preferred time <span className="font-normal text-ink-muted">(optional)</span>
          </label>
          <select
            id={`${uid}-time`}
            name="time"
            value={values.time}
            onChange={set("time")}
            disabled={!values.date}
            className={cn(field, "disabled:cursor-not-allowed disabled:bg-ivory disabled:text-ink-muted")}
          >
            <option value="">{values.date ? (slots.length ? "Flexible" : "No slots left today") : "Pick a date first"}</option>
            {slots.map((m) => (
              <option key={m} value={m}>
                {formatMinutes(m)}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={`${uid}-note`} className={label}>
            Anything we should know? <span className="font-normal text-ink-muted">(optional)</span>
          </label>
          <textarea
            id={`${uid}-note`}
            name="note"
            rows={2}
            value={values.note}
            onChange={set("note")}
            className={cn(field, "h-auto resize-none py-3 leading-relaxed")}
          />
        </div>
      </div>

      <button type="submit" className={btn("ink", "lg", "mt-8 w-full")}>
        Send request on WhatsApp <Arrow />
      </button>
      <p className="mt-4 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-[13px] text-ink-muted">
        Prefer to talk?
        <a href={TEL} className="inline-flex items-center gap-1.5 font-medium text-ink underline-offset-4 hover:underline">
          <Phone aria-hidden className="size-3.5" strokeWidth={1.8} />
          Call {SITE.phoneDisplay}
        </a>
      </p>
    </form>
  );
}

function CloseRow({ onClose }: { onClose: () => void }) {
  return (
    <div className="-mr-2 -mt-1 flex justify-end">
      <button
        type="button"
        onClick={onClose}
        aria-label="Close booking form"
        className="grid size-11 place-items-center rounded-full text-ink-muted transition-colors hover:bg-ink/5 hover:text-ink"
      >
        <X aria-hidden className="size-5" strokeWidth={1.5} />
      </button>
    </div>
  );
}
