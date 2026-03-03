import { Box } from '@mantine/core';
import { ASSETS } from '../config/assets';
import { ANIMATIONS } from '../config/animations';
import { ReactNode } from 'react';

interface GameBackgroundProps {
  gameRef: React.RefObject<HTMLDivElement>;
  children: ReactNode;
  shake?: boolean;
}

export const GameBackground = ({ gameRef, children, shake = false }: GameBackgroundProps) => (
  <Box
    ref={gameRef}
    style={{
      width: '100%',
      height: '100%',
      position: 'relative',
      overflow: 'hidden',
      backgroundImage: `url(${ASSETS.background})`,
      backgroundSize: 'auto 100%',
      backgroundPosition: '0 bottom',
      backgroundRepeat: 'repeat-x',
      imageRendering: 'pixelated',
      transition: 'none',
      animation: shake ? 'gameScreenShake 0.28s ease-out' : undefined,
    }}
  >
    <style>{ANIMATIONS.collectPulse}</style>
    <style>{ANIMATIONS.collision}</style>
    <style>{ANIMATIONS.screenShake}</style>
    {children}
  </Box>
);