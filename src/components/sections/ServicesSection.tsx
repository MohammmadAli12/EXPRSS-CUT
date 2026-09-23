import { Arrow, Eyebrow } from "@/components/ui/button";
import { ServicesGrid } from "./ServicesGrid";

export function ServicesSection() {
  return (
    <section id="services" aria-labelledby="services-title" className="bg-ivory pb-24 pt-10 lg:pb-32 lg:pt-12">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
          <div>
            <Eyebrow>Our services</Eyebrow>
            <h2
              id="services-title"
              className="mt-5 font-display text-[clamp(2.2rem,3.8vw,3.1rem)] font-semibold leading-[1.04] tracking-[-0.015em]"
            >
              Complete Grooming
              <br />
              For The Modern Man
            </h2>
          </div>
          <a
            href="#offers"
            className="group/btn inline-flex items-center gap-2 pb-1 text-[13.5px] font-medium text-ink underline-offset-[6px] hover:underline"
          >
            See grooming packages <Arrow className="size-3.5" />
          </a>
        </div>
        <ServicesGrid />
      </div>
    </section>
  );
}
