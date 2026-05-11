import { useState } from "react";
import projectsData from "@/data/projects.json";
import type { Project } from "@/data/types";
import { SectionHeader } from "./About";
import { Sparkles, X, Github, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const PROJECTS = projectsData.projects as Project[];

const BASE = import.meta.env.BASE_URL;

export default function Projects() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <SectionHeader eyebrow="// 03 — projects" title="Selected work" subtitle="Real systems, shipped end-to-end." />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
          {PROJECTS.map((p) => (
            <button
              key={p.id}
              onClick={() => setActive(p)}
              className="glass glow-hover rounded-2xl p-6 text-left relative overflow-hidden group"
            >
              {p.featured && (
                <div className="absolute top-3 right-3 inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full bg-gradient-to-r from-primary to-accent text-white glow-primary">
                  <Sparkles size={10} /> Featured
                </div>
              )}
              <div className="font-mono text-[11px] uppercase tracking-widest text-primary mb-2">
                Project // {p.id}
              </div>
              <h3 className="font-display font-bold text-xl">{p.title}</h3>
              <p className="mt-1 text-sm text-foreground/70">{p.tagline}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.tech.slice(0, 4).map((t) => (
                  <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-primary/10 border border-primary/20">
                    {t}
                  </span>
                ))}
                {p.tech.length > 4 && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-muted/40">+{p.tech.length - 4}</span>
                )}
              </div>
              <div className="mt-5 text-xs text-primary/90 font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                view details →
              </div>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && <ProjectModal project={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const [idx, setIdx] = useState(0);
  const hasImages = project.images && project.images.length > 0;
  const hasVideo = !!project.video;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[80] bg-background/80 backdrop-blur-md flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="glass-strong relative w-full max-w-3xl max-h-[88vh] overflow-y-auto rounded-2xl p-6 sm:p-8"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 btn-ghost-glass rounded-full p-2"
          aria-label="Close"
        >
          <X size={18} />
        </button>
        {project.featured && (
          <div className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full bg-gradient-to-r from-primary to-accent text-white mb-3">
            <Sparkles size={10} /> Featured Project
          </div>
        )}
        <h3 className="font-display font-bold text-2xl sm:text-3xl text-gradient">{project.title}</h3>
        <p className="text-foreground/70 mt-1">{project.tagline}</p>

        {hasImages && (
          <div className="mt-5 relative rounded-xl overflow-hidden border border-border/60">
            <img
              src={`${BASE}${project.images[idx].replace(/^\//, "")}`}
              alt={project.title}
              className="w-full h-64 sm:h-80 object-cover bg-muted"
            />
            {project.images.length > 1 && (
              <>
                <button
                  onClick={() => setIdx((i) => (i - 1 + project.images.length) % project.images.length)}
                  className="absolute left-2 top-1/2 -translate-y-1/2 btn-ghost-glass rounded-full p-2"
                  aria-label="Previous"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={() => setIdx((i) => (i + 1) % project.images.length)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 btn-ghost-glass rounded-full p-2"
                  aria-label="Next"
                >
                  <ChevronRight size={18} />
                </button>
              </>
            )}
          </div>
        )}

        {hasVideo && (
          <div className="mt-5 rounded-xl overflow-hidden border border-border/60">
            <video src={`${BASE}${project.video!.replace(/^\//, "")}`} controls className="w-full" />
          </div>
        )}

        <p className="mt-5 text-foreground/85 leading-relaxed">{project.description}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span key={t} className="text-xs font-mono px-2.5 py-1 rounded-md bg-primary/10 border border-primary/25">
              {t}
            </span>
          ))}
        </div>

        {(project.github || project.demo) && (
          <div className="mt-6 flex flex-wrap gap-3">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-ghost-glass rounded-lg px-4 py-2 text-sm inline-flex items-center gap-2">
                <Github size={16} /> GitHub
              </a>
            )}
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn-primary rounded-lg px-4 py-2 text-sm inline-flex items-center gap-2">
                <ExternalLink size={16} /> Live Demo
              </a>
            )}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
