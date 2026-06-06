import certificates from "@/data/certificates.json";
import { SectionHeader } from "./About";
import { FileCheck, Download, ExternalLink } from "lucide-react";

const COLORS: Record<string, string> = {
  NPTEL: "text-cyan border-cyan/40",
  Internship: "text-primary-glow border-primary/40",
  Workshop: "text-yellow-300 border-yellow-400/40",
  Conference: "text-pink-300 border-pink-400/40",
};

export function Certifications() {
  const base = import.meta.env.BASE_URL;
  return (
    <section id="certifications" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeader
          eyebrow="// 05 · CERTIFICATIONS"
          title={<>Continually <span className="text-gradient-cyber">leveling up</span>.</>}
          sub="Industry workshops, NPTEL coursework, and hands-on internships."
        />

        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {certificates.map((c, i) => (
            <div
              key={i}
              className="group glass rounded-2xl p-5 hover:border-primary/60 transition-all relative overflow-hidden flex flex-col"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-primary/10 to-transparent transition-opacity" />
              <div className="relative flex-1 flex flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div className="size-11 grid place-items-center rounded-xl bg-secondary/60 border border-border">
                    <FileCheck className="size-5 text-primary-glow" />
                  </div>
                  <span className={`text-[10px] font-mono px-2 py-1 rounded-full border ${COLORS[c.category] || "border-border"}`}>
                    {c.category}
                  </span>
                </div>
                <h3 className="font-semibold mt-4 leading-snug">{c.title}</h3>
                <p className="text-sm text-muted-foreground mt-1 flex-1">{c.issuer}</p>

                <div className="mt-5 pt-4 border-t border-border flex items-center justify-between gap-2">
                  {c.file ? (
                    <>
                      <a
                        href={`${base}${c.file}`}
                        download
                        className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-full bg-gradient-to-r from-primary to-primary-glow text-primary-foreground hover:shadow-[0_0_24px_oklch(0.68_0.22_295/0.6)] transition-shadow"
                      >
                        <Download className="size-3" /> Download
                      </a>
                      <a
                        href={`${base}${c.file}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-mono text-muted-foreground hover:text-primary-glow transition-colors"
                      >
                        <ExternalLink className="size-3" /> View
                      </a>
                    </>
                  ) : (
                    <span className="text-[10px] font-mono text-muted-foreground/70 uppercase tracking-widest">
                      Certificate on request
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-xs font-mono text-muted-foreground/70">
          Drop PDFs into <span className="text-primary-glow">public/certificates/</span> and reference them in <span className="text-primary-glow">src/data/certificates.json</span>.
        </p>
      </div>
    </section>
  );
}
