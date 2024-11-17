import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectSelectedCharacter } from '../../redux/slices/userSlice';

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
import { useJump } from './hooks/useJump';
import { useGameLoop } from './hooks/useGameLoop';
import { useGameMusic } from './hooks/useGameMusic';
import { useBackground } from './hooks/useBackground';
import { useObstacles } from './hooks/useObstacles';
import { useScrollCollection } from './hooks/useScrollCollection';

// API
import { useScoreSubmission } from './hooks/useScoreSubmission';


const INITIAL_STATE: GameState = {
  isRunning: false,
  isJumping: false,
  obstacles: [],
  collectingScroll: false,
  lastCollectedScrollPosition: null,
};

const GameBase = () => {
  // States & Refs
  const [gameState, setGameState] = useState<GameState>(INITIAL_STATE);
  const gameRef = useRef<HTMLDivElement>(null);
  const isGameRunning = useRef(false);

  // Redux
  const dispatch = useDispatch();
  const selectedCharacter = useSelector(selectSelectedCharacter);
  const score = useSelector(selectScore);
  const finalScore = useSelector(selectFinalScore);
  const scrollsCollected = useSelector(selectScrollsCollected);
  

  // API
  const { submitScore } = useScoreSubmission();


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

  // Collision handler
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

  // Game controls
  const resetGame = async () => {
    isGameRunning.current = false;
    stopMusic();
    resetBackground();
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    
    // Sauvegarder le score avant de reset
    try {
      await submitScore(finalScore);
    } catch (error) {
      // Gérer l'erreur si nécessaire
      console.error('Failed to save score:', error);
    }

    dispatch(setFinalScore());
    dispatch(resetGameAction());
    setGameState(INITIAL_STATE);
  };

  const startGame = () => {
    isGameRunning.current = true;
    playMusic();
    setGameState({
      ...INITIAL_STATE,
      isRunning: true,
    });
  };

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