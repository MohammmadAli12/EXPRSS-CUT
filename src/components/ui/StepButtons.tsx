import { ArrowLeft, ArrowRight } from "lucide-react";

/** Previous / next pair shared by the offers track and the reviews carousel. */
export function StepButtons({
  onStep,
  atStart,
  atEnd,
  controls,
  label,
}: {
  onStep: (dir: -1 | 1) => void;
  atStart: boolean;
  atEnd: boolean;
  controls: string;
  /** Noun for the screen-reader labels, e.g. "package" → "Previous package" */
  label: string;
}) {
  const cls =
    "grid size-11 place-items-center rounded-full border border-ink/25 text-ink transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-ivory disabled:pointer-events-none disabled:opacity-35";
  return (
    <div className="flex gap-2">
      <button type="button" className={cls} onClick={() => onStep(-1)} disabled={atStart} aria-controls={controls} aria-label={`Previous ${label}`}>
        <ArrowLeft aria-hidden className="size-4" strokeWidth={1.6} />
      </button>
      <button type="button" className={cls} onClick={() => onStep(1)} disabled={atEnd} aria-controls={controls} aria-label={`Next ${label}`}>
        <ArrowRight aria-hidden className="size-4" strokeWidth={1.6} />
      </button>
    </div>
  );
}
