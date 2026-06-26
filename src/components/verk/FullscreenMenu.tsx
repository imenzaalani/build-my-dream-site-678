import { AnimatePresence, motion } from "motion/react";
import { Link } from "@tanstack/react-router";

const links = [
  { label: "Index", to: "/" as const, hash: "top", index: "01" },
  { label: "Studio", to: "/about" as const, hash: undefined, index: "02" },
  { label: "Services", to: "/" as const, hash: "services", index: "03" },
  { label: "Selected Work", to: "/" as const, hash: "work", index: "04" },
  { label: "Journal", to: "/journal" as const, hash: undefined, index: "05" },
  { label: "Let's talk", to: "/" as const, hash: "contact", index: "06" },
];

const socials = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Dribbble", href: "https://dribbble.com" },
  { label: "Are.na", href: "https://are.na" },
];

export function FullscreenMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="menu"
          initial={{ y: "-100%" }}
          animate={{ y: "0%" }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9990] bg-void"
        >
          {/* Top edge — close */}
          <div className="flex items-center justify-between px-8 py-5 border-b border-wire">
            <span className="font-display text-base text-bone">Verk.</span>
            <button
              onClick={onClose}
              className="eyebrow text-bone flex items-center gap-3 hover:text-volt transition-colors"
            >
              <span className="relative w-4 h-4 inline-block">
                <span className="absolute inset-x-0 top-1/2 h-px bg-current rotate-45" />
                <span className="absolute inset-x-0 top-1/2 h-px bg-current -rotate-45" />
              </span>
              Close
            </button>
          </div>

          {/* Links */}
          <nav className="px-8 md:px-16 pt-16 md:pt-24 grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-8 flex flex-col gap-2 md:gap-3">
              {links.map((l, i) => (
                <motion.div
                  key={l.label}
                  initial={{ y: 80, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.25 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    to={l.to}
                    hash={l.hash}
                    onClick={onClose}
                    className="group flex items-baseline gap-6 md:gap-10 border-b border-wire/60 py-3 md:py-5 hover:text-volt transition-colors"
                  >
                    <span className="font-mono text-[11px] text-stone w-8">{l.index}</span>
                    <span
                      className="font-display font-light tracking-tight text-bone group-hover:text-volt transition-colors leading-[0.95]"
                      style={{ fontSize: "clamp(40px, 7vw, 96px)" }}
                    >
                      {l.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="col-span-12 md:col-span-4 md:pl-10 flex flex-col gap-10 mt-10 md:mt-4">
              <div>
                <p className="eyebrow mb-3">Reach</p>
                <a
                  href="mailto:hello@verk.studio"
                  className="font-serif italic text-2xl text-bone hover:text-volt transition-colors block"
                >
                  hello@verk.studio
                </a>
                <p className="text-stone text-sm mt-3 leading-relaxed">
                  Lisbon · Berlin · São&nbsp;Paulo
                  <br />
                  Available Q3 2026 →
                </p>
              </div>

              <div>
                <p className="eyebrow mb-3">Elsewhere</p>
                <ul className="flex flex-col gap-1">
                  {socials.map((s) => (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-bone text-sm hover:text-volt transition-colors"
                      >
                        {s.label} <span className="text-stone">↗</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </nav>

          {/* Bottom ticker */}
          <div className="absolute bottom-0 inset-x-0 border-t border-wire overflow-hidden">
            <div className="marquee-track py-3">
              {Array.from({ length: 8 }).map((_, i) => (
                <span key={i} className="eyebrow text-stone whitespace-nowrap pr-12">
                  ✦ Currently in studio · Madeira ceramic identity · Vault Protocol v2 · Open for late 2026 commissions
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
