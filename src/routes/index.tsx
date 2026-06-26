import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import { Cursor } from "@/components/verk/Cursor";
import { Loader } from "@/components/verk/Loader";
import { Nav } from "@/components/verk/Nav";
import { FullscreenMenu } from "@/components/verk/FullscreenMenu";
import { WorkList } from "@/components/verk/WorkList";
import { ContactForm } from "@/components/verk/ContactForm";

export const Route = createFileRoute("/")({
  component: VerkLanding,
});

const heroWords = ["We", "make", "things", "that", "matter."];
const services = [
  { n: "01", name: "Brand Identity", tags: "Strategy · Naming · Systems", note: "From the question, not the logo." },
  { n: "02", name: "Web Design", tags: "React · GSAP · Motion", note: "Interfaces that hold a point of view." },
  { n: "03", name: "Motion & 3D", tags: "After Effects · Blender · WebGL", note: "Movement that earns the second look." },
  { n: "04", name: "Build & Launch", tags: "Next.js · TanStack · Edge", note: "We ship the thing we designed." },
];

const tickerItems = [
  "Brand Identity", "Web Design", "Editorial Systems", "Motion Direction",
  "3D & WebGL", "Naming", "Art Direction", "Type Design", "Build & Launch",
];

const testimonials = [
  {
    quote: "They didn't just build a website. They gave us a language.",
    name: "Anna Kowalski",
    role: "CEO, Nordik Digital",
    init: "AK",
  },
  {
    quote: "Verk treats process like architecture. Nothing was decoration; everything was load-bearing.",
    name: "Luca Brentano",
    role: "Founder, Vault Protocol",
    init: "LB",
  },
  {
    quote: "We arrived with a deck and left with a worldview. Six months in, we still quote them in meetings.",
    name: "Sara Mendes",
    role: "Brand Lead, Meridian",
    init: "SM",
  },
];

