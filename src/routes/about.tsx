import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Cursor } from "@/components/verk/Cursor";
import { Nav } from "@/components/verk/Nav";
import { FullscreenMenu } from "@/components/verk/FullscreenMenu";
import { useState } from "react";

export const Route = createFileRoute("/about")({ component: AboutPage });

const values = [
  {
    n: "01",
    title: "Process as presence",
    body: "Every decision is documented. Every assumption is named. We share our work-in-progress with clients not as a courtesy, but because the dialogue is where the best ideas appear.",
  },
  {
    n: "02",
    title: "Craft without compromise",
    body: "We turn down work when timelines make quality impossible. A rushed project damages everyone — the client, the end user, and our own standard of practice.",
  },
  {
    n: "03",
    title: "Small on purpose",
    body: "We are not trying to grow into an agency. The studio is deliberately small so that every project receives the founding partners' direct attention.",
  },
  {
    n: "04",
    title: "Longevity over trend",
    body: "We design for the version of your brand that exists in five years, not five months. Timeless is not conservative — it is disciplined.",
  },
];

const team = [
  {
    name: "Elsa Vinter",
    role: "Founding Partner, Creative Director",
    bio: "Previously at Pentagram Berlin and Wolff Olins. Focused on brand systems and editorial design.",
    init: "EV",
  },
  {
    name: "Marco Siena",
    role: "Founding Partner, Technology Director",
    bio: "Ex-IDEO and Vercel. Leads web, motion, and build across all projects.",
    init: "MS",
  },
  {
    name: "Anya Lindqvist",
    role: "Senior Designer",
    bio: "Specialises in motion and 3D. Six years at MPC before joining Verk in 2022.",
    init: "AL",
  },
];

export default function AboutPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <Cursor />
      <div className="noise-overlay" />
      <Nav onMenu={() => setMenuOpen(true)} />
      <FullscreenMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

      <main className="bg-abyss text-bone selection:bg-volt selection:text-abyss">
        {/* Hero */}
        <section className="relative min-h-[60vh] flex flex-col justify-end border-b border-wire overflow-hidden">
          <div
            aria-hidden
            className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
          >
            <span
              className="font-display font-light ghost-text whitespace-nowrap"
              style={{ fontSize: "clamp(160px, 28vw, 480px)", letterSpacing: "-0.05em", opacity: 0.22 }}
            >
              STUDIO
            </span>
          </div>

          <div className="relative z-10 px-6 md:px-10 pb-16 pt-36">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="eyebrow text-stone flex items-center gap-3 mb-6">
                <span className="w-8 h-px bg-stone" />
                About
              </span>
              <h1
                className="font-display font-medium text-bone tracking-tight leading-none"
                style={{ fontSize: "clamp(48px, 8vw, 120px)" }}
              >
                We are a small<br />
                studio with a<br />
                large <span className="italic font-serif text-volt">opinion.</span>
              </h1>
            </motion.div>
          </div>
        </section>

        {/* Intro */}
        <section className="px-6 md:px-10 py-24 md:py-36 border-b border-wire section-fade-top">
          <div className="max-w-[1440px] mx-auto grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-4">
              <span className="eyebrow">[ 01 ] — Who we are</span>
            </div>
            <div className="col-span-12 md:col-span-7 md:col-start-6">
              <p
                className="font-display font-light text-bone tracking-tight leading-[1.1]"
                style={{ fontSize: "clamp(24px, 2.8vw, 44px)" }}
              >
                Verk is an independent creative studio founded in Lisbon in 2018. We design brand identities, websites, and motion for founders, cultural institutions, and ambitious companies.
              </p>
              <p className="text-stone text-base leading-relaxed mt-8 max-w-xl">
                The name is Swedish for <span className="text-bone italic font-serif">work</span>. It reflects our belief that rigorous process — not aesthetic instinct alone — is what produces lasting creative output.
              </p>
              <p className="text-stone text-base leading-relaxed mt-4 max-w-xl">
                We are headquartered in Lisbon, with permanent presences in Berlin and São Paulo. We work with clients across Europe, North America, and Latin America.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="border-b border-wire section-fade-top">
          <div className="px-6 md:px-10 pt-24 md:pt-32 pb-4 grid grid-cols-12 gap-6 max-w-[1440px] mx-auto">
            <div className="col-span-12 flex items-center gap-3">
              <span className="eyebrow">[ 02 ] — How we work</span>
            </div>
          </div>
          <div className="max-w-[1440px] mx-auto px-4 md:px-8 pb-16">
            {values.map((v) => (
              <div
                key={v.n}
                className="grid grid-cols-[40px_1fr] md:grid-cols-[60px_1.2fr_1fr] gap-4 md:gap-6 border-t border-wire px-2 py-10 md:py-12 group hover:bg-void/30 transition-colors"
              >
                <span className="font-mono text-[11px] text-ghost mt-1">{v.n}</span>
                <h3
                  className="font-display font-light text-bone tracking-tight"
                  style={{ fontSize: "clamp(20px, 2.2vw, 34px)", lineHeight: "1.1" }}
                >
                  {v.title}
                </h3>
                <p className="text-stone text-sm leading-relaxed md:pt-1 col-span-2 md:col-span-1">{v.body}</p>
              </div>
            ))}
            <div className="border-t border-wire" />
          </div>
        </section>

        {/* Team */}
        <section className="px-6 md:px-10 py-24 md:py-36 border-b border-wire section-fade-top">
          <div className="max-w-[1440px] mx-auto">
            <span className="eyebrow mb-14 block">[ 03 ] — The people</span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {team.map((p) => (
                <motion.div
                  key={p.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="border border-wire p-8 bg-surface/40 flex flex-col gap-4 hover:border-volt/40 transition-colors"
                >
                  <div className="w-14 h-14 rounded-full bg-lift border border-wire flex items-center justify-center font-mono text-volt text-sm">
                    {p.init}
                  </div>
                  <div>
                    <p className="text-bone font-medium">{p.name}</p>
                    <p className="eyebrow mt-1">{p.role}</p>
                  </div>
                  <p className="text-stone text-sm leading-relaxed">{p.bio}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 md:px-10 py-24 md:py-32 border-b border-wire section-fade-top">
          <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
            <p
              className="font-display font-light text-bone tracking-tight leading-none"
              style={{ fontSize: "clamp(32px, 5vw, 72px)" }}
            >
              Ready to start<br />something <span className="text-volt italic font-serif">new?</span>
            </p>
            <Link
              to="/"
              hash="contact"
              className="inline-flex items-center gap-4 bg-volt text-abyss px-8 py-5 group hover:gap-6 transition-all"
            >
              <span className="font-display text-sm font-medium tracking-wide uppercase">Get in touch</span>
              <span className="text-xl">↗</span>
            </Link>
          </div>
        </section>

        {/* Footer mini */}
        <footer className="border-t border-wire px-6 md:px-10 py-8 flex items-center justify-between gap-4 flex-wrap bg-void">
          <Link to="/" className="eyebrow text-stone hover:text-volt transition-colors">← Back to home</Link>
          <span className="eyebrow">Verk® — Est. 2018</span>
        </footer>
      </main>
    </>
  );
}
