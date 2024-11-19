export const GAME_CONFIG = {
    CHARACTER_SIZE: 120,
    CHARACTER_HITBOX_SIZE: 80,
    GAME_HEIGHT: window.innerHeight,
    GAME_WIDTH: window.innerWidth,
    JUMP_HEIGHT: 300,
    JUMP_DURATION: 600,
    JUMP_COOLDOWN: 500,
    GROUND_HEIGHT: 20,
    OBSTACLE_SPEED: 5,
    SPAWN_INTERVAL: 2000,
    OBSTACLE_SIZE: 120,
    OBSTACLE_HITBOX_SIZE: 60,
  } as const;
  
  export const BACKGROUND_CONFIG = {
    WIDTH: 1920,
    SCROLL_SPEED: 2,
  } as const;