import { useEffect, useRef } from 'react';
import { GAME_MUSIC } from '../config/assets';

export const useGameMusic = () => {
  const musicRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    musicRef.current = new Audio(GAME_MUSIC);
    musicRef.current.loop = true;
    musicRef.current.volume = 0.3;

    return () => {
      musicRef.current?.pause();
    };
  }, []);

  const playMusic = () => {
    musicRef.current?.play();
  };

  const stopMusic = () => {
    if (musicRef.current) {
      musicRef.current.pause();
      musicRef.current.currentTime = 0;
    }
  };

  return { playMusic, stopMusic };
};