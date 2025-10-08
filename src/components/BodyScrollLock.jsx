/** @format */

import { useEffect } from "react";

// BodyScrollLock component: when `active` is true, it prevents background scrolling
// and compensates for the scrollbar to avoid layout shift. Renders nothing.
export default function BodyScrollLock({ active = false }) {
  useEffect(() => {
    if (!active) return;

    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;

    const scrollBarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    if (scrollBarWidth > 0) {
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [active]);

  return null;
}
