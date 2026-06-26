import { useEffect, useRef, useState } from "react";

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    document.documentElement.classList.add("has-custom-cursor");

    const onMove = (e: MouseEvent) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;

      // Magnetic pull: push nearby data-magnetic elements toward cursor
      document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const threshold = Math.max(rect.width, rect.height) * 0.75;

        if (dist < threshold) {
          const pull = (1 - dist / threshold) * 12;
          el.style.transform = `translate3d(${(dx / dist) * pull}px, ${(dy / dist) * pull}px, 0)`;
          el.style.transition = "transform 0.1s ease-out";
        } else {
          el.style.transform = "translate3d(0,0,0)";
          el.style.transition = "transform 0.4s ease-out";
        }
      });
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      setHover(!!t.closest("a, button, [data-magnetic]"));
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);

    let raf = 0;
    const loop = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.18;
      ring.current.y += (pos.current.y - ring.current.y) * 0.18;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) translate(-50%, -50%) scale(${hover ? 2.4 : 1})`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.classList.remove("has-custom-cursor");
      // Reset any magnetic elements
      document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
        el.style.transform = "translate3d(0,0,0)";
      });
    };
  }, [hover]);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-[6px] h-[6px] rounded-full bg-volt pointer-events-none z-[9998] mix-blend-difference"
        style={{ transition: "opacity 0.2s" }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-[36px] h-[36px] rounded-full border border-bone pointer-events-none z-[9997]"
        style={{ transition: "border-color 0.25s, background 0.25s, scale 0.25s" }}
      />
    </>
  );
}
