"use client";

import type { ButtonHTMLAttributes } from "react";
import { useBooking } from "./BookingProvider";

type Props = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick" | "type"> & {
  preset?: string;
  onBeforeOpen?: () => void;
};

/** Any button that opens the booking form. Usable from server components. */
export function BookTrigger({ preset, onBeforeOpen, children, ...rest }: Props) {
  const { openBooking } = useBooking();
  return (
    <button
      type="button"
      aria-haspopup="dialog"
      onClick={() => {
        onBeforeOpen?.();
        openBooking(preset);
      }}
      {...rest}
    >
      {children}
    </button>
  );
}
