import { useRef } from 'react';
import { BACKGROUND_CONFIG } from '../config/gameConfig';

export const useBackground = (gameRef: React.RefObject<HTMLDivElement>) => {
  const backgroundPositionRef = useRef(0);

  const updateBackground = () => {
    backgroundPositionRef.current -= BACKGROUND_CONFIG.SCROLL_SPEED;
    if (backgroundPositionRef.current <= -BACKGROUND_CONFIG.WIDTH) {
      backgroundPositionRef.current = 0;
    }
    
    if (gameRef.current) {
      gameRef.current.style.backgroundPosition = `${backgroundPositionRef.current}px bottom`;
    }
  };

  const resetBackground = () => {
    backgroundPositionRef.current = 0;
    if (gameRef.current) {
      gameRef.current.style.backgroundPosition = '0 bottom';
    }
  };

  return { updateBackground, resetBackground };
};