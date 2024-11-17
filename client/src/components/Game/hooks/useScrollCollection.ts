import { GameState, Obstacle } from '../types';
import { useCollisions } from './useCollisions';

interface UseScrollCollectionProps {
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  onCollect: () => void;
}

export const useScrollCollection = ({ setGameState, onCollect }: UseScrollCollectionProps) => {
  const { getHitbox, isColliding } = useCollisions();

  const collectScroll = (obstacle: Obstacle) => {
    const scrollElement = document.querySelector(`[data-scroll-id="${obstacle.id}"]`);
    if (!scrollElement) return;

    const scrollHitbox = getHitbox(scrollElement);
    const character = document.querySelector('[data-character]');
    if (!character) return;

    const characterHitbox = getHitbox(character);

    if (isColliding(characterHitbox, scrollHitbox)) {
      onCollect();
      setGameState(prev => ({
        ...prev,
        collectingScroll: true,
        lastCollectedScrollPosition: {
          x: scrollHitbox.left,
          y: scrollHitbox.top
        },
        obstacles: prev.obstacles.map(obs => 
          obs.id === obstacle.id ? { ...obs, hasScroll: false } : obs
        )
      }));

      setTimeout(() => {
        setGameState(prev => ({
          ...prev,
          collectingScroll: false,
          lastCollectedScrollPosition: null
        }));
      }, 1000);
    }
  };

  return { collectScroll };
};