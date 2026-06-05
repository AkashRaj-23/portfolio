import { useEffect, useRef, useState } from "react";
import { Music, VolumeX } from "lucide-react";

export function MusicToggle() {
  const ref = useRef<HTMLAudioElement | null>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.volume = 0.25;
  }, []);

  const toggle = () => {
    if (!ref.current) return;
    if (on) {
      ref.current.pause();
      setOn(false);
    } else {
      ref.current.play().then(() => setOn(true)).catch(() => setOn(false));
    }
  };

  return (
    <>
      <audio
        ref={ref}
        src={`${import.meta.env.BASE_URL}music/ambient.mp3`}
        loop
        preload="none"
      />
      <button
        onClick={toggle}
        aria-label={on ? "Mute ambient music" : "Play ambient music"}
        className="fixed bottom-6 right-6 z-40 size-12 grid place-items-center rounded-full glass-strong glow-primary hover:scale-110 transition-transform"
      >
        {on ? <Music className="size-5 text-primary-glow animate-pulse" /> : <VolumeX className="size-5" />}
      </button>
    </>
  );
}
