import data from "@/data/achievements.json";
import { SectionHeader } from "./About";
import { Trophy } from "lucide-react";

export default function Achievements() {
  return (
    <section id="achievements" className="relative py-24 px-4">
      <div className="container mx-auto max-w-5xl">
        <SectionHeader eyebrow="// 05 — achievements" title="Milestones & recognitions" />
        <div className="relative mt-12 pl-6 sm:pl-10">
          <div className="absolute left-2 sm:left-4 top-2 bottom-2 w-px bg-gradient-to-b from-primary/0 via-primary/60 to-primary/0" />
          <div className="space-y-5">
            {data.achievements.map((a, i) => (
              <div key={i} className="relative">
                <div className="absolute -left-[22px] sm:-left-[30px] top-4 h-3 w-3 rounded-full bg-primary glow-primary" />
                <div className="glass glow-hover rounded-2xl p-5 flex items-start gap-4">
                  <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center glow-primary shrink-0">
                    <Trophy size={18} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display font-semibold">{a.title}</h3>
                    <p className="text-sm text-foreground/75 mt-0.5">{a.org}</p>
                  </div>
                  <span className="font-mono text-[11px] uppercase tracking-widest text-primary/90 shrink-0">{a.year}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
