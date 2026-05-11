import skillsData from "@/data/skills.json";
import { Cpu, Code2, Network, Brain } from "lucide-react";
import { SectionHeader } from "./About";

const iconMap: Record<string, any> = { cpu: Cpu, code: Code2, network: Network, brain: Brain };

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <SectionHeader eyebrow="// 02 — skills" title="Tooling & technologies" subtitle="The stack I reach for to design, build, and ship." />
        <div className="grid md:grid-cols-2 gap-5 mt-12">
          {skillsData.categories.map((cat) => {
            const Icon = iconMap[cat.icon] || Cpu;
            return (
              <div key={cat.name} className="glass glow-hover rounded-2xl p-6 group">
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center glow-primary">
                    <Icon size={20} className="text-white" />
                  </div>
                  <h3 className="font-display font-semibold text-lg">{cat.name}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((s) => (
                    <span
                      key={s}
                      className="text-xs font-mono px-2.5 py-1 rounded-md bg-primary/10 text-foreground/85 border border-primary/20 hover:bg-primary/20 hover:border-primary/40 transition-colors"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
