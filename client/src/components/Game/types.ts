export interface Obstacle {
    id: number;
    x: number;
    y: number;  
    type: 'hearth' | 'time' | 'cloud';
    width: number;
    height: number;
    hasScroll: boolean;
    speed: number;
  }
  
  export interface Hitbox {
    left: number;
    right: number;
    top: number;
    bottom: number;
  }
  
  export interface Quote {
    text: string;
    author: string;
  }
  
  export interface GameState {
    isRunning: boolean;
    isJumping: boolean;
    obstacles: Obstacle[];
    collectingScroll: boolean;
    lastCollectedScrollPosition: { x: number; y: number } | null;
  }