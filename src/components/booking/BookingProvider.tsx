"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { BookingDialog } from "./BookingDialog";

type BookingContextValue = {
  /** preset: "offer:<id>" or "service:<id>" to preselect the form */
  openBooking: (preset?: string) => void;
  isOpen: boolean;
};

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<{ open: boolean; preset?: string; nonce: number }>({
    open: false,
    nonce: 0,
  });

  const openBooking = useCallback(
    (preset?: string) => setState((s) => ({ open: true, preset, nonce: s.nonce + 1 })),
    [],
  );
  const close = useCallback(() => setState((s) => (s.open ? { ...s, open: false } : s)), []);

  const value = useMemo(() => ({ openBooking, isOpen: state.open }), [openBooking, state.open]);

  return (
    <BookingContext.Provider value={value}>
      {children}
      <BookingDialog open={state.open} preset={state.preset} nonce={state.nonce} onClose={close} />
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used inside <BookingProvider>");
  return ctx;
}
