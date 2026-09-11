"use client";

import { useId, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { FAQS, type Faq } from "@/data/faq";
import { Eyebrow } from "@/components/ui/button";

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" aria-labelledby="faq-title" className="bg-ivory pb-20 lg:pb-28">
      <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <Eyebrow>FAQ</Eyebrow>
          <h2
            id="faq-title"
            className="mt-5 font-display text-[clamp(2.3rem,4vw,3.3rem)] font-semibold leading-[1.04] tracking-[-0.015em]"
          >
            Frequently Asked Questions
          </h2>
          <p className="mt-5 max-w-[34ch] text-[16px] leading-relaxed text-ink-soft">
            Everything you need to know before your visit.
          </p>
        </div>

        <ul className="border-t border-line lg:col-span-8">
          {FAQS.map((item, i) => (
            <FaqItem key={item.q} item={item} open={open === i} onToggle={() => setOpen(open === i ? null : i)} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function FaqItem({ item, open, onToggle }: { item: Faq; open: boolean; onToggle: () => void }) {
  const id = useId();
  const Icon = open ? Minus : Plus;

  return (
    <li className="border-b border-line">
      <h3>
        <button
          type="button"
          id={`${id}-q`}
          aria-expanded={open}
          aria-controls={`${id}-a`}
          onClick={onToggle}
          className="group flex w-full items-center justify-between gap-6 py-5 text-left text-[17px] font-medium leading-snug text-ink sm:py-6 sm:text-[18px]"
        >
          <span>{item.q}</span>
          <span
            aria-hidden
            className="grid size-9 shrink-0 place-items-center rounded-full border border-ink/20 transition-colors duration-300 group-hover:border-ink"
          >
            <Icon className="size-4" strokeWidth={1.6} />
          </span>
        </button>
      </h3>
      <div
        id={`${id}-a`}
        role="region"
        aria-labelledby={`${id}-q`}
        inert={!open}
        className="grid transition-[grid-template-rows,opacity] duration-500 ease-editorial"
        style={{ gridTemplateRows: open ? "1fr" : "0fr", opacity: open ? 1 : 0 }}
      >
        <div className="overflow-hidden">
          <p className="max-w-[62ch] whitespace-pre-line pb-6 pr-12 text-[15.5px] leading-[1.65] text-ink-soft">
            {item.a.map((part, i) =>
              typeof part === "string" ? (
                part
              ) : (
                <a
                  key={i}
                  href={part.href}
                  {...(part.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="font-medium text-ink underline decoration-ink/30 underline-offset-4 transition-colors hover:decoration-ink"
                >
                  {part.text}
                </a>
              ),
            )}
          </p>
        </div>
      </div>
    </li>
  );
}
