import { GraduationCap, MapPin, Cpu, Rocket, Terminal, Workflow } from "lucide-react";

const stats = [
  { icon: GraduationCap, label: "B.E. ECE — Final Year", sub: "Mepco Schlenk Engineering College, Sivakasi" },
  { icon: MapPin, label: "Madurai, Tamil Nadu", sub: "Open to internships & relocation" },
  { icon: Cpu, label: "Embedded · Robotics · AI", sub: "Hardware × Software integration" },
  { icon: Terminal, label: "Linux / Ubuntu native", sub: "ROS 2 · Bash · Toolchain fluent" },
];

const timeline = [
  { year: "2026", title: "Final Year — Capstone in ROS 2 Humanoid Tutoring", body: "Leading CYRA, an AI-powered humanoid robot built on Raspberry Pi 5." },
  { year: "2025", title: "Award Sweep — 4 inter-college wins", body: "Invente (SSN), Quantumania (TCE), SDG-4 Hackfest (MKCE), SIMATS Project Expo." },
  { year: "2024", title: "SAFERIDE & Borewell Robot", body: "Shipped end-to-end embedded safety platforms with GSM, sensors, ESP-NOW." },
  { year: "2023", title: "Started ECE @ Mepco Schlenk", body: "Began deep-diving into embedded systems, networking, and Linux." },
];

export function About() {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="container mx-auto px-4">
        <SectionHeader eyebrow="// 01 · ABOUT" title={<>Engineer with a <span className="text-gradient">startup mindset</span>.</>} />

        <div className="mt-14 grid lg:grid-cols-2 gap-10">
          <div className="space-y-4">
            <p className="text-lg text-muted-foreground leading-relaxed">
              I'm Akash — an internship-focused Electronics & Communication Engineering student
              who treats every project like a real product. From{" "}
              <span className="text-foreground">humanoid robotics</span> to{" "}
              <span className="text-foreground">smart mobility</span> and{" "}
              <span className="text-foreground">safety systems</span>, I obsess over making
              hardware and software cooperate.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              I'm comfortable in the trenches: bringing up boards, debugging protocols,
              wiring up ROS 2 nodes, integrating APIs, and shipping clean firmware. I love
              moving fast — but only when the engineering underneath is rigorous.
            </p>
            <div className="grid sm:grid-cols-2 gap-3 pt-2">
              {stats.map((s) => (
                <div key={s.label} className="glass rounded-2xl p-4 hover:border-primary/40 transition-colors">
                  <s.icon className="size-5 text-primary-glow mb-2" />
                  <p className="font-medium text-sm">{s.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{s.sub}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-primary/60 to-transparent" />
            <div className="space-y-6">
              {timeline.map((t, i) => (
                <div key={i} className="relative pl-12">
                  <div className="absolute left-0 top-1 size-9 grid place-items-center rounded-full glass-strong text-xs font-mono text-primary-glow">
                    <Rocket className="size-4" />
                  </div>
                  <div className="glass rounded-2xl p-5 hover:border-primary/40 transition-colors">
                    <div className="flex items-center gap-2 text-xs font-mono text-primary-glow">
                      <Workflow className="size-3" /> {t.year}
                    </div>
                    <h3 className="font-semibold mt-1">{t.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{t.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SectionHeader({ eyebrow, title, sub }: { eyebrow: string; title: React.ReactNode; sub?: string }) {
  return (
    <div className="max-w-3xl">
      <p className="font-mono text-xs tracking-widest text-primary-glow">{eyebrow}</p>
      <h2 className="text-4xl md:text-5xl font-bold mt-3 leading-tight">{title}</h2>
      {sub && <p className="text-muted-foreground mt-4 text-lg">{sub}</p>}
    </div>
  );
}
