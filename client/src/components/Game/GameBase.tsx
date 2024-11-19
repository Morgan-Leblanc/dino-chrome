import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Components
import {
  Score,
  ScrollCounter,
  Character,
  Obstacles,
  StartButton,
  CollectAnimation,
  GameBackground
} from './components';

// Redux
import { 
  incrementScore, 
  collectScroll, 
  selectScore,
  selectFinalScore,
  selectScrollsCollected,
  startGame,
  endGame,
} from '../../redux/slices/gameSlice';
import { selectSelectedCharacter, selectUser } from '../../redux/slices/userSlice';

// Custom hooks
import { 
  useJump,
  useGameLoop,
  useGameMusic,
  useBackground,
  useObstacles,
  useScrollCollection,
  useCollisionHandler
} from './hooks';

import { INITIAL_STATE } from './config/constants';
import { GameState } from './types';
import { scoreService } from 'components/services/scoreService';

const GameBase = () => {
  const [gameState, setGameState] = useState<GameState>(INITIAL_STATE);
  const gameRef = useRef<HTMLDivElement>(null);
  const isGameRunning = useRef(gameState.isRunning);

  // Redux selectors
  const dispatch = useDispatch();
  const character = useSelector(selectSelectedCharacter);
  const user = useSelector(selectUser);
  const score = useSelector(selectScore);
  const finalScore = useSelector(selectFinalScore);
  const scrollsCollected = useSelector(selectScrollsCollected);

  useEffect(() => {
    const saveScore = async () => {
      if (!gameState.isRunning && score > 0 && user?.id) {
        try {
          await scoreService.saveScore(score, user.id);
          console.log('Score saved:', score);
        } catch (error) {
          console.error('Failed to save score:', error);
        }
      }
    };

    saveScore();
  }, [gameState.isRunning, score, user?.id]);

  // Game controls & hooks
  const { playMusic, stopMusic } = useGameMusic();
  const { resetBackground } = useBackground(gameRef);
  const { jump } = useJump({ isRunning: gameState.isRunning, isJumping: gameState.isJumping, setGameState });
  const { collectScroll: handleCollectScroll } = useScrollCollection({
    setGameState,
    onCollect: () => dispatch(collectScroll())
  });

  useObstacles({ isRunning: gameState.isRunning, setGameState });

  // Game actions
  const startGameHandler = () => {
    dispatch(startGame());
    playMusic();
    setGameState({ ...INITIAL_STATE, isRunning: true });
  };

  const gameOverHandler = () => {
    stopMusic();
    resetBackground();
    
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    dispatch(endGame());
    setGameState(INITIAL_STATE);
  };

  // Game loop setup
  const { handleCollision } = useCollisionHandler({resetGame: gameOverHandler});

  const { animationFrameRef } = useGameLoop({
    gameState,
    setGameState,
    gameRef,
    isGameRunning,
    onCollision: handleCollision,
    onScoreIncrement: () => dispatch(incrementScore()),
    onScrollCollect: handleCollectScroll
  });

  return (
    <GameBackground gameRef={gameRef}>
      <Score score={score} />
      <ScrollCounter scrollsCollected={scrollsCollected} />
      
      <Character 
        isJumping={gameState.isJumping}
        selectedCharacter={character as 'boy' | 'girl'}
        onJump={jump}
      />
      
      <Obstacles obstacles={gameState.obstacles} score={score} />
      
      {!gameState.isRunning && (
        <StartButton onStart={startGameHandler} finalScore={finalScore} />
      )}
      
      {gameState.collectingScroll && (
        <CollectAnimation position={gameState.lastCollectedScrollPosition} />
      )}
    </GameBackground>
  );
};

export default GameBase;