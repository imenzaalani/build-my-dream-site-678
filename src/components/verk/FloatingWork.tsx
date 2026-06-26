import { useRef, useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { projects } from "@/lib/projects";
import { motion, useMotionValue, useSpring } from "motion/react";

// Layout is computed once after mount so card dimensions are known.
type CardLayout = {
  slug: string;
  col: number;
  row: number;
  rotation: number;
  scale: number;
  zIndex: number;
};

const COLS_DESKTOP = 3;
const COLS_MOBILE = 2;
// Card width as % of container, with a small gutter.
const COL_PCT_DESKTOP = 30; // leaves ~5% gutter between 3 cols
const COL_PCT_MOBILE = 44;  // leaves ~6% gutter between 2 cols
// Vertical row stride in vh units (relative to card visual height).
const ROW_STRIDE_VH = 32;

function buildLayouts(cols: number): CardLayout[] {
  return projects.map((p, i) => ({
    slug: p.slug,
    col: i % cols,
    row: Math.floor(i / cols),
    // Deterministic "random" rotation seeded by index
    rotation: (((i * 17 + 3) % 9) - 4) * 0.8,
    scale: 1,
    zIndex: i,
  }));
}

export function FloatingWork() {
  const [layouts, setLayouts] = useState<CardLayout[]>([]);
  const [cols, setCols] = useState(COLS_DESKTOP);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    const update = () => {
      const c = window.innerWidth < 768 ? COLS_MOBILE : COLS_DESKTOP;
      setCols(c);
      setLayouts(buildLayouts(c));
    };
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  const numRows = Math.ceil(projects.length / cols);
  // Container height: rows × stride + extra for bottom drift
  const containerVh = numRows * ROW_STRIDE_VH + 16;

  return (
    <div
      className="relative w-full"
      style={{
        height: `${containerVh}vh`,
        // Allow drifting cards to be visible beyond the container edges
        overflow: "visible",
      }}
    >
      {layouts.map((layout, i) => (
        <FloatingCard
          key={layout.slug}
          project={projects[i]}
          layout={layout}
          cols={cols}
          colPct={cols === COLS_MOBILE ? COL_PCT_MOBILE : COL_PCT_DESKTOP}
          rowStride={ROW_STRIDE_VH}
          isActive={activeIndex === i}
          onHover={() => setActiveIndex(i)}
          onLeave={() => setActiveIndex(null)}
          dimmed={activeIndex !== null && activeIndex !== i}
          index={i}
        />
      ))}
    </div>
  );
}

function FloatingCard({
  project,
  layout,
  cols,
  colPct,
  rowStride,
  isActive,
  onHover,
  onLeave,
  dimmed,
  index,
}: {
  project: typeof projects[0];
  layout: CardLayout;
  cols: number;
  colPct: number;
  rowStride: number;
  isActive: boolean;
  onHover: () => void;
  onLeave: () => void;
  dimmed: boolean;
  index: number;
}) {
  const driftX = useMotionValue(0);
  const driftY = useMotionValue(0);
  const springX = useSpring(driftX, { stiffness: 50, damping: 18 });
  const springY = useSpring(driftY, { stiffness: 50, damping: 18 });
  const rafRef = useRef(0);
  // Stable phase per card — derived from index so it never randomises on re-render
  const phase = (index * 1.3) % (Math.PI * 2);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const speed = 0.35 + (index % 3) * 0.12;
    const ampX = 6 + (index % 4) * 2.5;
    const ampY = 5 + (index % 3) * 2;
    let t = phase;

    const tick = () => {
      t += 0.007 * speed;
      driftX.set(Math.sin(t) * ampX);
      driftY.set(Math.cos(t * 0.8) * ampY);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [driftX, driftY, index, phase]);

  // Column positions: evenly spread across container width
  // For 3 cols: 5%, 35%, 65%   For 2 cols: 3%, 53%
  const gutter = (100 - cols * colPct) / (cols + 1);
  const leftPct = gutter + layout.col * (colPct + gutter);

  // Add a staggered vertical offset per column for the "staircase" look
  const colVerticalOffset = layout.col * (rowStride * 0.4);

  return (
    <motion.div
      style={{
        position: "absolute",
        left: `${leftPct}%`,
        top: `${layout.row * rowStride + colVerticalOffset}vh`,
        width: `${colPct}%`,
        x: springX,
        y: springY,
        zIndex: isActive ? 50 : layout.zIndex,
      }}
      initial={{ opacity: 0, y: 40, rotate: layout.rotation }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      animate={{
        rotate: isActive ? 0 : layout.rotation,
        scale: isActive ? 1.04 : dimmed ? 0.93 : 1,
        opacity: dimmed ? 0.3 : 1,
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <Link to="/work/$slug" params={{ slug: project.slug }} className="block group">
        {/* Card */}
        <div className="relative overflow-hidden bg-void border border-wire" style={{ aspectRatio: "4/3" }}>
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Dark gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-abyss/90 via-abyss/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
          {/* Info overlay slides up */}
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
            <p className="font-display font-light text-bone tracking-tight" style={{ fontSize: "clamp(13px, 1.4vw, 18px)" }}>
              {project.title}
            </p>
            <p className="eyebrow text-volt mt-1">{project.category}</p>
          </div>
          {/* Index + year badge — always visible */}
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <span className="font-mono text-[10px] text-bone/60 bg-abyss/60 px-1.5 py-0.5">
              {project.index}
            </span>
          </div>
          <div className="absolute top-3 right-3">
            <span className="font-mono text-[10px] text-bone/60 bg-abyss/60 px-1.5 py-0.5">
              {project.year}
            </span>
          </div>
        </div>

        {/* Caption below card */}
        <div className="mt-3 px-1 flex items-center justify-between">
          <span className="text-stone text-xs tracking-tight truncate">{project.client}</span>
          <span className="text-stone text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
        </div>
      </Link>
    </motion.div>
  );
}
