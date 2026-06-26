import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
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
  {
    n: "01",
    name: "Brand Identity",
    tags: "Strategy · Naming · Systems",
    note: "From the question, not the logo.",
    detail: "We define the voice, the visual language, and the logic that connects them.",
  },
  {
    n: "02",
    name: "Web Design",
    tags: "React · GSAP · Motion",
    note: "Interfaces that hold a point of view.",
    detail: "Performant, opinionated, built to convert without sacrificing craft.",
  },
  {
    n: "03",
    name: "Motion & 3D",
    tags: "After Effects · Blender · WebGL",
    note: "Movement that earns the second look.",
    detail: "From title sequences to interactive 3D — motion as storytelling.",
  },
  {
    n: "04",
    name: "Build & Launch",
    tags: "Next.js · TanStack · Edge",
    note: "We ship the thing we designed.",
    detail: "Full-stack delivery with CI/CD, analytics, and production-grade architecture.",
  },
];

const tickerItems = [
  "Brand Identity",
  "Web Design",
  "Editorial Systems",
  "Motion Direction",
  "3D & WebGL",
  "Naming",
  "Art Direction",
  "Type Design",
  "Build & Launch",
];

const testimonials = [
  {
    quote: "They didn't just build a website. They gave us a language.",
    name: "Anna Kowalski",
    role: "CEO, Nordik Digital",
    init: "AK",
    project: "Brand Identity · 2025",
  },
  {
    quote: "Verk treats process like architecture. Nothing was decoration; everything was load-bearing.",
    name: "Luca Brentano",
    role: "Founder, Vault Protocol",
    init: "LB",
    project: "Web Design · 2025",
  },
  {
    quote: "We arrived with a deck and left with a worldview. Six months in, we still quote them in meetings.",
    name: "Sara Mendes",
    role: "Brand Lead, Meridian",
    init: "SM",
    project: "Motion & Brand · 2024",
  },
];

const stats = [
  { value: "40+", label: "Projects delivered", sub: "Since 2018" },
  { value: "07", label: "Years in practice", sub: "Est. Lisbon" },
  { value: "3", label: "Continents active", sub: "EU · LATAM · NA" },
  { value: "98%", label: "Client retention", sub: "Repeat engagements" },
];

