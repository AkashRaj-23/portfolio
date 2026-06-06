import { SectionHeader } from "./About";
import { Cpu, Code2, Network, Brain } from "lucide-react";

const groups = [
  {
    icon: Cpu,
    name: "Embedded Systems",
    items: ["ESP32", "STM32", "Arduino", "Raspberry Pi", "IoT", "Sensor Integration", "Embedded Design"],
  },
  {
    icon: Code2,
    name: "Software",
    items: ["ROS 2", "Gazebo", "RViz", "Python", "C", "C++", "HTML", "CSS", "JavaScript", "PHP", "Linux", "Ubuntu", "Git", "GitHub", "IDEs"],
  },
  {
    icon: Network,
    name: "Networking",
    items: ["Wireshark", "Routing Protocols", "Protocol Analysis", "Network Troubleshooting"],
  },
  {
    icon: Brain,
    name: "AI / ML",
    items: ["Machine Learning", "Deep Learning", "Computer Vision", "API Integrations"],
  },
];

export function Skills() {
  const all = groups.flatMap((g) => g.items);

  return (
    <section id="skills" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeader
          eyebrow="// 02 · SKILLS"
          title={<>The <span className="text-gradient-cyber">stack</span> behind the systems.</>}
          sub="Hardware, firmware, software, networking, and AI — wired into one toolkit."
        />

        <div className="mt-14 grid md:grid-cols-2 gap-5">
          {groups.map((g) => (
            <div key={g.name} className="glass rounded-3xl p-6 group hover:border-primary/50 transition-all relative overflow-hidden">
              <div className="absolute -top-12 -right-12 size-40 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/25 transition-colors" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="size-11 grid place-items-center rounded-xl bg-gradient-to-br from-primary/30 to-primary-glow/20 text-primary-glow">
                    <g.icon className="size-5" />
                  </div>
                  <h3 className="text-xl font-semibold">{g.name}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {g.items.map((s) => (
                    <span
                      key={s}
                      className="px-3 py-1.5 rounded-full text-xs font-mono bg-secondary/60 border border-border hover:border-primary/60 hover:text-primary-glow transition-colors"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 relative overflow-hidden rounded-2xl glass py-4">
          <div className="flex gap-8 whitespace-nowrap animate-marquee">
            {[...all, ...all].map((s, i) => (
              <span key={i} className="font-mono text-sm text-muted-foreground">
                ◆ {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
