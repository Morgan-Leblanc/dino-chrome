import { Box, Text } from '@mantine/core';

interface ScoreProps {
  score: number;
}

export const Score = ({ score }: ScoreProps) => (
  <Box
    style={{
      position: 'absolute',
      top: 20,
      left: 20,
      background: 'rgba(0, 0, 0, 0.5)',
      padding: '10px 15px',
      borderRadius: '15px',
      zIndex: 10,
    }}
  >
    <Text
      style={{
        color: 'white',
        fontSize: '28px',
        fontWeight: 'bold',
        textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
      }}
    >
      Score: {score}
    </Text>
  </Box>
);