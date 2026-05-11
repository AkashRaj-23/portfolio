import { useEffect, useRef, useState } from "react";
import { Music, VolumeX } from "lucide-react";

const BASE = import.meta.env.BASE_URL;

export default function MusicToggle() {
  const ref = useRef<HTMLAudioElement | null>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.volume = 0.25;
  }, []);

  function toggle() {
    if (!ref.current) return;
    if (on) {
      ref.current.pause();
      setOn(false);
    } else {
      ref.current.play().then(() => setOn(true)).catch(() => setOn(false));
    }
  }

  return (
    <>
      <audio ref={ref} src={`${BASE}music/ambient.mp3`} loop preload="none" />
      <button
        onClick={toggle}
        aria-label="Toggle ambient music"
        className="fixed bottom-5 right-5 z-40 glass-strong rounded-full p-3 glow-hover"
        title={on ? "Mute ambient" : "Play ambient"}
      >
        {on ? <Music size={16} className="text-primary" /> : <VolumeX size={16} className="text-foreground/70" />}
      </button>
    </>
  );
}
