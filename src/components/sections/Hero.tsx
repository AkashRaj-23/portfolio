import { useEffect, useState } from "react";
import { Github, Linkedin, Instagram, Mail, AtSign, ArrowDown, FileDown } from "lucide-react";
import socials from "@/data/socials.json";
import { motion } from "framer-motion";

const titles = ["ECE Final Year Student", "Embedded System Designer", "ROS 2 Developer"];

const BASE = import.meta.env.BASE_URL;

export default function Hero() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % titles.length), 2500);
    return () => clearInterval(t);
  }, []);

  const photo = `${BASE}akash.jpg`;

  return (
    <section id="home" className="relative pt-32 sm:pt-36 pb-20 px-4 min-h-screen flex items-center">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-14 items-center">
          {/* Left: text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="order-1 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 glass rounded-full px-3 py-1 text-xs font-mono uppercase tracking-widest text-muted-foreground mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 pulse-glow" />
              Available for opportunities
            </div>
            <h1 className="font-display font-bold leading-[1.05] text-4xl sm:text-5xl lg:text-6xl">
              <span className="text-gradient">Akash Raj S K</span>
            </h1>
            <div className="mt-4 h-8 sm:h-9 font-mono text-base sm:text-lg text-primary">
              <motion.span
                key={idx}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="cursor-blink"
              >
                {titles[idx]}
              </motion.span>
            </div>
            <p className="mt-5 text-foreground/75 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Hi, I'm Akash Raj S K — a final-year Electronics & Communication Engineering student passionate about
              robotics, ROS 2, embedded systems, AI integration, and intelligent engineering solutions. I build
              practical technologies that combine hardware, software, and automation to solve real-world problems —
              from humanoid robotics to smart mobility and safety systems — with a startup mindset.
            </p>

            <div className="mt-7 flex flex-wrap gap-3 justify-center lg:justify-start">
              <a href="#projects" className="btn-primary rounded-xl px-5 py-2.5 text-sm font-semibold inline-flex items-center gap-2">
                View Projects <ArrowDown size={16} />
              </a>
              <a
                href={`${BASE}resume.pdf`}
                download
                className="btn-ghost-glass rounded-xl px-5 py-2.5 text-sm font-semibold inline-flex items-center gap-2"
              >
                <FileDown size={16} /> Download Resume
              </a>
              <a href="#contact" className="btn-ghost-glass rounded-xl px-5 py-2.5 text-sm font-semibold">
                Contact Me
              </a>
            </div>

            <div className="mt-7 flex justify-center lg:justify-start gap-2">
              {[
                { Icon: Github, href: socials.github, label: "GitHub" },
                { Icon: Linkedin, href: socials.linkedin, label: "LinkedIn" },
                { Icon: Instagram, href: socials.instagram, label: "Instagram" },
                { Icon: AtSign, href: socials.threads, label: "Threads" },
                { Icon: Mail, href: `mailto:${socials.email}`, label: "Email" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="glass glow-hover rounded-xl p-2.5 text-foreground/80 hover:text-primary"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right: photo (mobile order-2) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-2 flex justify-center"
          >
            <div className="relative float-slow">
              <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-primary/40 via-accent/30 to-transparent blur-2xl opacity-70" />
              <div className="relative glass-strong rounded-[1.75rem] p-2 pulse-glow overflow-hidden">
                <div className="relative w-[260px] h-[320px] sm:w-[300px] sm:h-[370px] rounded-[1.5rem] overflow-hidden bg-gradient-to-br from-primary/20 to-accent/10">
                  <img
                    src={photo}
                    alt="Akash Raj S K"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center text-muted-foreground/50 font-mono text-xs">
                    {/* Shown if image fails */}
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 glass rounded-lg px-3 py-2 font-mono text-[10px] uppercase tracking-widest text-foreground/80 flex justify-between">
                    <span>STATUS</span>
                    <span className="text-emerald-400">● ONLINE</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
