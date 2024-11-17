import { Box, Card, Text, Button } from '@mantine/core';
import { getRandomQuote } from '../config/quotes';

interface StartButtonProps {
  onStart: () => void;
  finalScore: number;
}

export const StartButton = ({ onStart, finalScore }: StartButtonProps) => (
  <Card
    shadow="sm"
    padding="xl"
    style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '90%',
      maxWidth: '600px',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      borderRadius: '15px',
      backdropFilter: 'blur(5px)',
    }}
  >
    <Box
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '25px',
      }}
    >
      <Button
        size="xl"
        radius="md"
        color="green"
        fullWidth
        onClick={onStart}
        style={{
          backgroundColor: '#4CAF50',
          fontSize: '1.5rem',
          height: 'auto',
          padding: '20px 30px',
          lineHeight: '1.2',
          whiteSpace: 'normal',
          minHeight: '70px',
          transition: 'all 0.3s ease',
          '&:hover': {
            backgroundColor: '#45a049',
            transform: 'scale(1.02)',
          }
        }}
      >
        Start Game
      </Button>

      {finalScore > 0 && (
        <Box
          style={{
            width: '100%',
            textAlign: 'center',
          }}
        >
          <Text size="xl" w={700} mb={20}>
            Score Final: {finalScore}
          </Text>

          <Card
            padding="lg"
            radius="md"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.05)',
              backdropFilter: 'blur(2px)',
            }}
          >
            <Text
              size="lg"
              mb={15}
              style={{
                lineHeight: 1.6,
                fontStyle: 'italic',
              }}
            >
              "{getRandomQuote().text}"
            </Text>
            <Text w={600}>- {getRandomQuote().author}</Text>
          </Card>
        </Box>
      )}
    </Box>
  </Card>
);