import { Box } from '@mantine/core';
import { ASSETS } from '../config/assets';
import { ANIMATIONS } from '../config/animations';
import { ReactNode } from 'react';

interface GameBackgroundProps {
  gameRef: React.RefObject<HTMLDivElement>;
  children: ReactNode;
}

export const GameBackground = ({ gameRef, children }: GameBackgroundProps) => (
  <Box
    ref={gameRef}
    style={{
      width: '100vw',
      height: '100vh',
      position: 'relative',
      overflow: 'hidden',
      backgroundImage: `url(${ASSETS.background})`,
      backgroundSize: 'auto 100%',
      backgroundPosition: '0 bottom',
      backgroundRepeat: 'repeat-x',
      imageRendering: 'pixelated',
      transition: 'none',
    }}
  >
    <style>{ANIMATIONS.collectPulse}</style>
    <style>{ANIMATIONS.collision}</style>
    {children}
  </Box>
);