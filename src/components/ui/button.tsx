import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";

type Variant = "ink" | "ivory" | "outline" | "outline-light" | "call";
type Size = "sm" | "md" | "lg";

const VARIANTS: Record<Variant, string> = {
  ink: "bg-ink text-ivory hover:bg-[#2c2926]",
  ivory: "bg-ivory text-ink hover:bg-white",
  outline: "border border-ink/20 text-ink hover:border-ink",
  "outline-light": "border border-ivory/30 text-ivory hover:border-ivory hover:bg-ivory/[0.06]",
  /* Reserved for tel: actions on the offer cards */
  call: "bg-call text-white hover:bg-call-deep",
};

const SIZES: Record<Size, string> = {
  sm: "h-11 px-5 text-[12.5px]",
  md: "h-12 px-6 text-[13.5px]",
  lg: "h-[54px] px-7 text-[14px]",
};

/** Pill button classes — shared by <a>, <Link> and <button>. */
export function btn(variant: Variant = "ink", size: Size = "md", className?: string) {
  return cn(
    "group/btn inline-flex select-none items-center justify-center gap-2.5 whitespace-nowrap rounded-full font-medium tracking-[0.01em]",
    "transition-[background-color,border-color,color,transform] duration-300 ease-editorial active:scale-[0.98]",
    SIZES[size],
    VARIANTS[variant],
    className,
  );
}

export function Arrow({ className, external }: { className?: string; external?: boolean }) {
  const Icon = external ? ArrowUpRight : ArrowRight;
  return (
    <Icon
      aria-hidden
      strokeWidth={1.75}
      className={cn(
        "size-4 shrink-0 transition-transform duration-300 ease-editorial",
        external
          ? "group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5"
          : "group-hover/btn:translate-x-0.5",
        className,
      )}
    />
  );
}

export function Eyebrow({
  children,
  className,
  as: Tag = "p",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "p" | "h3" | "span";
}) {
  return <Tag className={cn("eyebrow text-ink-muted", className)}>{children}</Tag>;
}
