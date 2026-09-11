import Image from "next/image";
import Link from "next/link";
import { Arrow, Eyebrow, btn } from "@/components/ui/button";
import { Reveal } from "@/components/motion/Reveal";

const HAIR = ["Hair Cuts", "Hair Styling", "Hair Color", "Hair Treatments", "Hair Spa", "Nanoplastia", "Keratin"];
const BEAUTY = ["Hydra Facial", "Jennot Facial", "O3 & Other Facials", "Heel Peel", "Pedicure", "Manicure"];

const FACTS = [
  { value: "2020", label: "Serving KR Puram since" },
  { value: "7 Days", label: "Open every day of the week" },
  { value: "2 KM", label: "From Hoodi Circle" },
];

export function ExperienceSection() {
  return (
    <section aria-labelledby="experience-title" className="bg-ivory py-24 lg:py-32">
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

        <Reveal variant="clip" className="lg:col-span-5">
          <figure className="relative aspect-[4/3] overflow-hidden rounded-[18px] bg-charcoal">
            <Image
              src="/images/experience/interior.png"
              alt="Stylist working on a client at a styling station inside the salon"
              fill
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="object-cover"
              style={{ objectPosition: "58% 50%" }}
            />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/0" />
            <figcaption className="absolute bottom-5 left-6 font-script text-[clamp(2.2rem,3.6vw,3rem)] leading-none text-ivory sm:bottom-7 sm:left-8">
              Step into our world
            </figcaption>
          </figure>
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

      <div className="shell mt-20 lg:mt-28">
        <div className="grid gap-12 border-t border-line pt-14 lg:grid-cols-12 lg:gap-10 lg:pt-16">
          <Reveal variant="rise" className="lg:col-span-5">
            <p className="font-display text-[clamp(2.4rem,4.8vw,4.2rem)] font-semibold leading-[1.02] tracking-[-0.02em]">
              Hair. Skin.
              <br />
              <em className="font-medium text-champagne">Grooming. Care.</em>
            </p>
          </Reveal>
          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
            <ServiceList title="Hair services" items={HAIR} />
            <ServiceList title="Beauty services" items={BEAUTY} />
            <p className="text-[14px] text-ink-muted sm:col-span-2">
              …and many more. Ask us at the salon.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <Eyebrow as="h3">{title}</Eyebrow>
      <ul className="mt-5">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-3 border-b border-line py-2.5 text-[15px] text-ink-soft">
            <span aria-hidden className="h-px w-3 bg-champagne" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
