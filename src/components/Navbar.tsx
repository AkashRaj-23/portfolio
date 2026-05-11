import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#certificates", label: "Certificates" },
  { href: "#achievements", label: "Achievements" },
  { href: "#resume", label: "Resume" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed left-1/2 top-3 sm:top-5 z-50 -translate-x-1/2 transition-all duration-300 ${
        scrolled ? "w-[min(94vw,920px)] scale-[0.97]" : "w-[min(96vw,1040px)]"
      }`}
    >
      <nav className="glass-nav rounded-2xl px-4 sm:px-5 py-2.5 sm:py-3 flex items-center justify-between">
        <a href="#home" className="font-display font-bold tracking-tight text-base sm:text-lg flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-primary pulse-glow" />
          <span className="text-gradient">AKASH.RAJ</span>
        </a>
        <ul className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="px-3 py-1.5 rounded-lg text-sm text-foreground/80 hover:text-foreground hover:bg-primary/10 transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="hidden lg:inline-flex btn-primary rounded-lg px-4 py-1.5 text-sm font-medium"
        >
          Hire Me
        </a>
        <button
          className="lg:hidden btn-ghost-glass rounded-lg p-2"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>
      {open && (
        <div className="lg:hidden mt-2 glass-nav rounded-2xl p-3 animate-in fade-in slide-in-from-top-2">
          <ul className="grid grid-cols-2 gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2 rounded-lg text-sm text-foreground/85 hover:bg-primary/10"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
