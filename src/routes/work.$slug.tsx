import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Cursor } from "@/components/verk/Cursor";
import { Nav } from "@/components/verk/Nav";
import { FullscreenMenu } from "@/components/verk/FullscreenMenu";
import { useState } from "react";
import { getProject, projects } from "@/lib/projects";

export const Route = createFileRoute("/work/$slug")({
  component: CaseStudyPage,
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
});

function CaseStudyPage() {
  const { project } = Route.useLoaderData();
  const [menuOpen, setMenuOpen] = useState(false);

  const currentIndex = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(currentIndex + 1) % projects.length];
  const prev = projects[(currentIndex - 1 + projects.length) % projects.length];

  return (
    <>
      <Cursor />
      <div className="noise-overlay" />
      <Nav onMenu={() => setMenuOpen(true)} />
      <FullscreenMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

      <main className="bg-abyss text-bone selection:bg-volt selection:text-abyss">
        {/* Hero */}
        <section className="relative min-h-[70vh] flex flex-col justify-end border-b border-wire overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-abyss via-abyss/60 to-transparent" />

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 px-6 md:px-10 pb-16 pt-36"
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="font-mono text-[11px] text-stone">{project.index}</span>
              <span className="w-px h-3 bg-wire" />
              <span className="eyebrow">{project.category}</span>
              <span className="w-px h-3 bg-wire" />
              <span className="eyebrow">{project.year}</span>
            </div>
            <h1
              className="font-display font-medium text-bone tracking-tight leading-none"
              style={{ fontSize: "clamp(48px, 9vw, 140px)" }}
            >
              {project.title}
            </h1>
            <p className="text-stone text-lg mt-4 max-w-lg leading-relaxed">{project.client}</p>
          </motion.div>
        </section>

        {/* Tags */}
        <section className="border-b border-wire px-6 md:px-10 py-6">
          <div className="max-w-[1440px] mx-auto flex items-center gap-3 flex-wrap">
            {project.tags.map((tag) => (
              <span key={tag} className="volt-tag">{tag}</span>
            ))}
          </div>
        </section>

        {/* Summary */}
        <section className="px-6 md:px-10 py-24 md:py-36 border-b border-wire section-fade-top">
          <div className="max-w-[1440px] mx-auto grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-4">
              <span className="eyebrow">[ Overview ]</span>
            </div>
            <div className="col-span-12 md:col-span-7 md:col-start-6">
              <p
                className="font-display font-light text-bone tracking-tight leading-[1.1]"
                style={{ fontSize: "clamp(22px, 2.4vw, 38px)" }}
              >
                {project.summary}
              </p>
            </div>
          </div>
        </section>

        {/* Three-column narrative */}
        <section className="px-6 md:px-10 py-24 border-b border-wire section-fade-top">
          <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            {[
              { label: "The challenge", body: project.challenge },
              { label: "The solution", body: project.solution },
              { label: "The outcome", body: project.outcome },
            ].map((col, i) => (
              <motion.div
                key={col.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-4"
              >
                <span className="eyebrow text-volt">{col.label}</span>
                <p className="text-stone text-sm leading-relaxed md:text-base">{col.body}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Full-bleed image */}
        <section className="border-b border-wire section-fade-top">
          <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-16">
            <img
              src={project.image}
              alt={project.title}
              className="w-full aspect-video object-cover"
            />
          </div>
        </section>

        {/* Next / Prev nav */}
        <section className="border-b border-wire">
          <div className="max-w-[1440px] mx-auto grid grid-cols-2">
            <Link
              to="/work/$slug"
              params={{ slug: prev.slug }}
              className="group px-6 md:px-10 py-12 border-r border-wire hover:bg-void/30 transition-colors flex flex-col gap-3"
            >
              <span className="eyebrow text-stone group-hover:text-volt transition-colors">← Previous</span>
              <span
                className="font-display font-light text-bone group-hover:text-volt transition-colors tracking-tight"
                style={{ fontSize: "clamp(20px, 2.5vw, 36px)" }}
              >
                {prev.title}
              </span>
            </Link>
            <Link
              to="/work/$slug"
              params={{ slug: next.slug }}
              className="group px-6 md:px-10 py-12 hover:bg-void/30 transition-colors flex flex-col gap-3 items-end text-right"
            >
              <span className="eyebrow text-stone group-hover:text-volt transition-colors">Next →</span>
              <span
                className="font-display font-light text-bone group-hover:text-volt transition-colors tracking-tight"
                style={{ fontSize: "clamp(20px, 2.5vw, 36px)" }}
              >
                {next.title}
              </span>
            </Link>
          </div>
        </section>

        <footer className="border-t border-wire px-6 md:px-10 py-8 flex items-center justify-between gap-4 flex-wrap bg-void">
          <Link to="/" className="eyebrow text-stone hover:text-volt transition-colors">← Back to home</Link>
          <Link to="/" hash="work" className="eyebrow text-stone hover:text-volt transition-colors">All work ↗</Link>
        </footer>
      </main>
    </>
  );
}
