import { Text } from '@mantine/core';

interface WelcomeSectionProps {
  username: string;
  score: number | undefined;
}

export const WelcomeSection: React.FC<WelcomeSectionProps> = ({ username, score }) => (
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
      Welcome, {username}!
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
        Last Score : {score}
      </Text>
    )}
  </>
);