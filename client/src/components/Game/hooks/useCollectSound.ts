import { useRef, useCallback } from 'react';

export function useCollectSound() {
  const audioContextRef = useRef<AudioContext | null>(null);

  const play = useCallback(() => {
    try {
      const ctx = audioContextRef.current ?? new (window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      if (!audioContextRef.current) audioContextRef.current = ctx;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.08);
      osc.type = 'sine';
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.15);
    } catch {
      // ignore if AudioContext not supported
    }
  }, []);

  return play;
}