function useCountUp(target: number, duration = 1200, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const elapsed = ts - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(ease * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function StatCard({ value, label, sub, inView }: { value: string; label: string; sub: string; inView: boolean }) {
  const isNumeric = /^\d/.test(value);
  const numericPart = parseInt(value.replace(/\D/g, "")) || 0;
  const suffix = value.replace(/[\d]/g, "");
  const count = useCountUp(numericPart, 1400, isNumeric && inView);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col gap-3 group"
    >
      <span
        className="font-display font-extralight leading-none tabular tracking-tight stat-number"
        style={{ fontSize: "clamp(52px, 7vw, 100px)" }}
      >
        {isNumeric ? `${count}${suffix}` : value}
      </span>
      <span className="eyebrow text-bone">{label}</span>
      <span className="text-stone text-xs font-mono">{sub}</span>
    </motion.div>
  );
}

function VerkLanding() {
  const [ready, setReady] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [tIndex, setTIndex] = useState(0);
  const [tDir, setTDir] = useState(1);
  const [statsInView, setStatsInView] = useState(false);
  const [activeService, setActiveService] = useState<number | null>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsInView(true); },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const changeTestimonial = (dir: number) => {
    setTDir(dir);
    setTIndex((i) => (i + dir + testimonials.length) % testimonials.length);
  };

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
          <div className="hero-glow" />

          <div
            aria-hidden
            className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
          >
            <span
              className="font-display font-light ghost-text whitespace-nowrap"
              style={{ fontSize: "clamp(200px, 38vw, 640px)", letterSpacing: "-0.05em", opacity: 0.28 }}
            >
              VERK
            </span>
          </div>

          <div className="absolute top-28 right-6 md:right-10 z-10 hidden md:flex items-center gap-2 volt-tag">
            <span className="w-1.5 h-1.5 rounded-full bg-volt availability-dot" />
            Q3 2026 Open
          </div>

          <div className="relative z-10 px-6 md:px-10 pt-32 md:pt-40 grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-6 flex items-center gap-4">
              <span className="w-10 h-px bg-stone" />
              <span className="eyebrow">Independent studio · Est. 2018</span>
            </div>
            <div className="col-span-12 md:col-span-6 md:text-right text-stone text-sm leading-relaxed max-w-md md:ml-auto">
              An independent design and build studio working with founders, museums and labels who believe craft still moves markets.
            </div>
          </div>

          <div className="relative z-10 px-6 md:px-10 pb-12 md:pb-20 mt-20 md:mt-32">
            <motion.h1
              initial="hidden"
              animate={ready ? "show" : "hidden"}
              variants={{ show: { transition: { staggerChildren: 0.11 } } }}
              className="font-display font-medium tracking-tight leading-none text-bone"
              style={{ fontSize: "clamp(64px, 11vw, 180px)" }}
            >
              {heroWords.map((w, i) => (
                <span key={i} className="inline-block overflow-hidden mr-[0.18em] align-baseline">
                  <motion.span
                    variants={{
                      hidden: { y: "115%", opacity: 0 },
                      show: {
                        y: "0%",
                        opacity: 1,
                        transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
                      },
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
                <div className="flex flex-col items-center gap-1 scroll-bounce">
                  <span className="w-px h-8 bg-stone block" />
                  <span className="w-1.5 h-1.5 rounded-full bg-volt" />
                </div>
                <span className="eyebrow">Scroll to begin</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="volt-tag hidden sm:flex">
                  <span className="w-1.5 h-1.5 rounded-full bg-volt availability-dot" />
                  Q3 2026 Open
                </div>
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-[11px] text-stone">N 38.72° / W 9.14°</span>
                  <span className="text-ghost">|</span>
                  <span className="font-mono text-[11px] text-stone">Lisbon Studio</span>
                </div>
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
        <section id="manifesto" className="relative border-t border-wire overflow-hidden">
          <div className="px-6 md:px-10 py-28 md:py-40 grid grid-cols-12 gap-6 max-w-[1440px] mx-auto">
            <div className="col-span-12 md:col-span-5 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[11px] text-stone">[ 01 ]</span>
                <span className="eyebrow">The studio</span>
              </div>
              <p
                className="font-serif italic text-bone leading-snug"
                style={{ fontSize: "clamp(13px, 1.1vw, 16px)", opacity: 0.6, maxWidth: 280 }}
              >
                Process as presence — every decision visible, every assumption named.
              </p>
            </div>

            <div className="col-span-12 md:col-span-7">
              <p
                className="font-display font-light text-bone tracking-tight leading-[1.05]"
                style={{ fontSize: "clamp(28px, 3.5vw, 52px)" }}
              >
                We are not a full-service agency. We are a small, focused practice that does one thing:{" "}
                <span className="text-volt italic font-serif">bring hard ideas into clear form.</span>
              </p>
              <p className="text-stone text-base leading-relaxed mt-8 max-w-lg">
                We design for longevity. <span className="text-bone/70">Clarity first,</span>{" "}
                <span className="text-bone/70">craft always,</span> built to outlast the trend cycle.
              </p>

              <Link
                to="/about"
                className="inline-flex items-center gap-3 mt-12 group eyebrow text-bone border-b border-wire pb-2 hover:border-volt hover:text-volt transition-colors"
              >
                <span className="w-10 h-px bg-current transition-all group-hover:w-16" />
                About the studio
                <span className="text-base group-hover:translate-x-1 transition-transform">↗</span>
              </Link>
            </div>
          </div>

          <span
            aria-hidden
            className="absolute right-0 bottom-0 font-display font-extralight ghost-text pointer-events-none select-none leading-none"
            style={{ fontSize: "clamp(180px, 24vw, 360px)", opacity: 0.3 }}
          >
            01
          </span>
        </section>

        {/* ───────────── STATS STRIP ───────────── */}
        <section className="border-t border-wire bg-void/30">
          <div
            ref={statsRef}
            className="px-6 md:px-10 py-20 md:py-28 max-w-[1440px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6"
          >
            {stats.map((s) => (
              <StatCard key={s.label} {...s} inView={statsInView} />
            ))}
          </div>
        </section>

        {/* ───────────── SERVICES ───────────── */}
        <section id="services" className="border-t border-wire">
          <div className="px-6 md:px-10 pt-24 md:pt-32 pb-4 grid grid-cols-12 gap-6 max-w-[1440px] mx-auto">
            <div className="col-span-6 md:col-span-4 flex items-center gap-3">
              <span className="font-mono text-[11px] text-stone">[ 02 ]</span>
              <span className="eyebrow">What we do</span>
            </div>
            <div className="col-span-6 md:col-span-8 flex justify-end">
              <span className="eyebrow text-stone">4 disciplines</span>
            </div>
          </div>

          <div className="max-w-[1440px] mx-auto px-2 md:px-6 pb-10">
            {services.map((s, i) => (
              <div
                key={s.n}
                className="service-row group border-t border-wire cursor-pointer"
                onMouseEnter={() => setActiveService(i)}
                onMouseLeave={() => setActiveService(null)}
              >
                <Link
                  to="/about"
                  data-magnetic
                  className="grid grid-cols-[40px_1fr_auto] md:grid-cols-[60px_1.4fr_1.2fr_1fr_60px] items-center gap-4 px-4 py-8 md:py-11 transition-colors"
                >
                  <span className="font-mono text-[11px] text-ghost group-hover:text-volt transition-colors duration-300">
                    {s.n}
                  </span>
                  <span
                    className="font-display font-light text-bone group-hover:text-volt transition-all duration-400 group-hover:pl-3 tracking-tight"
                    style={{ fontSize: "clamp(24px, 3vw, 44px)", lineHeight: "1" }}
                  >
                    {s.name}
                  </span>
                  <span className="hidden md:inline-block text-sm text-stone group-hover:text-bone transition-colors">{s.tags}</span>
                  <span className="hidden md:inline-block text-sm text-stone italic font-serif max-w-xs group-hover:text-bone/80 transition-colors">{s.note}</span>
                  <span className="text-stone text-right text-lg group-hover:text-volt group-hover:translate-x-1.5 transition-all duration-300">→</span>
                </Link>
                <div
                  className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    activeService === i ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-4 md:px-4 pb-6 pl-[56px] md:pl-[76px]">
                    <p className="text-stone text-sm leading-relaxed max-w-lg border-l border-volt/40 pl-4">
                      {s.detail}
                    </p>
                  </div>
                </div>
              </div>
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
              <Link
                to="/journal"
                className="eyebrow text-stone hover:text-bone transition-colors border-b border-wire pb-1 hover:border-volt flex items-center gap-2 group"
              >
                View archive
                <span className="group-hover:translate-x-1 transition-transform">↗</span>
              </Link>
            </div>
          </div>
          <div className="max-w-[1440px] mx-auto">
            <WorkList />
          </div>
        </section>

        {/* ───────────── TESTIMONIALS ───────────── */}
        <section className="border-t border-wire overflow-hidden">
          <div className="px-6 md:px-10 pt-24 md:pt-32 pb-28 md:pb-40 max-w-[1440px] mx-auto">
            <div className="grid grid-cols-12 gap-6 mb-16">
              <div className="col-span-6 flex items-center gap-3">
                <span className="font-mono text-[11px] text-stone">[ 04 ]</span>
                <span className="eyebrow">Client words</span>
              </div>
              <div className="col-span-6 flex justify-end items-center gap-6">
                <button
                  onClick={() => changeTestimonial(-1)}
                  className="w-9 h-9 rounded-full border border-wire flex items-center justify-center text-stone hover:text-volt hover:border-volt transition-colors text-sm"
                >
                  ←
                </button>
                <span className="font-mono text-stone text-xs tracking-widest tabular">
                  {String(tIndex + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
                </span>
                <button
                  onClick={() => changeTestimonial(1)}
                  className="w-9 h-9 rounded-full border border-wire flex items-center justify-center text-stone hover:text-volt hover:border-volt transition-colors text-sm"
                >
                  →
                </button>
              </div>
            </div>

            <AnimatePresence mode="wait" custom={tDir}>
              <motion.div
                key={tIndex}
                custom={tDir}
                initial={{ opacity: 0, x: tDir * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: tDir * -40 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="testimonial-card p-8 md:p-14 grid grid-cols-1 md:grid-cols-[1fr_280px] gap-10 md:gap-16 items-end"
              >
                <div>
                  <span className="text-volt text-4xl font-serif leading-none select-none">"</span>
                  <p
                    className="font-serif italic text-bone mt-4 leading-snug"
                    style={{ fontSize: "clamp(22px, 2.8vw, 42px)", lineHeight: "1.2" }}
                  >
                    {t.quote}
                    <span className="text-volt">"</span>
                  </p>
                </div>

                <div className="flex flex-col gap-6 md:border-l md:border-wire md:pl-10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full border border-wire bg-surface flex items-center justify-center text-volt text-xs font-medium tracking-wider font-mono flex-shrink-0">
                      {t.init}
                    </div>
                    <div>
                      <p className="text-bone text-sm font-medium">{t.name}</p>
                      <p className="text-stone text-xs eyebrow mt-1">{t.role}</p>
                    </div>
                  </div>
                  <div className="volt-tag self-start">{t.project}</div>
                  <div className="flex gap-1.5 mt-auto">
                    {testimonials.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => { setTDir(i > tIndex ? 1 : -1); setTIndex(i); }}
                        className={`h-px transition-all duration-300 ${
                          i === tIndex ? "w-8 bg-volt" : "w-3 bg-wire hover:bg-stone"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* ───────────── CTA ───────────── */}
        <section id="contact" className="relative py-40 md:py-64 px-6 md:px-10 border-t border-wire overflow-hidden">
          <span
            aria-hidden
            className="absolute inset-x-0 top-0 font-display font-extralight ghost-text pointer-events-none select-none text-center leading-none"
            style={{ fontSize: "clamp(240px, 42vw, 720px)", opacity: 0.2 }}
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
              className="eyebrow text-stone hover:text-volt transition-colors mt-10 inline-flex items-center gap-2 group"
            >
              or hello@verk.studio
              <span className="group-hover:translate-x-0.5 transition-transform">↗</span>
            </a>
          </div>
        </section>

        {/* ───────────── FOOTER ───────────── */}
        <footer className="border-t border-wire px-6 md:px-10 pt-20 pb-10 bg-void relative overflow-hidden">
          <div
            aria-hidden
            className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none select-none"
          >
            <span
              className="font-display font-extralight footer-wordmark block text-center leading-[0.85]"
              style={{ fontSize: "clamp(120px, 22vw, 320px)", letterSpacing: "-0.04em" }}
            >
              VERK
            </span>
          </div>

          <div className="relative max-w-[1440px] mx-auto grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-5">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-volt rounded-full availability-dot" />
                <span className="font-display text-2xl text-bone">Verk<span className="text-volt">.</span></span>
              </div>
              <p
                className="font-serif italic text-bone mt-6 max-w-md"
                style={{ fontSize: "clamp(20px, 2vw, 28px)", lineHeight: "1.25" }}
              >
                Building experiences that earn their attention.
              </p>
              <div className="mt-8 flex items-center gap-3">
                <div className="volt-tag">
                  <span className="w-1.5 h-1.5 rounded-full bg-volt availability-dot" />
                  Available Q3 2026
                </div>
              </div>
            </div>

            <div className="col-span-6 md:col-span-3 md:col-start-7">
              <p className="eyebrow mb-5">Studio</p>
              <ul className="flex flex-col gap-3 text-bone text-sm">
                <li><Link to="/about" className="hover:text-volt transition-colors hover-underline inline-block">About</Link></li>
                <li><Link to="/" hash="services" className="hover:text-volt transition-colors hover-underline inline-block">Services</Link></li>
                <li><Link to="/" hash="work" className="hover:text-volt transition-colors hover-underline inline-block">Selected work</Link></li>
                <li><Link to="/journal" className="hover:text-volt transition-colors hover-underline inline-block">Journal</Link></li>
              </ul>
            </div>

            <div className="col-span-6 md:col-span-2">
              <p className="eyebrow mb-5">Elsewhere</p>
              <ul className="flex flex-col gap-3 text-bone text-sm">
                <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-volt transition-colors inline-flex items-center gap-1 group">Instagram <span className="text-stone group-hover:text-volt">↗</span></a></li>
                <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-volt transition-colors inline-flex items-center gap-1 group">LinkedIn <span className="text-stone group-hover:text-volt">↗</span></a></li>
                <li><a href="https://dribbble.com" target="_blank" rel="noopener noreferrer" className="hover:text-volt transition-colors inline-flex items-center gap-1 group">Dribbble <span className="text-stone group-hover:text-volt">↗</span></a></li>
                <li><a href="https://are.na" target="_blank" rel="noopener noreferrer" className="hover:text-volt transition-colors inline-flex items-center gap-1 group">Are.na <span className="text-stone group-hover:text-volt">↗</span></a></li>
              </ul>
            </div>

            <div className="col-span-12 md:col-span-2">
              <p className="eyebrow mb-5">Contact</p>
              <a
                href="mailto:hello@verk.studio"
                className="font-serif italic text-bone text-lg hover:text-volt transition-colors block"
              >
                hello@verk.studio
              </a>
              <p className="text-stone text-xs mt-4 leading-relaxed font-mono">
                Lisbon<br />Berlin<br />São Paulo
              </p>
            </div>
          </div>

          <div className="relative max-w-[1440px] mx-auto mt-16 pt-6 border-t border-wire flex items-center justify-between flex-wrap gap-4 text-xs text-stone font-mono">
            <span>© MMXXVI · Verk Studio Lda.</span>
            <span className="eyebrow hidden md:inline">Rua dos Anjos · Lisboa · PT</span>
            <div className="flex items-center gap-4">
              <span className="hover:text-volt transition-colors cursor-pointer">Privacy</span>
              <span className="hover:text-volt transition-colors cursor-pointer">Terms</span>
              <span className="hover:text-volt transition-colors cursor-pointer">Cookies</span>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
