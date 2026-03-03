import { Button, Group } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '../LanguageSwitcher/LanguageSwitcher';

interface HeaderButtonsProps {
  onLogout: () => void;
  onOpenScores: () => void;
  onOpenLeaderboard: () => void;
}

export const HeaderButtons: React.FC<HeaderButtonsProps> = ({ onLogout, onOpenScores, onOpenLeaderboard }) => {
  const { t } = useTranslation();
  return (
  <Group
    style={{
      position: 'absolute',
      top: '2vh',
      left: '2vh',
      right: '2vh',
      width: 'calc(100% - 4vh)',
      justifyContent: 'space-between',
    }}
  >
    <Group>
    <Button
      color="red"
      onClick={onLogout}
      style={{
        fontWeight: 600,
        padding: '1vh 2vh',
        height: 'auto',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          background: 'linear-gradient(45deg, #FF6B6B, #FF4949)',
        }
      }}
    >
      {t('launcher.logout')}
    </Button>
    <Button
      color="yellow"
      onClick={onOpenScores}
      style={{
        fontWeight: 600,
        padding: '1vh 2vh',
        height: 'auto',
        transition: 'transform 0.2s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
        }
      }}
    >
      {t('launcher.topScores')}
    </Button>
    <Button
      color="blue"
      onClick={onOpenLeaderboard}
      style={{
        fontWeight: 600,
        padding: '1vh 2vh',
        height: 'auto',
        transition: 'transform 0.2s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
        }
      }}
    >
      {t('launcher.leaderboard')}
    </Button>
    </Group>
    <LanguageSwitcher />
  </Group>
  );
};