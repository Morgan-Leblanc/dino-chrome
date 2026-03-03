import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Box, Text } from '@mantine/core';

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
  useCollisionHandler,
  useCollectSound,
} from './hooks';

import { INITIAL_STATE } from './config/constants';
import { GameState } from './types';
import { scoreService } from '../../services/scoreService';

const SHAKE_DURATION_MS = 280;
const HINT_STORAGE_KEY = 'dino-game-hint-seen';
const HINT_AUTO_DISMISS_MS = 3000;

const GameBase = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [gameState, setGameState] = useState<GameState>(INITIAL_STATE);
  const [isShaking, setIsShaking] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const gameRef = useRef<HTMLDivElement>(null);
  const isGameRunning = useRef(gameState.isRunning);
  const playCollectSound = useCollectSound();

  useEffect(() => {
    const m = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(m.matches);
    const onChange = () => setReduceMotion(m.matches);
    m.addEventListener('change', onChange);
    return () => m.removeEventListener('change', onChange);
  }, []);

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
          await scoreService.saveScore(score);
          console.log('Score saved:', score);
        } catch (error) {
          console.error('Failed to save score:', error);
        }
      }
    };

    saveScore();
  }, [gameState.isRunning, score, user?.id]);

  useEffect(() => {
    if (!isShaking) return;
    const id = setTimeout(() => setIsShaking(false), SHAKE_DURATION_MS);
    return () => clearTimeout(id);
  }, [isShaking]);

  const dismissHint = useCallback(() => {
    setShowHint(false);
    try {
      localStorage.setItem(HINT_STORAGE_KEY, '1');
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    if (!showHint || !gameState.isRunning) return;
    const id = setTimeout(dismissHint, HINT_AUTO_DISMISS_MS);
    return () => clearTimeout(id);
  }, [showHint, gameState.isRunning, dismissHint]);

  // Game controls & hooks
  const { playMusic, stopMusic } = useGameMusic();
  const { resetBackground } = useBackground(gameRef);
  const { jump, canJump } = useJump({ isRunning: gameState.isRunning, isJumping: gameState.isJumping, setGameState });

  const jumpWithHintDismiss = useCallback(() => {
    dismissHint();
    jump();
  }, [dismissHint, jump]);

  const { collectScroll: handleCollectScroll } = useScrollCollection({
    setGameState,
    onCollect: () => {
      playCollectSound();
      dispatch(collectScroll());
    },
  });

  useObstacles({ isRunning: gameState.isRunning, setGameState });

  // Game actions
  const startGameHandler = () => {
    dispatch(startGame());
    playMusic();
    setGameState({ ...INITIAL_STATE, isRunning: true });
    if (!localStorage.getItem(HINT_STORAGE_KEY)) setShowHint(true);
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

  const triggerShake = useCallback(() => {
    if (!reduceMotion) setIsShaking(true);
  }, [reduceMotion]);
  const { handleCollision } = useCollisionHandler({
    resetGame: gameOverHandler,
    onShake: triggerShake,
  });

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
    <GameBackground gameRef={gameRef} shake={isShaking}>
      <Score score={score} />
      <ScrollCounter scrollsCollected={scrollsCollected} />
      
      <Character 
        isJumping={gameState.isJumping}
        selectedCharacter={character as 'boy' | 'girl'}
        onJump={jumpWithHintDismiss}
        canJump={canJump}
      />
      
      <Obstacles obstacles={gameState.obstacles} score={score} />
      
      {!gameState.isRunning && (
        <StartButton
          onStart={startGameHandler}
          onBackToMenu={() => navigate('/launcher')}
          finalScore={finalScore}
        />
      )}
      
      {gameState.collectingScroll && (
        <CollectAnimation position={gameState.lastCollectedScrollPosition} />
      )}

      {gameState.isRunning && showHint && (
        <Box
          style={{
            position: 'absolute',
            bottom: '22%',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 15,
            padding: '0.5rem 1rem',
            backgroundColor: 'rgba(0,0,0,0.6)',
            borderRadius: 8,
          }}
        >
          <Text size="sm" c="white" ta="center">
            {t('game.hintJump')}
          </Text>
        </Box>
      )}
    </GameBackground>
  );
};

export default GameBase;