import { useEffect, useRef } from "react";
import { animate } from "motion/react";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "scale";
  once?: boolean;
};

// Generic scroll-reveal wrapper used across sections.
export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  once = true,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const played = useRef(false);

  const initial: Record<string, number | string> = {
    opacity: 0,
    ...(direction === "up" && { y: 48 }),
    ...(direction === "left" && { x: -48 }),
    ...(direction === "right" && { x: 48 }),
    ...(direction === "scale" && { scale: 0.92, y: 24 }),
  };

  const target: Record<string, number | string> = {
    opacity: 1,
    ...(direction === "up" && { y: 0 }),
    ...(direction === "left" && { x: 0 }),
    ...(direction === "right" && { x: 0 }),
    ...(direction === "scale" && { scale: 1, y: 0 }),
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    // Set initial invisible state.
    Object.assign(el.style, {
      opacity: "0",
      transform:
        direction === "up"
          ? "translateY(48px)"
          : direction === "left"
          ? "translateX(-48px)"
          : direction === "right"
          ? "translateX(48px)"
          : "translateY(24px) scale(0.92)",
    });

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        if (once && played.current) return;
        played.current = true;
        animate(el, target, {
          duration: 0.75,
          delay,
          ease: [0.16, 1, 0.3, 1],
        });
      },
      { threshold: 0.15 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [delay, direction, once]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
