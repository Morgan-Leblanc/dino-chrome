import { useEffect, useRef } from 'react';
import { GameState, Obstacle } from '../types';
import { GAME_CONFIG } from '../config/gameConfig';

interface UseObstaclesProps {
  isRunning: boolean;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
}

export const useObstacles = ({ isRunning, setGameState }: UseObstaclesProps) => {
  const speedMultiplierRef = useRef(1);

  useEffect(() => {
    if (!isRunning) {
      speedMultiplierRef.current = 1;
      return;
    }

    const increaseSpeed = () => {
      if (speedMultiplierRef.current < GAME_CONFIG.MAX_SPEED_MULTIPLIER) {
        const newMultiplier = speedMultiplierRef.current * GAME_CONFIG.SPEED_MULTIPLIER;
        speedMultiplierRef.current = Math.min(newMultiplier, GAME_CONFIG.MAX_SPEED_MULTIPLIER);
        
        setGameState(prev => ({
          ...prev,
          obstacles: prev.obstacles.map(obstacle => ({
            ...obstacle,
            speed: GAME_CONFIG.INITIAL_OBSTACLE_SPEED * speedMultiplierRef.current
          }))
        }));
      }
    };

    const speedIncreaseInterval = setInterval(
      increaseSpeed,
      GAME_CONFIG.SPEED_INCREASE_INTERVAL
    );

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
        speed: GAME_CONFIG.INITIAL_OBSTACLE_SPEED * speedMultiplierRef.current
      };

      setGameState((prev) => ({
        ...prev,
        obstacles: [...prev.obstacles, newObstacle],
      }));
    };

    const spawnInterval = setInterval(
      spawnObstacle, 
      GAME_CONFIG.SPAWN_INTERVAL / Math.sqrt(speedMultiplierRef.current)
    );

    return () => {
      clearInterval(spawnInterval);
      clearInterval(speedIncreaseInterval);
    };
  }, [isRunning, setGameState]);
};