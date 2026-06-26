import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export function Loader({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Skip animation for users who prefer reduced motion.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setDone(true);
      onComplete();
      return;
    }

    const duration = 1600;
    const steps = 100;
    const interval = duration / steps;
    let current = 0;
    const timer = setInterval(() => {
      current++;
      setCount(current);
      if (current >= 100) {
        clearInterval(timer);
        setTimeout(() => setDone(true), 250);
        setTimeout(onComplete, 1000);
      }
    }, interval);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] bg-abyss flex flex-col"
          role="status"
          aria-label="Loading Verk Studio"
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-8 py-6 border-b border-wire/40">
            <span className="eyebrow">Verk® — Studio</span>
            <span className="eyebrow">MMXXVI</span>
          </div>

          {/* Center content */}
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <p className="eyebrow mb-6 text-stone">Now loading</p>
              <p className="font-serif italic text-bone text-2xl md:text-3xl max-w-md mx-auto px-6 leading-snug">
                "Process is the work. The artifact is the residue."
              </p>
            </div>
          </div>

          {/* Bottom bar with counter */}
          <div className="flex items-end justify-between px-8 pb-10">
            <span className="eyebrow">Loading</span>
            <div className="flex items-baseline gap-3">
              <span
                className="font-display font-extralight text-bone leading-none tabular"
                style={{ fontSize: "clamp(72px, 12vw, 160px)" }}
                aria-hidden
              >
                {String(count).padStart(3, "0")}
              </span>
              <span className="eyebrow translate-y-[-12px]" aria-hidden>%</span>
            </div>
          </div>

          {/* Progress line */}
          <div
            className="absolute bottom-0 left-0 h-[2px] bg-volt"
            style={{ width: `${count}%` }}
            role="progressbar"
            aria-valuenow={count}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
