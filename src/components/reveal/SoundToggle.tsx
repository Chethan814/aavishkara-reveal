import { useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

import { initSound, isMuted, setMuted, startAmbience, subscribeMuted } from "@/lib/sound";

export function SoundToggle() {
  const [muted, setMutedState] = useState(false);

  useEffect(() => {
    initSound();
    setMutedState(isMuted());
    const unsub = subscribeMuted(setMutedState);

    /* browsers require a gesture before audio can start */
    const kick = () => {
      if (!isMuted()) startAmbience();
    };
    window.addEventListener("pointerdown", kick, { once: true });
    window.addEventListener("keydown", kick, { once: true });
    window.addEventListener("wheel", kick, { once: true, passive: true });
    window.addEventListener("touchstart", kick, { once: true, passive: true });
    return () => {
      unsub();
      window.removeEventListener("pointerdown", kick);
      window.removeEventListener("keydown", kick);
      window.removeEventListener("wheel", kick);
      window.removeEventListener("touchstart", kick);
    };
  }, []);

  return (
    <button
      type="button"
      aria-label={muted ? "Unmute sound" : "Mute sound"}
      onClick={() => setMuted(!muted)}
      className="fixed bottom-5 right-5 z-[60] inline-flex h-11 w-11 items-center justify-center rounded-full border border-primary/40 bg-card/70 text-primary backdrop-blur-sm transition-colors hover:border-primary hover:bg-primary/10 sm:bottom-8 sm:right-8"
    >
      {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
    </button>
  );
}
