import Image from "next/image";
import type { Offer } from "@/data/offers";

/**
 * Normally a straight object-cover crop. With `focus.zoomOut`, the sharp photo is
 * shown smaller than the frame (more of the subject visible) and its own blurred
 * copy fills the sides, so the frame stays identical to every other card.
 */
export function OfferPhoto({ offer, sizes, eager }: { offer: Offer; sizes: string; eager?: boolean }) {
  const { focus } = offer;
  const zoom = focus.zoomOut;
  const loading = eager ? "eager" : undefined;

  if (!zoom) {
    return (
      <Image
        src={offer.image}
        alt={offer.alt}
        fill
        sizes={sizes}
        loading={loading}
        className="object-cover"
        style={{
          objectPosition: focus.position,
          transform: focus.scale ? `scale(${focus.scale})` : undefined,
          transformOrigin: focus.origin,
        }}
      />
    );
  }

  return (
    <>
      <Image src={offer.image} alt="" aria-hidden fill sizes="96px" loading={loading} className="scale-125 object-cover blur-[22px]" />
      <div
        className="offer-zoom absolute"
        style={{
          height: `${100 / zoom.visible}%`,
          aspectRatio: String(zoom.aspect),
          top: `${(-100 * zoom.top) / zoom.visible}%`,
          left: `${zoom.x ?? 50}%`,
          transform: "translateX(-50%)",
        }}
      >
        <Image src={offer.image} alt={offer.alt} fill sizes={sizes} loading={loading} className="object-cover" />
      </div>
    </>
  );
}
