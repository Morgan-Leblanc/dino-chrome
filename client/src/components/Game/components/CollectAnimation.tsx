import { Box } from '@mantine/core';
import { ASSETS } from '../config/assets';

interface CollectAnimationProps {
  position: { x: number; y: number } | null;
}

export const CollectAnimation = ({ position }: CollectAnimationProps) => {
  if (!position) return null;

  return (
    <>
      <Box
        style={{
          position: 'absolute',
          width: 180,
          height: 180,
          right: '20px',
          top: '20px',
          backgroundImage: `url(${ASSETS.items.scroll})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          animation: 'collectPulse 0.5s ease-out forwards',
          zIndex: 10,
        }}
      />
      <Box
        style={{
          position: 'absolute',
          width: 180,
          height: 180,
          right: '20px',
          top: '20px',
          backgroundImage: `url(${ASSETS.items.scroll})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
        }}
      />
    </>
  );
};