import socials from "@/data/socials.json";

export function Footer() {
  return (
    <footer className="relative py-10 border-t border-border">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <p className="font-mono">
          © {new Date().getFullYear()} Akash Raj S K · Built with React + Tailwind + Vite
        </p>
        <p className="font-mono text-xs">
          <span className="text-primary-glow">●</span> Powered by curiosity in {socials.location}
        </p>
      </div>
    </footer>
  );
}
