import { useEffect } from 'react';
import { GameState, Obstacle } from '../types';
import { GAME_CONFIG } from '../config/gameConfig';

interface UseObstaclesProps {
  isRunning: boolean;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
}

export const useObstacles = ({ isRunning, setGameState }: UseObstaclesProps) => {
  useEffect(() => {
    if (!isRunning) return;

    const spawnObstacle = () => {
      const types: Obstacle['type'][] = ['hearth', 'time', 'cloud'];
      const randomType = types[Math.floor(Math.random() * types.length)];
      const hasScroll = Math.random() > 0.5;
      
      const newObstacle: Obstacle = {
        id: Date.now(),
        x: GAME_CONFIG.GAME_WIDTH,
        y: GAME_CONFIG.GROUND_HEIGHT,
        type: randomType,
        width: GAME_CONFIG.OBSTACLE_HITBOX_SIZE,
        height: GAME_CONFIG.OBSTACLE_HITBOX_SIZE,
        hasScroll,
      };

      setGameState((prev) => ({
        ...prev,
        obstacles: [...prev.obstacles, newObstacle],
      }));
    };

    const spawnInterval = setInterval(spawnObstacle, GAME_CONFIG.SPAWN_INTERVAL);
    return () => clearInterval(spawnInterval);
  }, [isRunning, setGameState]);
};