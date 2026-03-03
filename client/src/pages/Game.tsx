import { useEffect } from 'react';
import GameBase from '../components/Game/GameBase';

const Game = () => {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <div style={{ overflow: 'hidden', height: '100vh', width: '100%' }}>
      <GameBase />
    </div>
  );
};

export default Game;