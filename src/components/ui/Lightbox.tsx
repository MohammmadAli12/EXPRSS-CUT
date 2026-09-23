"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export type Photo = { src: string; alt: string; width: number; height: number };

const EASE = [0.22, 1, 0.36, 1] as const;
/** Drag past this and the photograph changes */
const SWIPE = 70;

/**
 * The site's one photo viewer. A host calls `open(i)`; the returned `viewer`
 * goes anywhere in its markup. Escape closes, the arrow keys page, focus is kept
 * inside while it is open and returned to the trigger afterwards, and phones can
 * swipe. Photographs are shown whole (`object-contain`) — nothing is cropped
 * just to fill the screen.
 */
export function useLightbox(photos: Photo[], label = "Salon photographs") {
  const [index, setIndex] = useState<number | null>(null);
  const opener = useRef<HTMLElement | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();
  const isOpen = index !== null;

  const open = useCallback((i: number) => {
    opener.current = document.activeElement as HTMLElement | null;
    setIndex(i);
  }, []);

  const close = useCallback(() => {
    setIndex(null);
    opener.current?.focus?.();
  }, []);

  const step = useCallback(
    (dir: -1 | 1) => setIndex((i) => (i === null ? i : (i + dir + photos.length) % photos.length)),
    [photos.length],
  );

  useEffect(() => {
    if (!isOpen) return;
    document.documentElement.classList.add("modal-open");
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      } else if (e.key === "ArrowLeft") {
        step(-1);
      } else if (e.key === "ArrowRight") {
        step(1);
      } else if (e.key === "Tab") {
        /* Keep focus on the viewer's own controls while it is open */
        const focusable = panelRef.current?.querySelectorAll<HTMLElement>("button");
        if (!focusable?.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.classList.remove("modal-open");
    };
  }, [isOpen, close, step]);

  const photo = index === null ? null : photos[index];
  const control =
    "grid size-12 place-items-center rounded-full border border-ivory/25 bg-black/30 text-ivory backdrop-blur-sm transition-colors duration-300 hover:border-ivory hover:bg-black/55 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ivory";

  const viewer = (
    <AnimatePresence>
      {photo && index !== null && (
        <motion.div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label={label}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: EASE }}
          className="fixed inset-0 z-[60] flex flex-col bg-night"
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <div className="flex shrink-0 items-center justify-between gap-4 px-4 pt-4 sm:px-6 sm:pt-6">
            <p className="tabular text-[13px] font-medium text-ivory-muted">
              {index + 1} / {photos.length}
            </p>
            <button ref={closeRef} type="button" aria-label="Close image viewer" onClick={close} className={control}>
              <X aria-hidden className="size-5" strokeWidth={1.7} />
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-3 py-4 sm:px-20 sm:py-6">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={photo.src}
                initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.985 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.985 }}
                transition={{ duration: 0.3, ease: EASE }}
                drag={photos.length > 1 ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.12}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -SWIPE) step(1);
                  else if (info.offset.x > SWIPE) step(-1);
                }}
                className="relative h-full w-full"
              >
                {/* Filled, not intrinsic: the frame is the stage, so the photograph
                    is letterboxed the moment it arrives and nothing jumps */}
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="100vw"
                  priority
                  draggable={false}
                  className="object-contain"
                />
              </motion.div>
            </AnimatePresence>

            {photos.length > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Previous image"
                  onClick={() => step(-1)}
                  className={`${control} absolute left-3 top-1/2 -translate-y-1/2 sm:left-5`}
                >
                  <ChevronLeft aria-hidden className="size-6" strokeWidth={1.7} />
                </button>
                <button
                  type="button"
                  aria-label="Next image"
                  onClick={() => step(1)}
                  className={`${control} absolute right-3 top-1/2 -translate-y-1/2 sm:right-5`}
                >
                  <ChevronRight aria-hidden className="size-6" strokeWidth={1.7} />
                </button>
              </>
            )}
          </div>

          <p className="shrink-0 px-6 pb-6 text-center text-[13px] leading-snug text-ivory-muted">{photo.alt}</p>

          {/* The neighbours, fetched quietly so paging is instant */}
          <span className="sr-only" aria-hidden>
            {[photos[(index + 1) % photos.length], photos[(index - 1 + photos.length) % photos.length]].map((p) => (
              <Image key={p.src} src={p.src} alt="" width={16} height={16} aria-hidden />
            ))}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return { open, close, isOpen, index, viewer };
}
