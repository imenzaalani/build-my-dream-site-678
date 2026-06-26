import nordik from "@/assets/work-nordik.jpg";
import vault from "@/assets/work-vault.jpg";
import meridian from "@/assets/work-meridian.jpg";
import madeira from "@/assets/work-madeira.jpg";
import orbit from "@/assets/work-orbit.jpg";
import archive from "@/assets/work-archive.jpg";

export type Project = {
  slug: string;
  index: string;
  title: string;
  client: string;
  category: string;
  year: string;
  image: string;
  tags: string[];
  summary: string;
  challenge: string;
  solution: string;
  outcome: string;
};

export const projects: Project[] = [
  {
    slug: "nordik-digital",
    index: "01",
    title: "Nordik Digital",
    client: "Identity System",
    category: "Branding",
    year: "2025",
    image: nordik,
    tags: ["Brand Strategy", "Visual Identity", "Type Design", "Motion"],
    summary: "A complete identity system for a Scandinavian-rooted digital consultancy expanding into European markets.",
    challenge: "Nordik had outgrown their startup-era logo. They needed a system that felt serious enough for enterprise clients yet retained the warmth that made their team culture exceptional.",
    solution: "We built a modular identity around a custom wordmark drawn from geometric proportion, paired with a restricted palette of slate, chalk, and a single electric accent. The system scales from business cards to 40-metre exhibition walls.",
    outcome: "Launched Q1 2025. Nordik closed three enterprise contracts within 90 days of relaunch, citing brand credibility as a differentiating factor.",
  },
  {
    slug: "vault-protocol",
    index: "02",
    title: "Vault Protocol",
    client: "Product · Web",
    category: "Web Design",
    year: "2025",
    image: vault,
    tags: ["React", "Motion", "Product Design", "TanStack"],
    summary: "A high-performance product site and dashboard for a security infrastructure startup.",
    challenge: "Vault needed to communicate technical depth without alienating non-technical buyers. The product was genuinely complex — the site had to hold both audiences without talking down to either.",
    solution: "A layered information architecture: a marketing surface built for trust, a demo mode that lets buyers explore real product flows, and a developer portal with deep documentation access.",
    outcome: "Conversion from visitor to demo-request increased 3.4× versus the previous site in the first 60 days post-launch.",
  },
  {
    slug: "meridian-sound",
    index: "03",
    title: "Meridian Sound",
    client: "Brand Film",
    category: "Motion / 3D",
    year: "2024",
    image: meridian,
    tags: ["After Effects", "Blender", "Sound Design", "Brand Film"],
    summary: "A 90-second brand film and motion identity for a boutique sound studio.",
    challenge: "Communicating sound through a visual medium — without resorting to waveform clichés or stock imagery of headphones and mixing desks.",
    solution: "We treated the film as pure texture: close-up material studies, slow reveals of physical space, abstract resonance shapes rendered in Blender. The score was written after the edit, not before.",
    outcome: "Selected for the Ciclope Festival long-list. The film became Meridian's primary sales tool for high-value client outreach.",
  },
  {
    slug: "madeira-ceramica",
    index: "04",
    title: "Madeira Ceramica",
    client: "E-commerce",
    category: "Web · Branding",
    year: "2024",
    image: madeira,
    tags: ["E-commerce", "Next.js", "Brand Identity", "Photography Direction"],
    summary: "End-to-end brand and e-commerce platform for a Madeiran artisan ceramics studio.",
    challenge: "Handmade, one-of-a-kind objects are notoriously difficult to sell online. The site had to convey texture, weight, and imperfection — things that photography alone rarely captures.",
    solution: "We directed a two-day studio shoot focused on hands, material close-ups, and contextual placement. The shopping experience was designed around object stories, not SKUs.",
    outcome: "Revenue increased 280% in the first quarter. International orders now represent 60% of sales, up from 12%.",
  },
  {
    slug: "orbit-quarterly",
    index: "05",
    title: "Orbit Quarterly",
    client: "Editorial System",
    category: "Print / Digital",
    year: "2023",
    image: orbit,
    tags: ["Editorial Design", "Print", "Digital", "Type Systems"],
    summary: "An editorial identity system spanning print, digital, and social for an independent design publication.",
    challenge: "Orbit published quarterly in print but daily online. The identity had to hold across radically different cadences and media without feeling inconsistent.",
    solution: "A type-led system built on two typefaces — one for depth (long-form print), one for velocity (digital and social). Strict grid, flexible colour zones, editorial templates for 14 recurring content formats.",
    outcome: "Subscription base grew 40% in the 12 months following the redesign. The print edition sold out for the first time in the journal's history.",
  },
  {
    slug: "the-archive",
    index: "06",
    title: "The Archive",
    client: "Self-initiated",
    category: "Research",
    year: "2023",
    image: archive,
    tags: ["Research", "Interaction Design", "WebGL", "Open Source"],
    summary: "A self-initiated research project exploring spatial interfaces for long-form reading.",
    challenge: "Linear scrolling is a poor match for non-linear thought. We wanted to prototype an alternative — a reading environment that mirrors how ideas actually connect.",
    solution: "A WebGL canvas where articles exist as physical objects in space. Readers navigate by gesture, not scroll. Related content clusters automatically. The entire codebase is open source.",
    outcome: "Featured in Sidebar.io, CSS-Tricks, and Smashing Magazine. Over 2,000 GitHub stars in the first month.",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
