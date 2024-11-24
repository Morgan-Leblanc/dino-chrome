import { Button, Group } from '@mantine/core';

interface HeaderButtonsProps {
  onLogout: () => void;
  onOpenScores: () => void;
  onOpenLeaderboard: () => void;
}

export const HeaderButtons: React.FC<HeaderButtonsProps> = ({ onLogout, onOpenScores, onOpenLeaderboard }) => (
  <Group 
    style={{ 
      position: 'absolute', 
      top: '2vh', 
      left: '2vh',
      right: '2vh',
      width: 'calc(100% - 4vh)',
      justifyContent: 'space-between'
    }}
  >
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
      Logout
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
      Top Scores
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
      Leaderboard
    </Button>
  </Group>
);