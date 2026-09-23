import Link from "next/link";
import { Arrow, Eyebrow, btn } from "@/components/ui/button";
import { Reveal } from "@/components/motion/Reveal";
import { SalonRotator } from "@/components/ui/SalonPhotos";

const FACTS = [
  { value: "2020", label: "Serving KR Puram since" },
  { value: "7 Days", label: "Open every day of the week" },
  { value: "2 KM", label: "From Hoodi Circle" },
];

export function ExperienceSection() {
  return (
    <section aria-labelledby="experience-title" className="bg-ivory pb-4 pt-16 lg:pb-8 lg:pt-20">
      <div className="shell grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <Eyebrow>Why Express Cuts</Eyebrow>
          <h2
            id="experience-title"
            className="mt-5 font-display text-[clamp(2.4rem,4vw,3.4rem)] font-semibold leading-[1.02] tracking-[-0.015em]"
          >
            More
            <br />
            Than a Salon
          </h2>
          <p className="mt-6 max-w-[40ch] text-[16px] leading-relaxed text-ink-soft">
            Welcome to Express Cuts Men&rsquo;s Salon, where style and sophistication meet. We&rsquo;re
            committed to high-quality service at value-based pricing, right at the centre of KR Puram in
            Ayyappa Nagar.
          </p>
          <Link href="/our-story" className={btn("ink", "sm", "mt-8")}>
            Our Story <Arrow className="size-3.5" />
          </Link>
        </div>

        {/* The same frame as before — the salon's own photographs cycle inside it,
            and it opens the shared viewer */}
        <Reveal variant="clip" className="lg:col-span-5">
          <SalonRotator
            className="aspect-[4/3] rounded-[18px]"
            caption={
              <>
                <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/0" />
                <span className="absolute bottom-5 left-6 font-script text-[clamp(2.2rem,3.6vw,3rem)] leading-none text-ivory sm:bottom-7 sm:left-8">
                  Step into our world
                </span>
              </>
            }
          />
        </Reveal>

        <dl className="grid grid-cols-3 gap-4 lg:col-span-3 lg:grid-cols-1 lg:gap-0 lg:divide-y lg:divide-line lg:pl-6">
          {FACTS.map((f) => (
            <div key={f.value} className="flex flex-col lg:py-6 lg:first:pt-0 lg:last:pb-0">
              <dd className="order-1 font-display text-[clamp(1.9rem,3vw,2.8rem)] font-semibold leading-none tracking-[-0.02em]">
                {f.value}
              </dd>
              <dt className="order-2 mt-2.5 text-[13.5px] leading-snug text-ink-muted">{f.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
