import { useEffect, useRef } from "react";
import { animate, stagger } from "motion/react";

type Props = {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  splitBy?: "words" | "chars";
  delay?: number;
  once?: boolean;
  as?: keyof JSX.IntrinsicElements;
};

// Scroll-triggered split-text reveal inspired by TRIONN's "Scroll Animation - Text Explosive".
// Words/chars start blurred + translated down, then spring up into place.
export function SplitText({
  text,
  className = "",
  style,
  splitBy = "words",
  delay = 0,
  once = true,
  as: Tag = "span",
}: Props) {
  const containerRef = useRef<HTMLElement>(null);
  const hasPlayed = useRef(false);

  const parts = splitBy === "chars" ? text.split("") : text.split(" ");

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const spans = Array.from(el.querySelectorAll<HTMLSpanElement>("[data-split]"));

    // Set initial state.
    spans.forEach((s) => {
      s.style.display = "inline-block";
      s.style.transform = "translateY(60px) rotate(3deg)";
      s.style.opacity = "0";
      s.style.filter = "blur(8px)";
    });

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        if (once && hasPlayed.current) return;
        hasPlayed.current = true;

        animate(
          spans,
          { y: [60, 0], opacity: [0, 1], filter: ["blur(8px)", "blur(0px)"], rotate: [3, 0] },
          {
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1],
            delay: stagger(splitBy === "chars" ? 0.025 : 0.06, { startDelay: delay }),
          }
        );
      },
      { threshold: 0.2 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [delay, once, splitBy]);

  return (
    // @ts-ignore — dynamic tag
    <Tag ref={containerRef} className={className} style={style} aria-label={text}>
      {parts.map((part, i) => (
        <span key={i} data-split style={{ display: "inline-block" }}>
          {part}
          {splitBy === "words" && i < parts.length - 1 ? "\u00a0" : ""}
        </span>
      ))}
    </Tag>
  );
}
