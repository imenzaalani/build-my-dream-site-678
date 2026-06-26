import { useRef, useEffect } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

// Horizontal scroll section that pins while scrolling sideways —
// TRIONN-style "Work Showcase" horizontal reveal.
export function HorizontalScroll({ children, className = "" }: Props) {
  const stickyRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const outerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const outer = outerRef.current;
    const sticky = stickyRef.current;
    const track = trackRef.current;
    if (!outer || !sticky || !track) return;

    const setHeight = () => {
      const trackW = track.scrollWidth;
      const viewW = window.innerWidth;
      outer.style.height = `${trackW - viewW + window.innerHeight}px`;
    };

    setHeight();
    const ro = new ResizeObserver(setHeight);
    ro.observe(track);

    const onScroll = () => {
      const rect = outer.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, -rect.top / (outer.offsetHeight - window.innerHeight)));
      const maxShift = track.scrollWidth - window.innerWidth;
      track.style.transform = `translateX(${-progress * maxShift}px)`;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      ro.disconnect();
    };
  }, []);

  return (
    <div ref={outerRef}>
      <div
        ref={stickyRef}
        style={{ position: "sticky", top: 0, overflow: "hidden", height: "100vh" }}
      >
        <div
          ref={trackRef}
          className={`flex h-full will-change-transform ${className}`}
          style={{ width: "max-content" }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
