import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { LiveClock } from "./LiveClock";

export function Nav({ onMenu }: { onMenu: () => void }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-[100] px-6 md:px-10 py-5 flex items-center justify-between transition-all duration-500 ${
        scrolled ? "backdrop-blur-md bg-abyss/70 border-b border-wire/60" : "bg-transparent"
      }`}
    >
      <Link to="/" className="flex items-center gap-2 group">
        <span className="w-2 h-2 rounded-full bg-volt animate-pulse" />
        <span className="font-display text-[15px] font-medium text-bone tracking-tight">
          Verk<span className="text-volt">.</span>
        </span>
        <span className="eyebrow text-stone hidden sm:inline-block ml-3 border-l border-wire pl-3">
          Creative Studio / Est. 2018
        </span>
      </Link>

      <LiveClock />

      <button
        onClick={onMenu}
        className="flex items-center gap-3 eyebrow text-stone hover:text-bone transition-colors group"
      >
        <span className="hidden sm:inline-block">Menu</span>
        <span className="flex flex-col gap-[5px]">
          <span className="block w-5 h-px bg-current transition-all group-hover:w-6" />
          <span className="block w-5 h-px bg-current transition-all group-hover:w-3" />
        </span>
      </button>
    </nav>
  );
}
