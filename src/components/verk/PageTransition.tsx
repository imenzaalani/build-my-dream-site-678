import { useEffect, useRef } from "react";
import { useRouter } from "@tanstack/react-router";
import { animate } from "motion/react";

// Cinematic curtain that covers the viewport on navigation, then pulls away.
export function PageTransition() {
  const curtainRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const router = useRouter();

  useEffect(() => {
    // Entrance reveal — sweep curtain away on mount.
    const curtain = curtainRef.current;
    const label = labelRef.current;
    if (!curtain || !label) return;

    // Animate curtain off on initial load.
    animate(curtain, { y: [0, "-100%"] }, { duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.1 });
    animate(label, { opacity: [1, 0] }, { duration: 0.4, delay: 0.5 });

    const unsub = router.subscribe("onBeforeNavigate", () => {
      // Slam curtain down before route change.
      curtain.style.transform = "translateY(100%)";
      animate(curtain, { y: ["100%", "0%"] }, { duration: 0.65, ease: [0.76, 0, 0.24, 1] });
      animate(label, { opacity: [0, 1] }, { duration: 0.3, delay: 0.2 });
    });

    const unsubAfter = router.subscribe("onLoad", () => {
      // Sweep curtain away after new route loads.
      setTimeout(() => {
        animate(curtain, { y: [0, "-100%"] }, { duration: 0.75, ease: [0.76, 0, 0.24, 1] });
        animate(label, { opacity: [1, 0] }, { duration: 0.3 });
      }, 80);
    });

    return () => {
      unsub();
      unsubAfter();
    };
  }, [router]);

  return (
    <div
      ref={curtainRef}
      className="fixed inset-0 z-[9995] bg-void flex flex-col items-center justify-center pointer-events-none"
      style={{ transform: "translateY(-100%)" }}
    >
      <span className="font-display text-5xl md:text-7xl text-bone font-light tracking-tight">
        Verk<span className="text-volt">.</span>
      </span>
      <span ref={labelRef} className="eyebrow text-stone mt-4 opacity-0">Loading</span>
    </div>
  );
}
