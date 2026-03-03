import { Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';

interface WelcomeSectionProps {
  username: string;
  score: number | undefined;
}

export const WelcomeSection: React.FC<WelcomeSectionProps> = ({ username, score }) => {
  const { t } = useTranslation();
  return (
    <>
      <Text
        size="xl"
        style={{
          width: '90%',
          maxWidth: '600px',
          margin: '0 auto',
          textAlign: 'center',
          marginBottom: '3vh',
        }}
        c="dimmed"
      >
        {t('launcher.welcome', { username: username || '?' })}
      </Text>

      {typeof score !== 'undefined' && score > 0 && (
        <Text
          size="xl"
          style={{
            width: '90%',
            maxWidth: '600px',
            margin: '0 auto',
            textAlign: 'center',
            marginBottom: '3vh',
          }}
          c="dimmed"
        >
          {t('launcher.lastScore', { score })}
        </Text>
      )}
    </>
  );
};