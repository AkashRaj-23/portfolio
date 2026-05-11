import certs from "@/data/certificates.json";
import type { Certificate } from "@/data/types";
import { SectionHeader } from "./About";
import { Award, Download, Eye, Lock } from "lucide-react";

const BASE = import.meta.env.BASE_URL;
const LIST = certs.certificates as Certificate[];

export default function Certificates() {
  return (
    <section id="certificates" className="relative py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <SectionHeader eyebrow="// 04 — certificates" title="Credentials & training" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
          {LIST.map((c) => {
            const url = c.file ? `${BASE}${c.file.replace(/^\//, "")}` : null;
            return (
              <div key={c.id} className="glass glow-hover rounded-2xl p-5 flex flex-col">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center glow-primary shrink-0">
                    <Award size={18} className="text-white" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-display font-semibold text-sm leading-snug">{c.title}</h3>
                    <p className="font-mono text-[11px] uppercase tracking-widest text-primary/90 mt-1">{c.issuer}</p>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {url ? (
                    <>
                      <a href={url} target="_blank" rel="noopener noreferrer" className="btn-ghost-glass rounded-lg px-3 py-1.5 text-xs inline-flex items-center gap-1.5">
                        <Eye size={13} /> View
                      </a>
                      <a href={url} download className="btn-primary rounded-lg px-3 py-1.5 text-xs inline-flex items-center gap-1.5">
                        <Download size={13} /> Download
                      </a>
                    </>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground px-3 py-1.5 rounded-lg bg-muted/30 border border-border/60">
                      <Lock size={12} /> Certificate on Request
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
