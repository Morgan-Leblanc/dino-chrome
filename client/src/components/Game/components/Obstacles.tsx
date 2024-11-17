import { Box } from '@mantine/core';
import { Obstacle } from '../types';
import { GAME_CONFIG } from '../config/gameConfig';
import { ASSETS } from '../config/assets';

interface ObstaclesProps {
  obstacles: Obstacle[];
  score: number
}

export const Obstacles = ({ obstacles }: ObstaclesProps) => (
  
  <>
    {obstacles.map((obstacle) => (
      <Box key={obstacle.id}>
        <Box
          data-obstacle-id={obstacle.id}
          style={{
            width: GAME_CONFIG.OBSTACLE_SIZE,
            height: GAME_CONFIG.OBSTACLE_SIZE,
            position: 'absolute',
            bottom: obstacle.y,
            left: obstacle.x - (GAME_CONFIG.OBSTACLE_SIZE - GAME_CONFIG.OBSTACLE_HITBOX_SIZE) / 2,
            backgroundImage: `url(${ASSETS.obstacles[obstacle.type]})`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            zIndex: 1,
            imageRendering: 'pixelated',
          }}
        />
        {obstacle.hasScroll && (
          <Box
            data-scroll-id={obstacle.id}
            style={{
              width: 130,
              height: 130,
              position: 'absolute',
              bottom: obstacle.y + GAME_CONFIG.OBSTACLE_SIZE + 80,
              left: obstacle.x + (GAME_CONFIG.OBSTACLE_SIZE / 2) - 90,
              backgroundImage: `url(${ASSETS.items.scroll})`,
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              zIndex: 1,
              imageRendering: 'pixelated',
            }}
          />
        )}
      </Box>
    ))}
  </>
);