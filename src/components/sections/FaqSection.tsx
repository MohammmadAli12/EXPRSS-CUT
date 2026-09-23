"use client";

import { useId, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { FAQS, type Faq } from "@/data/faq";
import { cn } from "@/lib/cn";

/** Hairline-divided accordion of the owner-supplied FAQ (one answer open at a time). */
export function FaqList({ className, items = FAQS }: { className?: string; items?: Faq[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <ul className={cn("border-t border-line", className)}>
      {items.map((item, i) => (
        <FaqItem key={item.q} item={item} open={open === i} onToggle={() => setOpen(open === i ? null : i)} />
      ))}
    </ul>
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
          className="group flex w-full items-center justify-between gap-6 py-4 text-left text-[16px] font-medium leading-snug text-ink sm:text-[16.5px]"
        >
          <span>{item.q}</span>
          <span
            aria-hidden
            className="grid size-8 shrink-0 place-items-center rounded-full border border-ink/20 transition-colors duration-300 group-hover:border-ink"
          >
            <Icon className="size-3.5" strokeWidth={1.6} />
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
          <p className="max-w-[60ch] whitespace-pre-line pb-5 pr-12 text-[15px] leading-[1.6] text-ink-soft">
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
