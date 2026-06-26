import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Cursor } from "@/components/verk/Cursor";
import { Nav } from "@/components/verk/Nav";
import { FullscreenMenu } from "@/components/verk/FullscreenMenu";
import { useState } from "react";

export const Route = createFileRoute("/journal")({ component: JournalPage });

const posts = [
  {
    slug: "on-creative-briefs",
    date: "12 Jun 2026",
    category: "Process",
    title: "On creative briefs: the document that makes or breaks a project",
    excerpt:
      "Most briefs are wish lists disguised as requirements. Here is how we write briefs that actually clarify what the work needs to do.",
    readTime: "6 min",
  },
  {
    slug: "typography-for-dark-interfaces",
    date: "04 May 2026",
    category: "Craft",
    title: "Typography for dark interfaces: what changes and what doesn't",
    excerpt:
      "Dark mode is not simply inverted light mode. The mechanics of contrast, weight, and optical sizing behave differently — and most type systems ignore this.",
    readTime: "9 min",
  },
  {
    slug: "how-we-price-our-work",
    date: "18 Mar 2026",
    category: "Studio",
    title: "How we price our work (and why we publish it)",
    excerpt:
      "Pricing is a design problem. Opacity benefits the studio in the short term and harms the relationship in the long term. We prefer the inverse.",
    readTime: "7 min",
  },
  {
    slug: "motion-as-storytelling",
    date: "02 Feb 2026",
    category: "Craft",
    title: "Motion as storytelling: lessons from three years of brand film",
    excerpt:
      "A brand film that opens with a logo is a brand film nobody watches to the end. We document what we've learned about earning the audience's attention first.",
    readTime: "11 min",
  },
  {
    slug: "client-feedback-loops",
    date: "15 Jan 2026",
    category: "Process",
    title: "Structuring feedback loops that don't derail creative work",
    excerpt:
      "Unstructured feedback is the silent killer of ambitious projects. We describe the three-stage review system we've used for four years.",
    readTime: "8 min",
  },
];

export default function JournalPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <Cursor />
      <div className="noise-overlay" />
      <Nav onMenu={() => setMenuOpen(true)} />
      <FullscreenMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

      <main className="bg-abyss text-bone selection:bg-volt selection:text-abyss">
        {/* Hero */}
        <section className="relative border-b border-wire overflow-hidden">
          <div
            aria-hidden
            className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
          >
            <span
              className="font-display font-light ghost-text whitespace-nowrap"
              style={{ fontSize: "clamp(140px, 24vw, 400px)", letterSpacing: "-0.05em", opacity: 0.2 }}
            >
              WORDS
            </span>
          </div>
          <div className="relative z-10 px-6 md:px-10 pt-36 pb-16">
            <span className="eyebrow text-stone flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-stone" />
              Journal
            </span>
            <h1
              className="font-display font-medium text-bone tracking-tight leading-none"
              style={{ fontSize: "clamp(48px, 8vw, 120px)" }}
            >
              Writing about<br />
              <span className="italic font-serif text-volt">process.</span>
            </h1>
          </div>
        </section>

        {/* Posts */}
        <section className="max-w-[1440px] mx-auto px-4 md:px-8 pb-24">
          {posts.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
            >
              <a
                href="#"
                className="group grid grid-cols-1 md:grid-cols-[1fr_200px] gap-4 items-start border-t border-wire px-2 py-10 md:py-12 hover:bg-void/30 transition-colors"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-4">
                    <span className="volt-tag">{post.category}</span>
                    <span className="font-mono text-[11px] text-stone">{post.date}</span>
                  </div>
                  <h2
                    className="font-display font-light text-bone tracking-tight group-hover:text-volt transition-colors leading-tight"
                    style={{ fontSize: "clamp(20px, 2.2vw, 32px)" }}
                  >
                    {post.title}
                  </h2>
                  <p className="text-stone text-sm leading-relaxed max-w-2xl">{post.excerpt}</p>
                </div>
                <div className="flex md:flex-col md:items-end justify-between md:justify-start gap-3 md:gap-4">
                  <span className="font-mono text-[11px] text-stone">{post.readTime} read</span>
                  <span className="eyebrow text-stone group-hover:text-volt transition-colors">Read ↗</span>
                </div>
              </a>
            </motion.article>
          ))}
          <div className="border-t border-wire" />
        </section>

        <footer className="border-t border-wire px-6 md:px-10 py-8 flex items-center justify-between gap-4 flex-wrap bg-void">
          <Link to="/" className="eyebrow text-stone hover:text-volt transition-colors">← Back to home</Link>
          <span className="eyebrow">Verk® — Journal</span>
        </footer>
      </main>
    </>
  );
}
