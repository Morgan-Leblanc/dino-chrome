'use client'

import { useState, useEffect, useCallback } from 'react';
import { GameState } from '../types';
import { GAME_CONFIG } from '../config/gameConfig';

interface UseJumpProps {
  isRunning: boolean;
  isJumping: boolean;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
}

export const useJump = ({ isRunning, isJumping, setGameState }: UseJumpProps) => {
  const [canJump, setCanJump] = useState(true);

  const jump = useCallback(() => {
    if (!isRunning || isJumping || !canJump) return;
    
    setGameState(prev => ({
      ...prev,
      isJumping: true
    }));
    setCanJump(false);

    setTimeout(() => {
      setGameState(prev => ({
        ...prev,
        isJumping: false
      }));
    }, GAME_CONFIG.JUMP_DURATION);
  }, [isRunning, isJumping, canJump, setGameState]);

  useEffect(() => {
    if (!isJumping && !canJump) {
      const cooldownTimer = setTimeout(() => {
        setCanJump(true);
      }, GAME_CONFIG.JUMP_COOLDOWN);

      return () => clearTimeout(cooldownTimer);
    }
  }, [isJumping, canJump]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Space' && isRunning && canJump) {
        jump();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isRunning, canJump, jump]);

  return { jump, canJump };
};