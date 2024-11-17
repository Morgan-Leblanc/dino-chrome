import { Button } from '@mantine/core';

interface StartGameButtonProps {
  disabled: boolean;
  onClick: () => void;
}

export const StartGameButton: React.FC<StartGameButtonProps> = ({ disabled, onClick }) => (
  <Button 
    color="green" 
    disabled={disabled} 
    onClick={onClick}
    size="xl"
    radius="md"
    style={{
      minWidth: 'min(250px, 80%)',
      padding: '2vh',
      height: 'auto',
      fontSize: 'clamp(1rem, 2vw, 1.2rem)',
      fontWeight: 600,
      transition: 'all 0.3s ease',
      background: !disabled 
        ? 'linear-gradient(45deg, #2ECC71, #27AE60)'
        : undefined,
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 5px 15px rgba(46, 204, 113, 0.4)',
      }
    }}
  >
    Start Game
  </Button>
);