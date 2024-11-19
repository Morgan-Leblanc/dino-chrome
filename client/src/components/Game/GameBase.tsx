import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectSelectedCharacter } from '../../redux/slices/userSlice';
import { scoreService } from '../services/scoreService';
import { selectUser } from '../../redux/slices/userSlice';

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

// Redux actions & selectors
import { 
  incrementScore, 
  setFinalScore, 
  collectScroll as collectScrollAction, 
  resetGame as resetGameAction,
  selectScore,
  selectFinalScore,
  selectScrollsCollected,
} from '../../redux/slices/gameSlice';

// Types
import { GameState } from './types';

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

import {INITIAL_STATE} from './config/constants'

const GameBase = () => {
  // States & Refs
  const [gameState, setGameState] = useState<GameState>(INITIAL_STATE);
  const gameRef = useRef<HTMLDivElement>(null);
  const isGameRunning = useRef(false);

  // Redux
  const dispatch = useDispatch();
  const selectedCharacter = useSelector(selectSelectedCharacter);
  const user = useSelector(selectUser);
  const score = useSelector(selectScore);
  const finalScore = useSelector(selectFinalScore);
  const scrollsCollected = useSelector(selectScrollsCollected);

  // Custom Hooks
  const { playMusic, stopMusic } = useGameMusic();
  const { resetBackground } = useBackground(gameRef);
  
  const { jump } = useJump({
    isRunning: gameState.isRunning,
    isJumping: gameState.isJumping,
    setGameState
  });

  const { collectScroll } = useScrollCollection({
    setGameState,
    onCollect: () => dispatch(collectScrollAction())
  });

  useObstacles({
    isRunning: gameState.isRunning,
    setGameState
  });

    // Game controls

    const startGame = () => {
      isGameRunning.current = true;
      playMusic();
      setGameState({
        ...INITIAL_STATE,
        isRunning: true,
      });
    };
    
    const resetGame = async () => {
      isGameRunning.current = false;
      stopMusic();
      resetBackground();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (finalScore > 0 && user.id) {
        try {
          await scoreService.saveScore(finalScore, user.id);
        } catch (error) {
          console.error('Score save failed:', error);
        }
      }
  
      dispatch(setFinalScore());
      dispatch(resetGameAction());
      setGameState(INITIAL_STATE);
    };
  

  // Collision handler
  const { handleCollision } = useCollisionHandler({ resetGame });

  // Game loop
  const { animationFrameRef } = useGameLoop({
    gameState,
    setGameState,
    gameRef,
    isGameRunning,
    onCollision: handleCollision,
    onScoreIncrement: () => dispatch(incrementScore()),
    onScrollCollect: collectScroll
  });



  // Render
  return (
    <GameBackground gameRef={gameRef}>
      <Score score={score} />
      <ScrollCounter scrollsCollected={scrollsCollected} />
      
      <Character 
        isJumping={gameState.isJumping}
        selectedCharacter={selectedCharacter as 'boy' | 'girl'}
        onJump={jump}
      />
      
      <Obstacles obstacles={gameState.obstacles} score={score} />
      
      {!gameState.isRunning && (
        <StartButton onStart={startGame} finalScore={finalScore} />
      )}
      
      {gameState.collectingScroll && (
        <CollectAnimation position={gameState.lastCollectedScrollPosition} />
      )}
    </GameBackground>
  );
};

export default GameBase;