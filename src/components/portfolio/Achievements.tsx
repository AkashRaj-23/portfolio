import data from "@/data/achievements.json";
import { SectionHeader } from "./About";
import { Trophy, Medal, Flag, Sparkles, ArrowRight, Download } from "lucide-react";

const ICON: Record<string, any> = {
  winner: Trophy,
  runner: Medal,
  qualifier: Flag,
};
const COLOR: Record<string, string> = {
  winner: "from-yellow-400/30 to-orange-500/20 text-yellow-300",
  runner: "from-slate-300/30 to-slate-500/20 text-slate-200",
  qualifier: "from-cyan/30 to-primary/20 text-cyan",
};

function openArchive() {
  window.dispatchEvent(new CustomEvent("open-archive"));
}

export function Achievements() {
  const major = (data as any).major as Array<{ title: string; org: string; year: string; type: string }>;
  const stat = (data as any).stat as { value: string; label: string; sub: string };

  return (
    <section id="achievements" className="relative py-24 md:py-32">
      <div className="container mx-auto px-4">
        <SectionHeader
          eyebrow="// 04 · ACHIEVEMENTS"
          title={<>Recognised at <span className="text-gradient">national stages</span>.</>}
          sub="Major wins across hackathons, expos and national symposiums."
        />

        <div className="mt-14 grid lg:grid-cols-3 gap-5">
          {major.map((a, i) => {
            const Icon = ICON[a.type] || Trophy;
            return (
              <div
                key={i}
                className="group relative glass rounded-2xl p-6 hover:border-primary/60 transition-all overflow-hidden"
              >
                <div className={`absolute -top-10 -right-10 size-40 bg-gradient-to-br ${COLOR[a.type]} rounded-full blur-3xl opacity-40 group-hover:opacity-70 transition-opacity`} />
                <div className="relative">
                  <div className={`size-12 grid place-items-center rounded-xl bg-gradient-to-br ${COLOR[a.type]}`}>
                    <Icon className="size-6" />
                  </div>
                  <h3 className="font-semibold mt-4 leading-snug">{a.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{a.org}</p>
                  <p className="text-xs font-mono text-primary-glow mt-3">{a.year}</p>
                </div>
              </div>
            );
          })}

          {/* Premium credibility stat card */}
          <div className="group relative rounded-2xl p-6 overflow-hidden border-gradient glow-primary lg:col-span-3 xl:col-span-1">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-cyan/10 opacity-80" />
            <div className="absolute -bottom-16 -right-16 size-56 bg-primary/30 rounded-full blur-3xl" />
            <div className="relative flex flex-col h-full">
              <Sparkles className="size-6 text-primary-glow" />
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-6xl font-bold text-gradient leading-none">{stat.value}</span>
              </div>
              <p className="font-semibold mt-2">{stat.label}</p>
              <p className="text-sm text-muted-foreground mt-1">{stat.sub}</p>
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={openArchive}
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary to-primary-glow text-primary-foreground font-medium hover:shadow-[0_0_40px_oklch(0.68_0.22_295/0.6)] transition-shadow"
          >
            View Full Achievement Archive
            <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={openArchive}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-strong hover:border-primary/60 transition-colors text-sm font-mono"
          >
            <Download className="size-4" /> Download Key Certificates
          </button>
        </div>
      </div>
    </section>
  );
}
