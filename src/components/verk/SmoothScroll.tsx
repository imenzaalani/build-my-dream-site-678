import { useEffect, useRef } from "react";

// Lenis-style inertia smooth scroll using rAF — no external lib needed.
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const current = useRef(0);
  const target = useRef(0);
  const rafId = useRef(0);
  const ease = 0.085;

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const wrap = wrapRef.current;
    if (!wrap) return;

    // We need the page to scroll naturally for anchor links + a11y,
    // so we drive the actual window scroll and interpolate a CSS transform.
    // Approach: fix the inner wrapper, drive translateY from scroll position.
    const root = document.documentElement;

    const setHeight = () => {
      root.style.height = wrap.scrollHeight + "px";
    };

    setHeight();
    const ro = new ResizeObserver(setHeight);
    ro.observe(wrap);

    wrap.style.position = "fixed";
    wrap.style.top = "0";
    wrap.style.left = "0";
    wrap.style.width = "100%";
    wrap.style.willChange = "transform";

    const onScroll = () => {
      target.current = window.scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const tick = () => {
      current.current += (target.current - current.current) * ease;
      if (Math.abs(target.current - current.current) < 0.05) {
        current.current = target.current;
      }
      wrap.style.transform = `translate3d(0, ${-current.current}px, 0)`;
      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener("scroll", onScroll);
      ro.disconnect();
      root.style.height = "";
      wrap.style.position = "";
      wrap.style.top = "";
      wrap.style.left = "";
      wrap.style.width = "";
      wrap.style.willChange = "";
      wrap.style.transform = "";
    };
  }, []);

  return <div ref={wrapRef}>{children}</div>;
}
