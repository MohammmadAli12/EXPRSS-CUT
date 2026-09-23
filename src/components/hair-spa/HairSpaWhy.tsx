import { Clock, IndianRupee, MapPin, Scissors } from "lucide-react";
import { CLOSING_TIME } from "@/data/facial";
import { Eyebrow } from "@/components/ui/button";
import { Reveal } from "@/components/motion/Reveal";

const FEATURES = [
  { icon: Scissors, title: "Professional Grooming", note: "Men's Hair & Grooming" },
  { icon: MapPin, title: "KR Puram Location", note: "Ayyappa Nagar · Near Hoodi" },
  { icon: IndianRupee, title: "Value Pricing", note: "Quality Grooming" },
  { icon: Clock, title: "Extended Hours", note: CLOSING_TIME ? `Open Till ${CLOSING_TIME}` : "Open 7 days" },
];

/** Why Express Cuts — four facts, no paragraphs. */
export function HairSpaWhy() {
  return (
    <section aria-labelledby="spa-why-title" className="bg-hero py-12 lg:py-14">
      <div className="shell">
        <Reveal>
          <Eyebrow>Men&rsquo;s Salon · KR Puram</Eyebrow>
          <h2
            id="spa-why-title"
            className="mt-3 font-display text-[clamp(2rem,3.2vw,2.6rem)] font-semibold leading-[1.04] tracking-[-0.015em]"
          >
            Hair Spa for Men in KR Puram
          </h2>
          <p className="mt-2.5 text-[15px] text-ink-soft sm:text-[16px]">
            Professional Men&rsquo;s Hair Spa · Hair Care · Grooming
          </p>
        </Reveal>

        <ul className="mt-7 grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-4">
          {FEATURES.map(({ icon: Icon, title, note }, i) => (
            <li key={title}>
              <Reveal delay={i * 0.06} className="h-full">
                <div className="flex h-full flex-col gap-3 rounded-[14px] border border-line bg-paper p-4 sm:flex-row sm:items-center sm:gap-4 sm:p-5">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-champagne-soft/70 text-champagne sm:size-12">
                    <Icon aria-hidden className="size-5" strokeWidth={1.5} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[14.5px] font-semibold leading-tight text-ink sm:text-[15px]">{title}</span>
                    <span className="mt-1 block text-[13px] leading-snug text-ink-muted">{note}</span>
                  </span>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
