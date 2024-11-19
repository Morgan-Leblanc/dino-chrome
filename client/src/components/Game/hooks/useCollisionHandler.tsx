interface CollisionHandlerProps {
    resetGame: () => void;
  }
  
  export const useCollisionHandler = ({ resetGame }: CollisionHandlerProps) => {
    const handleCollision = () => {
      const character = document.querySelector('[data-character]') as HTMLElement;
      if (character) {
        character.style.animation = 'collision 0.5s ease-in-out';
        character.addEventListener('animationend', () => {
          character.style.animation = '';
          resetGame();
        }, { once: true });
      }
    };
  
    return { handleCollision };
  };