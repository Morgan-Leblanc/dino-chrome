import { Box } from '@mantine/core';
import { GAME_CONFIG } from '../config/gameConfig';
import { ASSETS } from '../config/assets';

interface CharacterProps {
  isJumping: boolean;
  selectedCharacter: 'boy' | 'girl';
  onJump: () => void;
  canJump: boolean;
}

export const Character = ({ isJumping, selectedCharacter, onJump, canJump }: CharacterProps) => {
  const handleJump = () => {
    if (canJump) {
      onJump();
    }
  };

  return (
    <Box
      data-character
      onClick={handleJump}
      onKeyDown={(e) => {
        if (e.code === 'Space') handleJump();
      }}
      tabIndex={0}
      aria-label={`${selectedCharacter} character`}
      aria-pressed={isJumping}
      style={{
        width: GAME_CONFIG.CHARACTER_SIZE,
        height: GAME_CONFIG.CHARACTER_SIZE,
        position: 'absolute',
        bottom: GAME_CONFIG.GROUND_HEIGHT,
        left: GAME_CONFIG.GAME_WIDTH / 3,
        backgroundImage: `url(${ASSETS.characters[selectedCharacter]})`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        transform: isJumping ? `translateY(-${GAME_CONFIG.JUMP_HEIGHT}px)` : 'translateY(0)',
        transition: 'transform 600ms cubic-bezier(0.4, 0, 0.2, 1)',
        zIndex: 2,
        cursor: canJump ? 'pointer' : 'not-allowed',
        userSelect: 'none',
        outline: 'none',
      }}
    >
    </Box>
  );
};