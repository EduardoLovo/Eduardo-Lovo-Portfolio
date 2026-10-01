"use client";

import { useSyncExternalStore } from "react";

// Dispositivo cujo ponteiro principal é o dedo (celular, tablet). Notebook com tela touch continua "mouse".
const QUERY = "(pointer: coarse)";

const subscribe = (onChange: () => void) => {
  const media = window.matchMedia(QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
};

export function useIsTouch() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}
