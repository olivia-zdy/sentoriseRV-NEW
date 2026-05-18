import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Scrolls to the element matching location.hash after each navigation.
 * Needed because React Router does not handle in-page anchor scrolling
 * for cross-page links like `/support#faq`.
 */
const HashScroll = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0 });
      return;
    }
    const id = hash.replace("#", "");
    // Wait for the destination page to render
    const tryScroll = (attempt = 0) => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (attempt < 10) {
        setTimeout(() => tryScroll(attempt + 1), 100);
      }
    };
    tryScroll();
  }, [pathname, hash]);

  return null;
};

export default HashScroll;
