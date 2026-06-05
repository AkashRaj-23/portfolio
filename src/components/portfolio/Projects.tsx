import { useState } from "react";
import { SectionHeader } from "./About";
import projects from "@/data/projects.json";
import { X, Star, Calendar, Tag, Sparkles, ExternalLink, ChevronLeft, ChevronRight, Maximize2, Github, PlayCircle } from "lucide-react";

type Project = (typeof projects)[number];

export function Projects() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative py-24 md:py-32">
      <div className="container mx-auto px-4">
        <SectionHeader
          eyebrow="// 03 · PROJECTS"
          title={<>Real systems. <span className="text-gradient">Real impact.</span></>}
          sub="Robotics, embedded safety, AI integration — built end-to-end and demonstrated in the wild."
        />

        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setActive(p)}
              className={`group text-left relative rounded-3xl glass p-6 hover:border-primary/60 transition-all overflow-hidden ${
                p.featured ? "lg:col-span-2 lg:row-span-1" : ""
              }`}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="absolute -top-20 -right-20 size-56 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/30 transition-colors" />
              <div className="relative">
                <div className="flex items-start justify-between gap-3">
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-mono px-2 py-1 rounded-full bg-secondary/60 border border-border">
                    <Tag className="size-3" /> {p.category}
                  </span>
                  {p.featured && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-1 rounded-full bg-primary/20 text-primary-glow border border-primary/40">
                      <Star className="size-3" /> FEATURED PROJECT
                    </span>
                  )}
                </div>

                <h3 className="text-2xl font-semibold mt-4 group-hover:text-gradient transition-all">
                  {p.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{p.tagline}</p>

                <div className="flex flex-wrap gap-1.5 mt-5">
                  {p.tech.slice(0, 5).map((t) => (
                    <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-background/60 border border-border">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
                  <span className="flex items-center gap-1 text-xs text-muted-foreground font-mono">
                    <Calendar className="size-3" /> {p.year}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-primary-glow font-mono group-hover:gap-2 transition-all">
                    View case study <ExternalLink className="size-3" />
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {active && <ProjectModal project={active} onClose={() => setActive(null)} />}
    </section>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const base = import.meta.env.BASE_URL;
  const images = (project.images ?? []) as string[];
  const [idx, setIdx] = useState(0);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const links = (project as any).links ?? {};

  const next = () => setIdx((i) => (i + 1) % images.length);
  const prev = () => setIdx((i) => (i - 1 + images.length) % images.length);

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto glass-strong rounded-3xl p-6 md:p-8 glow-strong"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 size-10 grid place-items-center rounded-full glass hover:bg-destructive/20"
          aria-label="Close"
        >
          <X className="size-4" />
        </button>

        <div className="flex items-center gap-2 text-xs font-mono text-primary-glow mb-2">
          <Sparkles className="size-3" /> {project.category} · {project.year}
        </div>
        <h3 className="text-3xl md:text-4xl font-bold leading-tight">{project.title}</h3>
        <p className="text-muted-foreground mt-3 text-base md:text-lg">{project.description}</p>

        {/* Image carousel */}
        {images.length > 0 && (
          <div className="mt-6 relative rounded-2xl overflow-hidden border border-border bg-background/40 group">
            <img
              src={`${base}${images[idx]}`}
              alt={`${project.title} screenshot ${idx + 1}`}
              loading="lazy"
              className="w-full aspect-video object-cover"
            />
            <button
              onClick={() => setLightbox(images[idx])}
              className="absolute top-3 right-3 size-9 grid place-items-center rounded-full glass-strong opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary/20"
              aria-label="Fullscreen"
            >
              <Maximize2 className="size-4" />
            </button>
            {images.length > 1 && (
              <>
                <button
                  onClick={prev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 size-9 grid place-items-center rounded-full glass-strong hover:bg-primary/20"
                  aria-label="Previous"
                >
                  <ChevronLeft className="size-4" />
                </button>
                <button
                  onClick={next}
                  className="absolute right-3 top-1/2 -translate-y-1/2 size-9 grid place-items-center rounded-full glass-strong hover:bg-primary/20"
                  aria-label="Next"
                >
                  <ChevronRight className="size-4" />
                </button>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setIdx(i)}
                      className={`h-1.5 rounded-full transition-all ${i === idx ? "w-6 bg-primary-glow" : "w-1.5 bg-white/40 hover:bg-white/70"}`}
                      aria-label={`Slide ${i + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* Video */}
        {project.video && (
          <div className="mt-4 rounded-2xl overflow-hidden border border-border aspect-video bg-background/40">
            <video
              src={`${base}${project.video}`}
              controls
              poster={images[0] ? `${base}${images[0]}` : undefined}
              className="w-full h-full"
            />
          </div>
        )}

        <div className="mt-8">
          <h4 className="text-sm font-mono text-primary-glow uppercase tracking-widest">Features</h4>
          <ul className="mt-3 grid sm:grid-cols-2 gap-2">
            {project.features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm">
                <span className="mt-1.5 size-1.5 rounded-full bg-primary-glow shrink-0" />
                <span className="text-muted-foreground">{f}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6">
          <h4 className="text-sm font-mono text-primary-glow uppercase tracking-widest">Tech Stack</h4>
          <div className="flex flex-wrap gap-2 mt-3">
            {project.tech.map((t) => (
              <span key={t} className="px-3 py-1 rounded-full text-xs font-mono bg-secondary/60 border border-border">
                {t}
              </span>
            ))}
          </div>
        </div>

        {(links.github || links.demo) && (
          <div className="mt-8 flex flex-wrap gap-3">
            {links.github && (
              <a
                href={links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-strong hover:bg-primary/10 transition-colors text-sm font-medium"
              >
                <Github className="size-4" /> Source
              </a>
            )}
            {links.demo && (
              <a
                href={links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary to-primary-glow text-primary-foreground text-sm font-medium hover:shadow-[0_0_30px_oklch(0.68_0.22_295/0.6)] transition-shadow"
              >
                <PlayCircle className="size-4" /> Live demo
              </a>
            )}
          </div>
        )}
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-[90] grid place-items-center bg-background/95 backdrop-blur-xl p-6 animate-fade-in"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 size-10 grid place-items-center rounded-full glass-strong hover:bg-destructive/20"
            aria-label="Close fullscreen"
          >
            <X className="size-4" />
          </button>
          <img
            src={`${base}${lightbox}`}
            alt=""
            className="max-w-full max-h-[90vh] rounded-2xl border border-border"
          />
        </div>
      )}
    </div>
  );
}
