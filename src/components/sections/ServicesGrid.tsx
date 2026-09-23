"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "motion/react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { ArrowRight } from "lucide-react";
import { SERVICES, type Service } from "@/data/services";

const EASE = [0.22, 1, 0.36, 1] as const;

const list: Variants = { show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } } };
const item: Variants = {
  hidden: { clipPath: "inset(22% 0% 0% 0% round 18px)", y: 28, opacity: 0.001 },
  show: {
    clipPath: "inset(0% 0% 0% 0% round 18px)",
    y: 0,
    opacity: 1,
    transition: { duration: 1.15, ease: EASE },
  },
};

export function ServicesGrid() {
  const reduce = useMediaQuery("(prefers-reduced-motion: reduce)");
  return (
    <motion.ul
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={list}
      className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-6 lg:mt-14"
    >
      {SERVICES.map((s) => (
        <motion.li key={s.id} variants={item}>
          <ServiceCard service={s} />
        </motion.li>
      ))}
    </motion.ul>
  );
}

/** Pages that exist; the rest still land on the "coming soon" page */
const BUILT = new Set(["/hair", "/beard", "/facial", "/hair-spa", "/hair-color", "/offers", "/gallery", "/our-story"]);

function ServiceCard({ service: s }: { service: Service }) {
  return (
    <Link
      href={s.href}
      /* Don't prefetch a page that isn't built yet — it only 404s in the console */
      prefetch={BUILT.has(s.href) ? undefined : false}
      className="group relative block aspect-[4/5] overflow-hidden rounded-[18px] bg-paper"
    >
      <div className="absolute inset-0 transition-transform duration-[1400ms] ease-editorial group-hover:scale-[1.05]">
        <Image
          src={s.image}
          alt={s.alt}
          fill
          sizes="(min-width: 1280px) 210px, (min-width: 768px) 31vw, 48vw"
          className="object-cover"
          style={{
            objectPosition: s.focus.position,
            transform: s.focus.scale ? `scale(${s.focus.scale})` : undefined,
            transformOrigin: s.focus.origin,
          }}
        />
      </div>
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-white via-white/85 to-white/0"
      />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-4 sm:p-5">
        <h3 className="text-[15px] font-medium leading-[1.3] text-ink sm:text-[16px]">
          {s.title[0]}
          <br />
          {s.title[1]}
        </h3>
        <span
          aria-hidden
          className="grid size-9 shrink-0 place-items-center rounded-full border border-ink/15 bg-white transition-colors duration-500 ease-editorial group-hover:border-ink group-hover:bg-ink group-hover:text-ivory"
        >
          <ArrowRight className="size-[15px] transition-transform duration-500 ease-editorial group-hover:translate-x-0.5" strokeWidth={1.6} />
        </span>
      </div>
    </Link>
  );
}
