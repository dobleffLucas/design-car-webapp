import { useEffect, useState } from "react";

import { useInView } from "./use-in-view";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * One-shot scroll reveal. Content is rendered visible from the start when the
 * visitor prefers reduced motion, so nothing ever stays hidden at opacity 0.
 */
export const useReveal = <T extends HTMLElement = HTMLDivElement>() => {
  const { ref, inView } = useInView<T>({ threshold: 0.15 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) setVisible(true);
  }, []);

  useEffect(() => {
    if (inView) setVisible(true);
  }, [inView]);

  return { ref, visible };
};
