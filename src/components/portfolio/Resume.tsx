import { SectionHeader } from "./About";
import { FileText, Download, ExternalLink } from "lucide-react";

export function Resume() {
  const base = import.meta.env.BASE_URL;
  const url = `${base}resume.pdf`;
  return (
    <section id="resume" className="relative py-24 md:py-32">
      <div className="container mx-auto px-4">
        <SectionHeader
          eyebrow="// 06 · RESUME"
          title={<>The <span className="text-gradient">one-pager</span>.</>}
          sub="Preview, download, or send it to your hiring team."
        />

        <div className="mt-14 grid lg:grid-cols-[1fr_1.4fr] gap-6">
          <div className="glass-strong rounded-3xl p-8 flex flex-col gap-4">
            <div className="size-14 grid place-items-center rounded-2xl bg-gradient-to-br from-primary to-primary-glow text-primary-foreground">
              <FileText className="size-6" />
            </div>
            <h3 className="text-2xl font-semibold">Akash Raj S K — Resume</h3>
            <p className="text-sm text-muted-foreground">
              Latest version. Add your final PDF to <code className="font-mono text-primary-glow">public/resume.pdf</code> and it'll auto-link here.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <a
                href={url}
                download
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary to-primary-glow text-primary-foreground font-medium hover:shadow-[0_0_30px_oklch(0.68_0.22_295/0.6)] transition-shadow"
              >
                <Download className="size-4" /> Download PDF
              </a>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass hover:bg-primary/10 transition-colors font-medium"
              >
                <ExternalLink className="size-4" /> Open in new tab
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-border overflow-hidden bg-card aspect-[3/4] lg:aspect-auto lg:min-h-[480px]">
            <object data={url} type="application/pdf" className="w-full h-full">
              <div className="h-full grid place-items-center p-8 text-center text-muted-foreground">
                <p>PDF preview not available. <a href={url} className="text-primary-glow underline">Open resume</a>.</p>
              </div>
            </object>
          </div>
        </div>
      </div>
    </section>
  );
}
