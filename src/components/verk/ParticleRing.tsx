import { useEffect, useRef } from "react";

type Props = {
  count?: number;
  radius?: number;
  color?: string;
  speed?: number;
};

// TRIONN-inspired "3D Mark with Particle Orbit" — orbiting dots around an element.
// Pure canvas, no deps.
export function ParticleRing({
  count = 28,
  radius = 120,
  color = "oklch(0.93 0.18 125)",
  speed = 0.3,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = (radius + 20) * 2;
    canvas.width = size;
    canvas.height = size;
    const cx = size / 2;
    const cy = size / 2;

    // Particles on two rings with different tilt / phase.
    const particles = Array.from({ length: count }, (_, i) => ({
      angle: (i / count) * Math.PI * 2,
      ring: i % 2 === 0 ? 1 : 0.65,
      tilt: i % 2 === 0 ? 0.35 : -0.25,
      size: 1.5 + (i % 3) * 0.6,
      opacity: 0.3 + (i % 4) * 0.18,
      speed: speed * (0.8 + (i % 3) * 0.15) * (i % 2 === 0 ? 1 : -0.7),
    }));

    let raf = 0;
    const tick = () => {
      ctx.clearRect(0, 0, size, size);
      particles.forEach((p) => {
        p.angle += 0.008 * p.speed;
        const r = radius * p.ring;
        const x = cx + Math.cos(p.angle) * r;
        const y = cy + Math.sin(p.angle) * r * (0.35 + p.tilt);
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = color.replace(")", ` / ${p.opacity})`).replace("oklch(", "oklch(");
        // Fallback for browsers that don't support oklch in canvas:
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = "#c8fa5f";
        ctx.fill();
        ctx.globalAlpha = 1;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, [count, radius, color, speed]);

  const size = (radius + 20) * 2;
  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      className="pointer-events-none absolute"
      style={{
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        opacity: 0.7,
      }}
    />
  );
}
