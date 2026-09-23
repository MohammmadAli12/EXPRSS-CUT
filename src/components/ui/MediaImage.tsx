import { getImageProps, type ImageProps } from "next/image";

/** 1×1 transparent GIF: what the browser picks where the photograph must not load */
const BLANK = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

/**
 * next/image output wrapped in <picture>. Where `skip` matches, the browser
 * selects a blank source instead, so the photograph is never downloaded there —
 * even with eager loading. Lazy loading alone is not a reliable guarantee for
 * display:none images. Used by the desktop and mobile hero compositions, which
 * each hide the other.
 */
export function MediaImage({ skip, alt, ...props }: ImageProps & { skip: string }) {
  const { props: img } = getImageProps({ alt, ...props });
  return (
    <picture>
      <source media={skip} srcSet={BLANK} />
      <img {...img} alt={alt} />
    </picture>
  );
}
