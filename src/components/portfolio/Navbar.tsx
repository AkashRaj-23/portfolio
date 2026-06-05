import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const items = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "achievements", label: "Achievements" },
  { id: "resume", label: "Resume" },
  { id: "contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const y = window.scrollY + 140;
      for (const it of items) {
        const el = document.getElementById(it.id);
        if (el && el.offsetTop <= y && el.offsetTop + el.offsetHeight > y) {
          setActive(it.id);
        }
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <nav
          className={`relative flex items-center justify-between rounded-full transition-all duration-500 nav-glass ${
            scrolled ? "px-3 md:px-5 py-2 nav-glass--scrolled" : "px-4 md:px-6 py-3"
          }`}
        >
          {/* purple glow border ring */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-full"
            style={{
              boxShadow: scrolled
                ? "0 0 0 1px oklch(0.68 0.22 295 / 0.35), 0 10px 40px -10px oklch(0.68 0.22 295 / 0.5)"
                : "0 0 0 1px oklch(1 0 0 / 0.08), 0 8px 32px -12px oklch(0.68 0.22 295 / 0.35)",
            }}
          />

          <button onClick={() => go("home")} className="relative flex items-center gap-2 group">
            <span className={`grid place-items-center rounded-lg bg-gradient-to-br from-primary to-primary-glow font-mono font-bold text-primary-foreground shadow-[0_0_20px_oklch(0.68_0.22_295/0.5)] group-hover:scale-110 transition-all ${scrolled ? "size-7 text-sm" : "size-8"}`}>
              A
            </span>
            <span className="font-display font-semibold tracking-tight hidden sm:inline">
              Akash<span className="text-primary-glow">.</span>
            </span>
          </button>

          <ul className="relative hidden lg:flex items-center gap-0.5">
            {items.map((it) => (
              <li key={it.id}>
                <button
                  onClick={() => go(it.id)}
                  className={`relative px-3 py-1.5 text-sm rounded-full transition-all duration-300 ease-out hover:-translate-y-0.5 ${
                    active === it.id
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {active === it.id && (
                    <span
                      aria-hidden
                      className="absolute inset-0 rounded-full bg-primary/20 ring-1 ring-primary/40"
                    />
                  )}
                  <span
                    aria-hidden
                    className="absolute inset-0 rounded-full bg-white/0 hover:bg-white/[0.06] transition-colors duration-300"
                  />
                  <span className="relative">{it.label}</span>
                </button>
              </li>
            ))}
          </ul>

          <div className="relative flex items-center gap-2">
            <button
              onClick={() => go("contact")}
              className="hidden md:inline-flex px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-primary to-primary-glow text-primary-foreground hover:shadow-[0_0_30px_oklch(0.68_0.22_295/0.7)] transition-all hover:-translate-y-0.5"
            >
              Hire Me
            </button>
            <button
              className="lg:hidden p-2 rounded-full glass"
              onClick={() => setOpen(!open)}
              aria-label="Menu"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>

        {open && (
          <div className="lg:hidden mt-2 nav-glass rounded-2xl p-3 animate-fade-in">
            {items.map((it) => (
              <button
                key={it.id}
                onClick={() => go(it.id)}
                className={`block w-full text-left px-4 py-3 rounded-xl transition-colors ${
                  active === it.id ? "bg-primary/15 text-foreground" : "hover:bg-primary/10 text-muted-foreground"
                }`}
              >
                {it.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
