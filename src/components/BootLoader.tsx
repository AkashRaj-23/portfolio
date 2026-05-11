import { useEffect, useState } from "react";

const lines = [
  "> INITIALIZING AKASH.EXE",
  "> LOADING EFFICIENT DEVELOPER...",
  "> LOADING IDEA GENERATOR...",
  "> OPTIMIZING PERFORMANCE...",
  "> SYSTEM READY.",
];

export default function BootLoader({ onDone }: { onDone: () => void }) {
  const [shown, setShown] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      const next = lines[i];
      if (!next) {
        clearInterval(interval);
        setTimeout(() => setDone(true), 500);
        setTimeout(onDone, 1100);
        return;
      }
      setShown((s) => [...s, next]);
      i++;
    }, 380);
    return () => clearInterval(interval);
  }, [onDone]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-background transition-opacity duration-500 ${
        done ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="bg-grid" />
      <div className="bg-aurora" />
      <div className="glass-strong relative w-[min(92vw,560px)] rounded-xl p-6 sm:p-8 font-mono text-sm sm:text-base overflow-hidden scanline">
        <div className="flex items-center gap-2 mb-4 text-xs uppercase tracking-widest text-muted-foreground">
          <span className="h-2.5 w-2.5 rounded-full bg-destructive/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
          <span className="ml-3">akash@portfolio:~</span>
        </div>
        <div className="space-y-1.5 min-h-[170px]">
          {shown.map((l, i) => (
            <div key={i} className="text-foreground/90">
              <span className="text-primary">{l.split(" ")[0]}</span>{" "}
              <span className={i === shown.length - 1 ? "cursor-blink" : ""}>
                {l.substring(2)}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-6 h-1 w-full overflow-hidden rounded-full bg-muted/60">
          <div
            className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
            style={{ width: `${(shown.length / lines.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
