import { Box, Card, Text, Button, Group } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { getRandomQuote } from '../config/quotes';

interface StartButtonProps {
  onStart: () => void;
  onBackToMenu?: () => void;
  finalScore: number;
}

export const StartButton = ({ onStart, onBackToMenu, finalScore }: StartButtonProps) => {
  const { t } = useTranslation();
  const quote = getRandomQuote();
  return (
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
        maxHeight: '90vh',
        overflowX: 'hidden',
        overflowY: 'auto',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: '15px',
        backdropFilter: 'blur(5px)',
        boxSizing: 'border-box',
      }}
    >
      <Box
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '25px',
          minWidth: 0,
          width: '100%',
          maxWidth: '100%',
          overflowX: 'hidden',
        }}
      >
        <Group grow style={{ width: '100%', minWidth: 0, flexWrap: 'wrap' }}>
          {onBackToMenu && (
            <Button
              size="md"
              radius="md"
              variant="light"
              color="gray"
              onClick={onBackToMenu}
              style={{ minWidth: '14rem', whiteSpace: 'normal' }}
            >
              {t('game.menu')}
            </Button>
          )}
          <Button
            size="xl"
            radius="md"
            color="green"
            onClick={onStart}
            style={{
              flex: onBackToMenu ? 1 : undefined,
              width: onBackToMenu ? undefined : '100%',
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
              },
            }}
          >
            {t('game.startGame')}
          </Button>
        </Group>

        {finalScore > 0 && (
          <Box style={{ width: '100%', minWidth: 0, textAlign: 'center' }}>
            <Text size="lg" w={700} mb={8} c="dimmed">
              {t('game.gameOver')}
            </Text>
            <Text size="xl" w={700} mb={20}>
              {t('game.finalScore')}: {finalScore}
            </Text>

            <Card
              padding="lg"
              radius="md"
              style={{
                width: '100%',
                maxWidth: '100%',
                minWidth: 0,
                boxSizing: 'border-box',
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
                  overflowWrap: 'break-word',
                  wordBreak: 'break-word',
                }}
              >
                "{quote.text}"
              </Text>
              <Text w={600} style={{ overflowWrap: 'break-word', wordBreak: 'break-word' }}>
                – {quote.author}
              </Text>
            </Card>
          </Box>
        )}
      </Box>
    </Card>
  );
};