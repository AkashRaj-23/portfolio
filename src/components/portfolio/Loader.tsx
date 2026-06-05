import { useEffect, useState } from "react";

const lines = [
  "> INITIALIZING AKASH.EXE",
  "> LOADING EFFICIENT DEVELOPER...",
  "> LOADING IDEA GENERATOR...",
  "> OPTIMIZING PERFORMANCE...",
  "> SYSTEM READY.",
];

export function Loader({ onDone }: { onDone: () => void }) {
  const [shown, setShown] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      setShown((s) => [...s, lines[i]]);
      setProgress(((i + 1) / lines.length) * 100);
      i++;
      if (i >= lines.length) {
        clearInterval(id);
        setTimeout(() => setFadeOut(true), 500);
        setTimeout(onDone, 1100);
      }
    }, 380);
    return () => clearInterval(id);
  }, [onDone]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-background transition-opacity duration-500 ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="aurora" aria-hidden />
      <div className="grid-bg absolute inset-0 opacity-30" aria-hidden />
      <div className="relative z-10 w-[min(92vw,640px)] glass-strong rounded-2xl p-8 font-mono text-sm">
        <div className="flex items-center gap-2 mb-6 text-muted-foreground text-xs">
          <span className="size-3 rounded-full bg-destructive/80" />
          <span className="size-3 rounded-full bg-yellow-500/80" />
          <span className="size-3 rounded-full bg-green-500/80" />
          <span className="ml-3">akash@portfolio:~</span>
        </div>
        <div className="space-y-2 min-h-[180px]">
          {shown.map((l, i) => (
            <div key={i} className="text-primary-glow">
              {l} <span className="text-cyan">[OK]</span>
            </div>
          ))}
          {shown.length < lines.length && (
            <div className="inline-block w-2 h-4 bg-primary-glow animate-blink align-middle" />
          )}
        </div>
        <div className="mt-6 h-1 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-primary-glow transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-2 text-xs text-muted-foreground">{Math.round(progress)}%</p>
      </div>
    </div>
  );
}
