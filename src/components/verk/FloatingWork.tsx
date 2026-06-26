import { useRef, useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { projects } from "@/lib/projects";
import { motion, useMotionValue, useSpring } from "motion/react";

type FloatingCard = {
  project: typeof projects[0];
  x: number;
  y: number;
  rotation: number;
  scale: number;
  zIndex: number;
};

// TRIONN-inspired "Floating Project Gallery" — cards drift in space,
// snap to hover, and link to case studies.
export function FloatingWork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cards, setCards] = useState<FloatingCard[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Deterministic layout so SSR and client match.
  useEffect(() => {
    const cols = window.innerWidth < 768 ? 2 : 3;
    const generated: FloatingCard[] = projects.map((p, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const xBase = (col / (cols - 1)) * 80 + 10;
      const yBase = row * 38;
      // Small random offsets for organic feel — seeded by index so stable.
      const xOff = ((i * 37 + 11) % 14) - 7;
      const yOff = ((i * 53 + 7) % 12) - 6;
      return {
        project: p,
        x: xBase + xOff,
        y: yBase + yOff,
        rotation: ((i * 17 + 3) % 9) - 4,
        scale: 0.92 + (i % 3) * 0.04,
        zIndex: i,
      };
    });
    setCards(generated);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: "clamp(560px, 80vw, 900px)" }}
    >
      {cards.map((card, i) => (
        <FloatingCard
          key={card.project.slug}
          card={card}
          isActive={activeIndex === i}
          onHover={() => setActiveIndex(i)}
          onLeave={() => setActiveIndex(null)}
          dimmed={activeIndex !== null && activeIndex !== i}
        />
      ))}
    </div>
  );
}

function FloatingCard({
  card,
  isActive,
  onHover,
  onLeave,
  dimmed,
}: {
  card: FloatingCard;
  isActive: boolean;
  onHover: () => void;
  onLeave: () => void;
  dimmed: boolean;
}) {
  // Continuous idle drift.
  const driftX = useMotionValue(0);
  const driftY = useMotionValue(0);
  const springX = useSpring(driftX, { stiffness: 60, damping: 20 });
  const springY = useSpring(driftY, { stiffness: 60, damping: 20 });
  const rafRef = useRef(0);
  const timeRef = useRef(Math.random() * Math.PI * 2);

  useEffect(() => {
    const speed = 0.4 + Math.random() * 0.3;
    const ampX = 8 + Math.random() * 6;
    const ampY = 6 + Math.random() * 5;

    const tick = () => {
      timeRef.current += 0.008 * speed;
      driftX.set(Math.sin(timeRef.current) * ampX);
      driftY.set(Math.cos(timeRef.current * 0.7) * ampY);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [driftX, driftY]);

  return (
    <motion.div
      style={{
        position: "absolute",
        left: `${card.x}%`,
        top: `${card.y}px`,
        x: springX,
        y: springY,
        zIndex: isActive ? 50 : card.zIndex,
      }}
      animate={{
        rotate: isActive ? 0 : card.rotation,
        scale: isActive ? 1.06 : dimmed ? 0.88 : card.scale,
        opacity: dimmed ? 0.35 : 1,
      }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className="cursor-pointer"
    >
      <Link to="/work/$slug" params={{ slug: card.project.slug }}>
        <div
          className="relative overflow-hidden bg-void border border-wire group"
          style={{ width: "clamp(180px, 20vw, 280px)", aspectRatio: "4/3" }}
        >
          <img
            src={card.project.image}
            alt={card.project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-abyss/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-400 opacity-0 group-hover:opacity-100">
            <p className="font-display font-light text-bone text-sm tracking-tight">{card.project.title}</p>
            <p className="eyebrow text-volt mt-1">{card.project.category}</p>
          </div>
          {/* Index badge */}
          <div className="absolute top-3 left-3 font-mono text-[10px] text-stone">
            {card.project.index}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
