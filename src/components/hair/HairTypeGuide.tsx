import Image from "next/image";
import { FACE_SHAPES, HAIR_TYPES, type FaceShape, type HairType } from "@/data/hair";
import { Eyebrow } from "@/components/ui/button";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Two short educational strips, side by side from 1024px — the reference's
 * composition. Deliberately small: this informs the choice, it doesn't sell.
 */
export function HairTypeGuide() {
  return (
    <section id="services" aria-labelledby="hair-type-title" className="bg-cream py-16 lg:py-20">
      <div className="shell grid gap-14 lg:grid-cols-[1.18fr_1fr] lg:gap-0">
        <Reveal className="lg:pr-12 xl:pr-16">
          <Eyebrow>Hair guide</Eyebrow>
          <div className="mt-3 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
            <h2
              id="hair-type-title"
              className="font-display text-[clamp(1.8rem,2.8vw,2.4rem)] font-semibold leading-[1.06] tracking-[-0.015em]"
            >
              Know Your Hair Type
            </h2>
            <p className="eyebrow text-ink-muted">Every hair type has a style.</p>
          </div>

          <ul className="mt-8 grid grid-cols-3 gap-x-4 gap-y-7 sm:grid-cols-5 sm:gap-x-3 lg:gap-x-4">
            {HAIR_TYPES.map((type) => (
              <HairTypeItem key={type.id} type={type} />
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1} className="lg:border-l lg:border-line lg:pl-12 xl:pl-16">
          <Eyebrow>Guide</Eyebrow>
          <div className="mt-3 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
            <h2
              id="face-shape-title"
              className="font-display text-[clamp(1.8rem,2.8vw,2.4rem)] font-semibold leading-[1.06] tracking-[-0.015em]"
            >
              Face Shape Guide
            </h2>
            <p className="eyebrow text-ink-muted">Choose a style that suits you.</p>
          </div>

          <ul aria-labelledby="face-shape-title" className="mt-8 grid grid-cols-3 gap-x-4 gap-y-7 sm:grid-cols-5 sm:gap-x-2">
            {FACE_SHAPES.map((shape) => (
              <FaceShapeItem key={shape.id} shape={shape} />
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

function HairTypeItem({ type }: { type: HairType }) {
  return (
    <li>
      <div className="relative aspect-[4/5] overflow-hidden rounded-[12px] bg-charcoal">
        <Image
          src={type.image}
          alt={type.alt}
          fill
          sizes="(min-width: 1024px) 130px, (min-width: 640px) 17vw, 29vw"
          className="object-cover"
          style={{ objectPosition: type.focus.position }}
        />
      </div>
      <h3 className="mt-3 text-[14px] font-semibold leading-tight text-ink">{type.name}</h3>
      <p className="mt-1.5 text-[12px] leading-[1.45] text-ink-soft">
        {type.lines[0]}
        <br />
        {type.lines[1]}
      </p>
    </li>
  );
}

function FaceShapeItem({ shape }: { shape: FaceShape }) {
  return (
    <li>
      <span className="grid h-[76px] place-items-center rounded-[12px] bg-champagne-soft/55">
        <svg
          viewBox="0 0 48 60"
          aria-hidden
          className="h-[54px] w-[44px]"
          fill="none"
          stroke="var(--color-champagne)"
          strokeWidth={1.6}
        >
          <path d={shape.path} />
        </svg>
      </span>
      <h3 className="mt-3 text-[14px] font-semibold leading-tight text-ink">{shape.name}</h3>
      <p className="mt-1.5 text-[12px] leading-[1.45] text-ink-soft">{shape.line}</p>
    </li>
  );
}
