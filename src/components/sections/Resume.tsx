import { SectionHeader } from "./About";
import { FileText, Eye, Download } from "lucide-react";

const BASE = import.meta.env.BASE_URL;

export default function Resume() {
  const url = `${BASE}resume.pdf`;
  return (
    <section id="resume" className="relative py-24 px-4">
      <div className="container mx-auto max-w-4xl">
        <SectionHeader eyebrow="// 06 — resume" title="Resume" subtitle="The full snapshot — education, experience, projects, and contact." />
        <div className="glass-strong rounded-2xl p-8 sm:p-10 mt-12 flex flex-col sm:flex-row items-center gap-6">
          <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center glow-primary">
            <FileText size={32} className="text-white" />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h3 className="font-display font-bold text-xl">Akash Raj S K — Resume</h3>
            <p className="text-sm text-foreground/70 mt-1">PDF • Updated for the latest opportunities</p>
          </div>
          <div className="flex gap-3">
            <a href={url} target="_blank" rel="noopener noreferrer" className="btn-ghost-glass rounded-xl px-4 py-2.5 text-sm inline-flex items-center gap-2">
              <Eye size={16} /> View
            </a>
            <a href={url} download className="btn-primary rounded-xl px-4 py-2.5 text-sm inline-flex items-center gap-2">
              <Download size={16} /> Download
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
