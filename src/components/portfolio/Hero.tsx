import { useEffect, useState } from "react";
import { Github, Linkedin, Instagram, AtSign, Mail, ArrowRight, Download } from "lucide-react";
import socials from "@/data/socials.json";
import profile from "@/assets/profile-placeholder.jpg";

const ICONS: Record<string, any> = { Github, Linkedin, Instagram, AtSign, Mail };
const titles = ["ECE Final Year Student", "Embedded System Designer", "ROS 2 Developer"];

function useTyping() {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [del, setDel] = useState(false);

  useEffect(() => {
    const cur = titles[i];
    const speed = del ? 40 : 80;
    const t = setTimeout(() => {
      if (!del) {
        const next = cur.slice(0, text.length + 1);
        setText(next);
        if (next === cur) setTimeout(() => setDel(true), 1400);
      } else {
        const next = cur.slice(0, text.length - 1);
        setText(next);
        if (next === "") {
          setDel(false);
          setI((p) => (p + 1) % titles.length);
        }
      }
    }, speed);
    return () => clearTimeout(t);
  }, [text, del, i]);

  return text;
}

export function Hero() {
  const text = useTyping();
  const base = import.meta.env.BASE_URL;

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-12 items-center">

          <div className="space-y-6 animate-fade-in text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-mono">
              <span className="size-2 rounded-full bg-green-400 animate-pulse" />
              AVAILABLE FOR INTERNSHIPS · 2026
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95]">
              Akash Raj <br />
              <span className="text-gradient">S K</span>
            </h1>

            <div className="font-mono text-lg md:text-xl text-primary-glow h-7">
              <span className="text-muted-foreground">{">"}</span> {text}
              <span className="inline-block w-[2px] h-5 bg-primary-glow ml-1 align-middle animate-blink" />
            </div>

            <p className="text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed mx-auto lg:mx-0">
              Final year Electronics & Communication Engineering student passionate about{" "}
              <span className="text-foreground">robotics, ROS 2, embedded systems, and AI integration</span>.
              I build practical technologies that fuse hardware, software, and automation to
              solve real-world problems — with a startup mindset.
            </p>

            <div className="flex flex-wrap gap-3 pt-2 justify-center lg:justify-start">
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary to-primary-glow text-primary-foreground font-medium hover:shadow-[0_0_40px_oklch(0.68_0.22_295/0.7)] hover:-translate-y-0.5 transition-all"
              >
                View Projects
                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href={`${base}resume.pdf`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-strong hover:bg-primary/10 hover:-translate-y-0.5 transition-all font-medium"
              >
                <Download className="size-4" /> Resume
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border hover:border-primary/50 hover:-translate-y-0.5 transition-all font-medium"
              >
                Contact Me
              </a>
            </div>

            <div className="flex items-center gap-3 pt-4 justify-center lg:justify-start">
              {socials.links.map((s) => {
                const Icon = ICONS[s.icon] || Mail;
                return (
                  <a
                    key={s.label}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="size-10 grid place-items-center rounded-full glass hover:bg-primary/20 hover:text-primary-glow hover:scale-110 transition-all"
                  >
                    <Icon className="size-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Portrait — appears below intro on mobile, right side on desktop */}
          <div className="relative animate-fade-in flex justify-center lg:justify-self-end">
            <HeroPortrait />
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroPortrait() {
  return (
    <div className="relative animate-float">
      <div className="absolute -inset-8 bg-gradient-to-tr from-primary/40 via-transparent to-cyan/30 blur-3xl rounded-full" aria-hidden />
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-tr from-primary via-primary-glow to-cyan rounded-3xl opacity-70 blur-md" />
        <div className="relative rounded-3xl overflow-hidden border-gradient glow-strong w-[260px] sm:w-[320px] md:w-[380px] lg:w-[400px] aspect-[3/4]">
          <img src={profile} alt="Akash Raj S K portrait" className="w-full h-full object-cover" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 glass rounded-xl p-3 font-mono text-xs">
            <div className="flex items-center justify-between text-muted-foreground">
              <span>STATUS</span>
              <span className="text-green-400">● BUILDING</span>
            </div>
            <div className="flex items-center justify-between text-muted-foreground mt-1">
              <span>FOCUS</span>
              <span className="text-primary-glow">ROBOTICS · ROS 2</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