function VerkLanding() {
  const [ready, setReady] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [tIndex, setTIndex] = useState(0);
  const t = testimonials[tIndex];

  return (
    <>
      <Loader onComplete={() => setReady(true)} />
      <Cursor />
      <div className="noise-overlay" />
      <Nav onMenu={() => setMenuOpen(true)} />
      <FullscreenMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

      <main id="top" className="bg-abyss text-bone selection:bg-volt selection:text-abyss">
        {/* ───────────── HERO ───────────── */}
        <section className="relative min-h-screen flex flex-col justify-end overflow-hidden">
          {/* Ghost double-print background word */}
          <div
            aria-hidden
            className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
          >
            <span
              className="font-display font-light ghost-text whitespace-nowrap"
              style={{ fontSize: "clamp(200px, 38vw, 640px)", letterSpacing: "-0.05em", opacity: 0.35 }}
            >
              VERK
            </span>
          </div>

          {/* Top eyebrow row */}
          <div className="relative z-10 px-6 md:px-10 pt-32 md:pt-40 grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-6 flex items-center gap-4">
              <span className="w-10 h-px bg-stone" />
              <span className="eyebrow">Independent studio · Est. 2018</span>
            </div>
            <div className="col-span-12 md:col-span-6 md:text-right text-stone text-sm leading-relaxed max-w-md md:ml-auto">
              An independent design and build studio working with founders, museums and labels who believe craft still moves markets.
            </div>
          </div>

          {/* Headline */}
          <div className="relative z-10 px-6 md:px-10 pb-12 md:pb-20 mt-20 md:mt-32">
            <motion.h1
              initial="hidden"
              animate={ready ? "show" : "hidden"}
              variants={{ show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } } }}
              className="font-display font-light text-bone tracking-tight"
              style={{ fontSize: "clamp(56px, 14vw, 220px)", lineHeight: "0.88" }}
            >
              {heroWords.map((w, i) => (
                <span key={i} className="inline-block overflow-hidden mr-[0.18em] align-baseline">
                  <motion.span
                    variants={{
                      hidden: { y: "115%", opacity: 0 },
                      show: { y: "0%", opacity: 1, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
                    }}
                    className={`inline-block ${i === heroWords.length - 1 ? "italic font-serif" : ""}`}
                  >
                    {w}
                    {i === heroWords.length - 1 && <span className="text-volt not-italic">_</span>}
                  </motion.span>
                </span>
              ))}
            </motion.h1>

            <div className="mt-16 flex items-end justify-between flex-wrap gap-6">
              <div className="flex items-center gap-4">
                <span className="w-12 h-px bg-stone" />
                <span className="eyebrow">Scroll to begin</span>
                <span className="text-stone text-xl translate-y-px">↓</span>
              </div>
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-[11px] text-stone">N 38.72° / W 9.14°</span>
                <span className="text-ghost">|</span>
                <span className="font-mono text-[11px] text-stone">Lisbon Studio</span>
              </div>
            </div>
          </div>
        </section>

        {/* ───────────── MARQUEE TICKER ───────────── */}
        <section className="border-y border-wire overflow-hidden bg-void/40">
          <div className="marquee-track py-4">
            {Array.from({ length: 3 }).flatMap((_, r) =>
              tickerItems.map((item, i) => (
                <span key={`${r}-${i}`} className="flex items-center whitespace-nowrap pr-12">
                  <span className="text-volt mr-12">✦</span>
                  <span className="eyebrow text-bone">{item}</span>
                </span>
              ))
            )}
          </div>
        </section>

        {/* ───────────── MANIFESTO ───────────── */}
        <section id="manifesto" className="relative py-32 md:py-48 px-6 md:px-10">
          <div className="grid grid-cols-12 gap-6 max-w-[1440px] mx-auto">
            <div className="col-span-12 md:col-span-3 flex items-start">
              <div className="flex items-center gap-3 sticky top-32">
                <span className="font-mono text-[11px] text-stone">[ 01 ]</span>
                <span className="eyebrow">Studio</span>
              </div>
            </div>

            <div className="col-span-12 md:col-span-9 md:pl-8">
              <p
                className="font-serif italic text-bone"
                style={{ fontSize: "clamp(28px, 4.4vw, 72px)", lineHeight: "1.15", letterSpacing: "-0.01em" }}
              >
                We design for longevity. <span className="text-stone">Clarity first,</span>{" "}
                <span className="text-stone">craft always,</span> built to outlast the trend cycle.
              </p>

              <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-10 md:gap-14 border-t border-wire pt-12">
                {[
                  { n: "2018", l: "Established" },
                  { n: "07", l: "Years in practice" },
                  { n: "40+", l: "Projects delivered" },
                ].map((s) => (
                  <div key={s.l} className="flex flex-col gap-3">
                    <span
                      className="font-display font-extralight text-bone leading-none tabular tracking-tight"
                      style={{ fontSize: "clamp(48px, 6vw, 88px)" }}
                    >
                      {s.n}
                    </span>
                    <span className="eyebrow">{s.l}</span>
                  </div>
                ))}
              </div>

              <a
                href="#"
                className="inline-flex items-center gap-3 mt-14 group eyebrow text-bone border-b border-wire pb-2 hover:border-volt hover:text-volt transition-colors"
              >
                <span className="w-12 h-px bg-current" />
                About the studio
                <span className="text-base">↗</span>
              </a>
            </div>
          </div>

          {/* Ghost background number */}
          <span
            aria-hidden
            className="absolute right-0 bottom-0 font-display font-extralight ghost-text pointer-events-none select-none leading-none"
            style={{ fontSize: "clamp(180px, 24vw, 360px)", opacity: 0.4 }}
          >
            01
          </span>
        </section>

        {/* ───────────── SERVICES ───────────── */}
        <section id="services" className="border-t border-wire">
          <div className="px-6 md:px-10 pt-24 md:pt-32 pb-10 grid grid-cols-12 gap-6 max-w-[1440px] mx-auto">
            <div className="col-span-12 md:col-span-4 flex items-center gap-3">
              <span className="font-mono text-[11px] text-stone">[ 02 ]</span>
              <span className="eyebrow">Practice</span>
            </div>
            <div className="col-span-12 md:col-span-8">
              <h2
                className="font-display font-light text-bone tracking-tight"
                style={{ fontSize: "clamp(36px, 5vw, 80px)", lineHeight: "1" }}
              >
                Four ways we work — <span className="text-stone">one standard.</span>
              </h2>
            </div>
          </div>

          <div className="max-w-[1440px] mx-auto px-2 md:px-6 pb-10">
            {services.map((s) => (
              <a
                key={s.n}
                href="#"
                data-magnetic
                className="group grid grid-cols-[40px_1fr_auto] md:grid-cols-[60px_1.4fr_1.2fr_1fr_60px] items-center gap-4 px-4 py-7 md:py-10 border-t border-wire hover:bg-void/50 transition-colors"
              >
                <span className="font-mono text-[11px] text-ghost group-hover:text-stone transition-colors">{s.n}</span>
                <span
                  className="font-display font-light text-bone group-hover:text-volt transition-all group-hover:pl-3 tracking-tight"
                  style={{ fontSize: "clamp(24px, 3vw, 44px)", lineHeight: "1" }}
                >
                  {s.name}
                </span>
                <span className="hidden md:inline-block text-sm text-stone">{s.tags}</span>
                <span className="hidden md:inline-block text-sm text-bone italic font-serif max-w-xs">{s.note}</span>
                <span className="text-stone text-right text-lg group-hover:text-volt group-hover:translate-x-1 transition-all">→</span>
              </a>
            ))}
            <div className="border-t border-wire" />
          </div>
        </section>

        {/* ───────────── WORK ───────────── */}
        <section id="work" className="px-2 md:px-6 pt-24 md:pt-40 pb-20 border-t border-wire">
          <div className="px-4 md:px-4 grid grid-cols-12 gap-6 max-w-[1440px] mx-auto mb-12">
            <div className="col-span-6 md:col-span-4 flex items-center gap-3">
              <span className="font-mono text-[11px] text-stone">[ 03 ]</span>
              <span className="eyebrow">Selected work · 2023—25</span>
            </div>
            <div className="col-span-6 md:col-span-8 flex justify-end items-end">
              <a className="eyebrow text-stone hover:text-bone transition-colors border-b border-wire pb-1 inline-flex items-center gap-2" href="#">
                View archive <span>→</span>
              </a>
            </div>
          </div>

          <div className="max-w-[1440px] mx-auto">
            <WorkList />
          </div>
        </section>

        {/* ───────────── LARGE MARQUEE ───────────── */}
        <section className="border-y border-wire py-10 md:py-16 overflow-hidden bg-void">
          <div className="marquee-track marquee-fast">
            {Array.from({ length: 4 }).map((_, i) => (
              <span
                key={i}
                className="font-display font-light text-bone whitespace-nowrap pr-16 flex items-center"
                style={{ fontSize: "clamp(48px, 8vw, 140px)", letterSpacing: "-0.03em", lineHeight: "1" }}
              >
                Process is the work
                <span className="text-volt mx-12 text-[0.55em] translate-y-[-0.2em]">✦</span>
              </span>
            ))}
          </div>
        </section>

        {/* ───────────── TESTIMONIALS ───────────── */}
        <section className="py-32 md:py-48 px-6 md:px-10 border-t border-wire">
          <div className="max-w-[1440px] mx-auto">
            <div className="flex items-center gap-3 mb-20">
              <span className="font-mono text-[11px] text-stone">[ 04 ]</span>
              <span className="eyebrow">Client words</span>
            </div>

            <motion.div
              key={tIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-[760px] mx-auto text-center"
            >
              <p
                className="font-serif italic text-bone"
                style={{ fontSize: "clamp(24px, 3vw, 44px)", lineHeight: "1.3" }}
              >
                <span className="text-volt">"</span>
                {t.quote}
                <span className="text-volt">"</span>
              </p>

              <div className="mt-12 flex items-center justify-center gap-4">
                <div className="w-11 h-11 rounded-full border border-wire bg-surface flex items-center justify-center text-volt text-xs font-medium tracking-wider">
                  {t.init}
                </div>
                <div className="text-left">
                  <p className="text-bone text-sm">{t.name}</p>
                  <p className="text-stone text-xs eyebrow mt-1">{t.role}</p>
                </div>
              </div>
            </motion.div>

            <div className="flex items-center justify-center gap-6 mt-16">
              <button
                onClick={() => setTIndex((i) => (i - 1 + testimonials.length) % testimonials.length)}
                className="w-10 h-10 rounded-full border border-wire flex items-center justify-center text-stone hover:text-volt hover:border-volt transition-colors"
              >
                ←
              </button>
              <span className="font-mono text-stone text-xs tracking-widest tabular">
                {String(tIndex + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
              </span>
              <button
                onClick={() => setTIndex((i) => (i + 1) % testimonials.length)}
                className="w-10 h-10 rounded-full border border-wire flex items-center justify-center text-stone hover:text-volt hover:border-volt transition-colors"
              >
                →
              </button>
            </div>
          </div>
        </section>

        {/* ───────────── CTA ───────────── */}
        <section id="contact" className="relative py-40 md:py-64 px-6 md:px-10 border-t border-wire overflow-hidden">
          <span
            aria-hidden
            className="absolute inset-x-0 top-0 font-display font-extralight ghost-text pointer-events-none select-none text-center leading-none"
            style={{ fontSize: "clamp(240px, 42vw, 720px)", opacity: 0.25 }}
          >
            ?
          </span>

          <div className="relative text-center max-w-3xl mx-auto">
            <span className="eyebrow text-stone">[ 05 ] — Start something</span>
            <h2
              className="font-display font-medium text-bone mt-8 tracking-tight"
              style={{ fontSize: "clamp(72px, 14vw, 220px)", lineHeight: "0.9" }}
            >
              Ready<span className="text-volt">?</span>
            </h2>

            <p className="font-serif italic text-stone mt-10 text-lg md:text-xl max-w-md mx-auto leading-snug">
              We take on a small number of projects each quarter. Q3 2026 is open.
            </p>

            <ContactForm />

            <a
              href="mailto:hello@verk.studio"
              className="eyebrow text-stone hover:text-bone transition-colors mt-10 inline-block"
            >
              or hello@verk.studio
            </a>
          </div>
        </section>

        {/* ───────────── FOOTER ───────────── */}
        <footer className="border-t border-wire px-6 md:px-10 pt-20 pb-10 bg-void">
          <div className="max-w-[1440px] mx-auto grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-6">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-volt rounded-full" />
                <span className="font-display text-2xl text-bone">Verk<span className="text-volt">.</span></span>
              </div>
              <p
                className="font-serif italic text-bone mt-6 max-w-md"
                style={{ fontSize: "clamp(20px, 2vw, 28px)", lineHeight: "1.25" }}
              >
                Building experiences that earn their attention.
              </p>
            </div>

            <div className="col-span-6 md:col-span-3">
              <p className="eyebrow mb-4">Studio</p>
              <ul className="flex flex-col gap-2 text-bone text-sm">
                <li><a href="#manifesto" className="hover:text-volt transition-colors">About</a></li>
                <li><a href="#services" className="hover:text-volt transition-colors">Services</a></li>
                <li><a href="#work" className="hover:text-volt transition-colors">Selected work</a></li>
                <li><a href="#" className="hover:text-volt transition-colors">Journal</a></li>
              </ul>
            </div>

            <div className="col-span-6 md:col-span-3">
              <p className="eyebrow mb-4">Elsewhere</p>
              <ul className="flex flex-col gap-2 text-bone text-sm">
                <li><a href="#" className="hover:text-volt transition-colors">Instagram ↗</a></li>
                <li><a href="#" className="hover:text-volt transition-colors">LinkedIn ↗</a></li>
                <li><a href="#" className="hover:text-volt transition-colors">Dribbble ↗</a></li>
                <li><a href="#" className="hover:text-volt transition-colors">Are.na ↗</a></li>
              </ul>
            </div>
          </div>

          <div className="max-w-[1440px] mx-auto mt-20 pt-6 border-t border-wire flex items-center justify-between flex-wrap gap-4 text-xs text-stone font-mono">
            <span>© MMXXVI · Verk Studio Lda.</span>
            <span className="eyebrow">Rua dos Anjos · Lisboa · PT</span>
            <span>Privacy · Terms · Cookies</span>
          </div>
        </footer>
      </main>
    </>
  );
}
