"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { MessageCircle } from "lucide-react";
import { CUT_STYLES, type CutStyle } from "@/data/hair";
import { cn } from "@/lib/cn";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Eyebrow } from "@/components/ui/button";
import { StepButtons } from "@/components/ui/StepButtons";
import { WaBtn2 } from "@/components/offer-card/actions";
import { waLink } from "@/lib/site";

const N = CUT_STYLES.length;
const pad = (n: number) => String(n).padStart(2, "0");
/**
 * Page scroll bought per pixel of sideways travel. At 1.0 ten cards cost ~3.2
 * screens; this keeps the pin to roughly two. It only scales the zone's height —
 * `x` is always `-progress × overflow`, so the tenth card still lands flush right.
 */
const PACE = 0.66;

const SIZES =
  "(min-width: 1280px) 400px, (min-width: 1024px) 32vw, (min-width: 768px) 31vw, 84vw";

/**
 * The page's strongest interaction. Native vertical scroll walks the ten styles
 * sideways — three in frame on desktop (1-3 → 4-6 → 7-9 → 10), one on phones.
 * No wheel handlers, no drag, no nested horizontal scrollbar, and the browser's
 * own scrolling is never intercepted.
 *
 * This deliberately mirrors the approved Grooming Packages architecture rather
 * than importing from it: that section is signed off and must not be touched.
 */
export function CutsTrack() {
  const reduce = useMediaQuery("(prefers-reduced-motion: reduce)");
  return (
    <section id="cuts" aria-labelledby="cuts-title" className="bg-ivory pt-16 lg:pt-20">
      <div className="shell flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
        <div>
          <Eyebrow>The looks</Eyebrow>
          <h2
            id="cuts-title"
            className="mt-5 font-display text-[clamp(2.2rem,3.8vw,3.1rem)] font-semibold leading-[1.04] tracking-[-0.015em]"
          >
            Cuts Made For You<span className="text-champagne">.</span>
          </h2>
          <p className="mt-4 max-w-[46ch] text-[17px] leading-snug text-ink-soft">
            From classic to modern, choose the style that feels like you.
          </p>
        </div>
        <WaBtn2 size="md" href={waLink("Hi, I'd like to book a men's haircut at Express Cuts.")} />
      </div>

      {reduce ? <CutsGrid /> : <CutsPinned />}
    </section>
  );
}

/* ───────────────────────── Pinned track ───────────────────────── */

type Geometry = { overflow: number; offsets: number[]; cardW: number };

