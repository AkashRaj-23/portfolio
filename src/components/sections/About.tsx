import { GraduationCap, MapPin, Cpu, Bot, Brain, Terminal, Rocket, Wrench } from "lucide-react";

const items = [
  { Icon: GraduationCap, title: "B.E. Electronics & Communication", body: "Final-year student, Mepco Schlenk Engineering College, Sivakasi." },
  { Icon: MapPin, title: "Based in Madurai, Tamil Nadu", body: "Building from South India for the world." },
  { Icon: Bot, title: "Robotics Enthusiast", body: "From humanoid tutors to assistive mobility — robotics is the throughline." },
  { Icon: Cpu, title: "Embedded Systems Developer", body: "Comfortable across ESP32, STM32, Arduino and Raspberry Pi platforms." },
  { Icon: Brain, title: "AI Integration", body: "Wiring vision, language and reasoning into physical systems." },
  { Icon: Terminal, title: "Linux / Ubuntu Native", body: "Daily-driver for development, ROS 2 stacks and tooling." },
  { Icon: Rocket, title: "Startup Mindset", body: "Bias for shipping, lean iteration, and impact-first engineering." },
  { Icon: Wrench, title: "System Integrator", body: "Strongest at the seams — hardware + software + UX as one product." },
];

export default function About() {
  return (
    <section id="about" className="relative py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <SectionHeader eyebrow="// 01 — about" title="The engineer behind the systems" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
          {items.map(({ Icon, title, body }) => (
            <div key={title} className="glass glow-hover rounded-2xl p-5">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-3 glow-primary">
                <Icon size={18} className="text-white" />
              </div>
              <h3 className="font-display font-semibold text-base">{title}</h3>
              <p className="mt-1.5 text-sm text-foreground/70 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SectionHeader({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <div className="text-center max-w-2xl mx-auto">
      <div className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-3">{eyebrow}</div>
      <h2 className="font-display text-3xl sm:text-4xl font-bold text-gradient">{title}</h2>
      {subtitle && <p className="mt-3 text-foreground/70">{subtitle}</p>}
      <div className="divider-glow mt-6 max-w-xs mx-auto" />
    </div>
  );
}
