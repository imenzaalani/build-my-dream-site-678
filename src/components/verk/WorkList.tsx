import { useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { projects } from "@/lib/projects";

export function WorkList() {
  const followerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = followerRef.current;
    if (!el) return;
    const CARD_W = 360;
    const CARD_H = 225;
    el.style.transform = `translate3d(${e.clientX - CARD_W / 2}px, ${e.clientY - CARD_H / 2}px, 0)`;
  };

  return (
    <>
      <div className="relative" onMouseMove={onMove}>
        {projects.map((p, i) => (
          <Link
            key={p.index}
            to="/work/$slug"
            params={{ slug: p.slug }}
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
            className="group grid grid-cols-[40px_1fr_auto] md:grid-cols-[56px_2fr_1.2fr_1fr_80px] items-center gap-4 py-7 md:py-8 border-t border-wire hover:bg-void/40 transition-colors px-3 md:px-2"
          >
            <span className="font-mono text-[11px] text-ghost group-hover:text-stone transition-colors">
              {p.index}
            </span>
            <span
              className="font-display font-light text-bone group-hover:text-volt transition-all duration-300 group-hover:pl-4 tracking-tight"
              style={{ fontSize: "clamp(28px, 3.5vw, 56px)", lineHeight: "1" }}
            >
              {p.title}
            </span>
            <span className="hidden md:inline-block text-sm text-stone tracking-tight">{p.client}</span>
            <span className="hidden md:inline-block eyebrow text-stone">{p.category}</span>
            <span className="text-stone text-right tabular text-sm font-mono">{p.year}</span>
          </Link>
        ))}
        <div className="border-t border-wire" />
      </div>

      {/* Cursor-follow image — centered on cursor */}
      <div
        ref={followerRef}
        className={`fixed top-0 left-0 pointer-events-none z-[80] w-[360px] aspect-video overflow-hidden border border-wire bg-void will-change-transform transition-opacity duration-300 hidden md:block ${
          active !== null ? "opacity-100" : "opacity-0"
        }`}
      >
        {projects.map((p, i) => (
          <img
            key={p.index}
            src={p.image}
            alt={p.title}
            loading="lazy"
            width={720}
            height={450}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-200 ${
              active === i ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute bottom-2 left-3 right-3 flex justify-between eyebrow text-bone mix-blend-difference">
          <span>{active !== null ? projects[active].title : ""}</span>
          <span>↗ View case</span>
        </div>
      </div>
    </>
  );
}
