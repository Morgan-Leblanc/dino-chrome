import { useRef, useEffect } from 'react';
import { GameState } from '../types';
import { GAME_CONFIG } from '../config/gameConfig';
import { useCollisions } from './useCollisions';
import { useBackground } from './useBackground';

interface UseGameLoopProps {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  gameRef: React.RefObject<HTMLDivElement>;
  isGameRunning: { current: boolean };
  onCollision: () => void;
  onScoreIncrement: () => void;
  onScrollCollect: (obstacle: any) => void;
}

export const useGameLoop = ({
  gameState,
  setGameState,
  gameRef,
  isGameRunning,
  onCollision,
  onScoreIncrement,
  onScrollCollect
}: UseGameLoopProps) => {
  const animationFrameRef = useRef<number>();
  const gameStateRef = useRef(gameState);
  const { getHitbox, isColliding } = useCollisions();
  const { updateBackground } = useBackground(gameRef);

  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  const gameLoop = () => {
    if (!isGameRunning.current) return;

    updateBackground();

    const character = document.querySelector('[data-character]');
    if (!character) return;

    const characterHitbox = getHitbox(character);
    const currentObstacles = gameStateRef.current.obstacles;
    
    for (const obstacle of currentObstacles) {
      const obstacleElement = document.querySelector(`[data-obstacle-id="${obstacle.id}"]`);
      if (!obstacleElement) continue;

      const obstacleHitbox = getHitbox(obstacleElement);
      if (isColliding(characterHitbox, obstacleHitbox)) {
        onCollision();
        return;
      }

      if (obstacle.hasScroll) {
        onScrollCollect(obstacle);
      }
    }

    setGameState(prev => ({
      ...prev,
      obstacles: prev.obstacles
        .map(obstacle => ({
          ...obstacle,
          x: obstacle.x - GAME_CONFIG.OBSTACLE_SPEED,
        }))
        .filter(obstacle => obstacle.x > -GAME_CONFIG.OBSTACLE_SIZE),
    }));

    onScoreIncrement();
    animationFrameRef.current = requestAnimationFrame(gameLoop);
  };

  useEffect(() => {
    if (gameState.isRunning) {
      isGameRunning.current = true;
      animationFrameRef.current = requestAnimationFrame(gameLoop);
    }

    return () => {
      isGameRunning.current = false;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [gameState.isRunning]);

  return { animationFrameRef };
};