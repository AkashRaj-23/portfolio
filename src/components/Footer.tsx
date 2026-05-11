import socials from "@/data/socials.json";

export default function Footer() {
  return (
    <footer className="relative py-10 px-4 border-t border-border/40 mt-10">
      <div className="container mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
        <div className="font-mono">© {new Date().getFullYear()} AKASH.RAJ — built with conviction.</div>
        <div className="font-mono">
          <a href={`mailto:${socials.email}`} className="hover:text-primary">{socials.email}</a>
        </div>
      </div>
    </footer>
  );
}
