interface CollisionHandlerProps {
  resetGame: () => void;
  onShake?: () => void;
}

export const useCollisionHandler = ({ resetGame, onShake }: CollisionHandlerProps) => {
  const handleCollision = () => {
    onShake?.();
    const character = document.querySelector('[data-character]') as HTMLElement;
    if (character) {
      character.style.animation = 'collision 0.5s ease-in-out';
      character.addEventListener('animationend', () => {
        character.style.animation = '';
        resetGame();
      }, { once: true });
    } else {
      resetGame();
    }
  };

  return { handleCollision };
};