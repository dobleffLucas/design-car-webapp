import { useEffect, useState } from "react";

/**
 * Module-level flag that lets a page-level sticky bar tell the layout's
 * floating WhatsApp button to lift above it, so the two CTAs never overlap.
 */
let visible = false;
const listeners = new Set<(value: boolean) => void>();

export const setStickyBarVisible = (next: boolean) => {
  if (visible === next) return;
  visible = next;
  listeners.forEach((listener) => listener(next));
};

/** Reads whether a sticky bar is currently on screen. */
export const useStickyBarVisible = () => {
  const [value, setValue] = useState(visible);

  useEffect(() => {
    listeners.add(setValue);
    return () => {
      listeners.delete(setValue);
    };
  }, []);

  return value;
};
