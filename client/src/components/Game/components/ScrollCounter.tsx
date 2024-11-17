import { Box, Text } from '@mantine/core';
import { ASSETS } from '../config/assets';

interface ScrollCounterProps {
  scrollsCollected: number;
}

export const ScrollCounter = ({ scrollsCollected }: ScrollCounterProps) => (
  <Box
    style={{
      position: 'absolute',
      top: 20,
      right: 20,
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      background: 'rgba(0, 0, 0, 0.5)',
      padding: '10px 15px',
      borderRadius: '15px',
      zIndex: 10,
    }}
  >
    <Box
      style={{
        width: 40,
        height: 40,
        backgroundImage: `url(${ASSETS.items.scroll})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        imageRendering: 'pixelated',
      }}
    />
    <Text
      style={{
        color: 'white',
        fontSize: '28px',
        fontWeight: 'bold',
        textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
      }}
    >
      ×{scrollsCollected}
    </Text>
  </Box>
);