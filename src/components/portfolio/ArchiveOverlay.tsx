import { useEffect, useState } from "react";
import certificates from "@/data/certificates.json";
import { X, Download, ExternalLink, FileCheck, Trophy, Briefcase, Wrench, GraduationCap, Mic } from "lucide-react";

type Cert = { title: string; issuer: string; category: string; date?: string; file?: string | null };

const CATEGORIES: { key: string; label: string; icon: any }[] = [
  { key: "Competitions", label: "Competitions & Hackathons", icon: Trophy },
  { key: "Internships", label: "Internships", icon: Briefcase },
  { key: "Workshops", label: "Workshops", icon: Wrench },
  { key: "NPTEL", label: "NPTEL Certifications", icon: GraduationCap },
  { key: "Symposiums", label: "Technical Events / Symposiums", icon: Mic },
];

export function ArchiveOverlay() {
  const [open, setOpen] = useState(false);
  const base = import.meta.env.BASE_URL;

  useEffect(() => {
    const onOpen = () => setOpen(true);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("open-archive", onOpen);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("open-archive", onOpen);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  if (!open) return null;

  const all = certificates as Cert[];

  return (
    <div className="fixed inset-0 z-[100] flex items-stretch justify-center animate-in fade-in duration-300">
      <div
        className="absolute inset-0 bg-background/70 backdrop-blur-xl"
        onClick={() => setOpen(false)}
      />
      <div className="relative w-full h-full overflow-y-auto">
        <div className="container mx-auto px-4 py-12 md:py-20 max-w-6xl">
          {/* header */}
          <div className="flex items-start justify-between gap-4 mb-10">
            <div>
              <p className="font-mono text-xs tracking-widest text-primary-glow">// ARCHIVE</p>
              <h2 className="text-3xl md:text-5xl font-bold mt-2 leading-tight">
                Full <span className="text-gradient">Achievement Archive</span>
              </h2>
              <p className="text-muted-foreground mt-3 max-w-2xl">
                Complete catalogue of competitions, internships, workshops, NPTEL coursework
                and symposium credentials.
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="size-11 grid place-items-center rounded-full glass-strong hover:border-primary/60 transition-colors"
              aria-label="Close archive"
            >
              <X className="size-5" />
            </button>
          </div>

          <div className="space-y-12">
            {CATEGORIES.map(({ key, label, icon: Icon }) => {
              const items = all.filter((c) => c.category === key);
              if (items.length === 0) return null;
              return (
                <section key={key}>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="size-10 grid place-items-center rounded-xl bg-gradient-to-br from-primary/30 to-primary-glow/20 text-primary-glow">
                      <Icon className="size-5" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-semibold">{label}</h3>
                    <span className="text-xs font-mono text-muted-foreground">{items.length}</span>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {items.map((c, i) => (
                      <div
                        key={i}
                        className="group glass rounded-2xl p-5 hover:border-primary/60 transition-all flex flex-col"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="size-10 grid place-items-center rounded-xl bg-secondary/60 border border-border">
                            <FileCheck className="size-4 text-primary-glow" />
                          </div>
                          {c.date && (
                            <span className="text-[10px] font-mono text-muted-foreground">{c.date}</span>
                          )}
                        </div>
                        <h4 className="font-semibold mt-4 leading-snug">{c.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1 flex-1">{c.issuer}</p>

                        <div className="mt-4 pt-4 border-t border-border flex items-center justify-between gap-2">
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
                                <ExternalLink className="size-3" /> Preview
                              </a>
                            </>
                          ) : (
                            <span className="text-[10px] font-mono text-muted-foreground/70 uppercase tracking-widest">
                              Available on request
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>

          <p className="mt-14 text-center text-xs font-mono text-muted-foreground/70">
            Drop PDFs into <span className="text-primary-glow">public/certificates/</span> and set the
            {" "}<span className="text-primary-glow">file</span> field in <span className="text-primary-glow">src/data/certificates.json</span>.
          </p>
        </div>
      </div>
    </div>
  );
}
