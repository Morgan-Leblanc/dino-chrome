import { Hitbox } from '../types';

export const useCollisions = () => {
  const getHitbox = (element: Element): Hitbox => {
    const rect = element.getBoundingClientRect();
    return {
      left: rect.left,
      right: rect.right,
      top: rect.top,
      bottom: rect.bottom,
    };
  };

  const isColliding = (box1: Hitbox, box2: Hitbox): boolean => {
    return (
      box1.right > box2.left &&
      box1.left < box2.right &&
      box1.bottom > box2.top &&
      box1.top < box2.bottom
    );
  };

  return { getHitbox, isColliding };
};