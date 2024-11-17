import { useEffect } from 'react';
import { GameState } from '../types';
import { GAME_CONFIG } from '../config/gameConfig';

interface UseJumpProps {
  isRunning: boolean;
  isJumping: boolean;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
}

export const useJump = ({ isRunning, isJumping, setGameState }: UseJumpProps) => {
  const jump = () => {
    if (!isRunning || isJumping) return;
    
    setGameState(prev => ({
      ...prev,
      isJumping: true
    }));

    setTimeout(() => {
      setGameState(prev => ({
        ...prev,
        isJumping: false
      }));
    }, GAME_CONFIG.JUMP_DURATION);
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === 'Space' && isRunning && !isJumping) {
        jump();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isRunning, isJumping]);

  return { jump };
};