function CutsPinned() {
  const zoneRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const [geom, setGeom] = useState<Geometry>({ overflow: 0, offsets: [], cardW: 0 });
  const [active, setActive] = useState(0);
  const overflowMV = useMotionValue(0);
  const viewportW = useMotionValue(1);

  useEffect(() => {
    const frame = frameRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!frame || !viewport || !track) return;

    const measure = () => {
      const items = Array.from(track.children) as HTMLElement[];
      const cardW = items[0]?.offsetWidth ?? 0;
      const overflow = Math.max(0, track.offsetWidth - viewport.clientWidth);
      const offsets = items.map((el) => el.offsetLeft);
      overflowMV.set(overflow);
      viewportW.set(viewport.clientWidth);
      /* Bail out when nothing moved, so the observer can't feed itself */
      setGeom((prev) =>
        prev.overflow === overflow && prev.cardW === cardW && prev.offsets.join() === offsets.join()
          ? prev
          : { overflow, offsets, cardW },
      );
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(frame);
    ro.observe(viewport);
    ro.observe(track);
    return () => ro.disconnect();
  }, [overflowMV, viewportW]);

  const { scrollYProgress } = useScroll({ target: zoneRef, offset: ["start start", "end end"] });
  const rawX = useTransform(() => -scrollYProgress.get() * overflowMV.get());
  const x = useSpring(rawX, { stiffness: 180, damping: 34, mass: 0.5, restDelta: 0.5 });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(N - 1, Math.max(0, Math.round(v * (N - 1)))));
  });

  const scrollToProgress = useCallback((p: number, smooth: boolean) => {
    const el = zoneRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const distance = el.offsetHeight - window.innerHeight;
    window.scrollTo({
      top: top + Math.min(1, Math.max(0, p)) * distance,
      behavior: smooth ? "smooth" : "auto",
    });
  }, []);

  const step = (dir: -1 | 1) => scrollToProgress((active + dir) / (N - 1), true);

  /* Keyboard users: bring a focused off-screen card into the track viewport */
  const ensureVisible = (index: number) => {
    const { overflow, offsets, cardW } = geom;
    if (overflow <= 0) return;
    const vw = viewportW.get();
    const offset = offsets[index] ?? 0;
    const left = offset + x.get();
    if (left >= 0 && left + cardW <= vw) return;
    scrollToProgress((offset - (vw - cardW) / 2) / overflow, false);
  };

  return (
    <div
      ref={zoneRef}
      className="relative"
      style={{ height: `calc(100svh + ${Math.round(geom.overflow * PACE)}px)` }}
    >
      <div
        ref={frameRef}
        className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden pb-7 pt-[var(--nav-h)]"
      >
        <div className="w-full">
          <div
            ref={viewportRef}
            /* Focusing a clipped card makes the browser set scrollLeft on this box,
               which would desync it from the transform for good. Snap it back. */
            onScroll={(e) => {
              e.currentTarget.scrollLeft = 0;
              e.currentTarget.scrollTop = 0;
            }}
            className="cuts-viewport relative min-w-0 overflow-hidden pb-7 pt-2"
          >
            <motion.ul
              ref={trackRef}
              id="cuts-track"
              aria-label="Haircut styles"
              style={{ x }}
              className="px-shell flex w-max gap-4 md:gap-6"
            >
              {CUT_STYLES.map((cut, i) => (
                <PinnedCard
                  key={cut.id}
                  cut={cut}
                  index={i}
                  left={geom.offsets[i] ?? 0}
                  x={x}
                  viewportW={viewportW}
                  onFocus={ensureVisible}
                  eager={i < 3}
                />
              ))}
            </motion.ul>
          </div>

          <div className="shell flex items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <p className="tabular text-[13.5px] text-ink-muted" aria-hidden>
                <span className="font-semibold text-ink">{pad(active + 1)}</span> / {pad(N)}
              </p>
              <div className="relative h-px w-24 bg-ink/15" aria-hidden>
                <motion.span
                  className="absolute inset-0 origin-left bg-ink"
                  style={{ scaleX: scrollYProgress }}
                />
              </div>
            </div>
            <StepButtons
              onStep={step}
              atStart={active === 0}
              atEnd={active === N - 1}
              controls="cuts-track"
              label="style"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function PinnedCard({
  cut,
  index,
  left,
  x,
  viewportW,
  onFocus,
  eager,
}: {
  cut: CutStyle;
  index: number;
  /** Card's measured offsetLeft inside the track viewport */
  left: number;
  x: MotionValue<number>;
  viewportW: MotionValue<number>;
  onFocus: (i: number) => void;
  eager: boolean;
}) {
  /* 0 = card at the viewport's left edge, 1 = at its right edge */
  const pos = useTransform(() => (left + x.get()) / Math.max(1, viewportW.get()));
  const scale = useTransform(pos, [-0.4, 0.04, 0.7, 1.05], [0.93, 1, 1, 0.95]);
  const opacity = useTransform(pos, [-0.3, 0.03, 0.82, 1.08], [0, 1, 1, 0.5]);
  const imageX = useTransform(pos, [-0.4, 1.1], ["-4%", "4%"]);

  return (
    <motion.li style={{ scale, opacity }} className="cuts-card" onFocusCapture={() => onFocus(index)}>
      <CutCard cut={cut} imageX={imageX} eager={eager} />
    </motion.li>
  );
}

/* ───────────────────────── Card ───────────────────────── */

function CutCard({
  cut,
  imageX,
  eager,
}: {
  cut: CutStyle;
  imageX?: MotionValue<string>;
  eager?: boolean;
}) {
  return (
    <figure className="group relative aspect-[3/4] overflow-hidden rounded-[18px] bg-charcoal shadow-card transition-shadow duration-500 ease-editorial hover:shadow-float">
      {/* Two nested frames: the class-based hover zoom would be overwritten by the
          inline transform the parallax writes, so they never share an element. */}
      <div className="absolute inset-0 transition-transform duration-[1400ms] ease-editorial group-hover:scale-[1.05]">
        <motion.div style={{ x: imageX }} className="absolute inset-0">
          <Image
            src={cut.image}
            alt={cut.alt}
            fill
            sizes={SIZES}
            loading={eager ? "eager" : "lazy"}
            className="object-cover"
            style={{
              objectPosition: cut.focus.position,
              transform: cut.focus.scale ? `scale(${cut.focus.scale})` : undefined,
              transformOrigin: cut.focus.origin,
            }}
          />
        </motion.div>
      </div>

      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/35 to-transparent"
      />

      <figcaption className="absolute inset-x-0 bottom-0 flex items-end gap-4 p-5">
        <div className="min-w-0 flex-1">
          <p className="tabular text-[11px] font-semibold tracking-[0.14em] text-ivory-muted">
            {cut.number}
          </p>
          <h3 className="mt-1.5 text-[17px] font-semibold leading-tight text-ivory">{cut.name}</h3>
          <p className="mt-1 text-[12.5px] leading-snug text-ivory-soft">{cut.descriptor}</p>
        </div>
        {/* The card's focusable element — also what makes keyboard paging meaningful */}
        <a
          href={waLink(`Hi, I'd like to book the ${cut.name} haircut at Express Cuts.`)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Message Express Cuts on WhatsApp about the ${cut.name} haircut`}
          className="grid size-10 shrink-0 place-items-center rounded-full border border-ivory/35 text-ivory transition-colors duration-300 hover:border-ivory hover:bg-ivory hover:text-ink"
        >
          <MessageCircle aria-hidden className="size-4" strokeWidth={1.8} />
        </a>
      </figcaption>
    </figure>
  );
}

/* ───────────────────────── Reduced motion: static grid ───────────────────────── */

function CutsGrid() {
  return (
    <div className="shell pb-16 pt-10 lg:pb-20">
      <ul
        aria-label="Haircut styles"
        className={cn("grid gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6 xl:grid-cols-5")}
      >
        {CUT_STYLES.map((cut) => (
          <li key={cut.id}>
            <CutCard cut={cut} />
          </li>
        ))}
      </ul>
    </div>
  );
}
