import { useEffect, useRef, useState } from "react";

const CHARS = "!<>-_\\/[]{}—=+*^?#▓░█■□▪▫";

function scramble(target: string, frame: number, totalFrames: number): string {
  const progress = frame / totalFrames;
  return target
    .split("")
    .map((char, i) => {
      if (char === " ") return " ";
      if (i / target.length < progress) return char;
      return CHARS[Math.floor(Math.random() * CHARS.length)];
    })
    .join("");
}

type Props = {
  text: string;
  trigger?: boolean;
  className?: string;
  duration?: number;
};

// TRIONN-style glitch/scramble text effect on hover or trigger.
export function TextScramble({ text, trigger = false, className = "", duration = 40 }: Props) {
  const [display, setDisplay] = useState(text);
  const frameRef = useRef(0);
  const rafRef = useRef(0);

  useEffect(() => {
    if (!trigger) {
      setDisplay(text);
      return;
    }
    frameRef.current = 0;
    const tick = () => {
      frameRef.current++;
      setDisplay(scramble(text, frameRef.current, duration));
      if (frameRef.current < duration) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setDisplay(text);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [trigger, text, duration]);

  return <span className={className}>{display}</span>;
}
