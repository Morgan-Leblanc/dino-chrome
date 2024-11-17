import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface GameState {
  score: number;
  finalScore: number;
  scrollsCollected: number;
  isGameStarted: boolean;
}

const initialState: GameState = {
  score: 0,
  finalScore: 0,
  scrollsCollected: 0,
  isGameStarted: false,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    startGame: (state) => {
      state.isGameStarted = true;
      state.score = 0;
      state.scrollsCollected = 0;
    },
    incrementScore: (state) => {
      state.score += 1;
    },
    setFinalScore: (state) => {
      state.finalScore = state.score;
      state.score = 0;
    },
    collectScroll: (state) => {
      state.scrollsCollected += 1;
    },
    resetGame: (state) => {
      state.score = 0;
      state.scrollsCollected = 0;
      state.isGameStarted = false;
    },
  },
});

export const { 
  startGame,
  incrementScore, 
  setFinalScore, 
  collectScroll, 
  resetGame 
} = gameSlice.actions;

// Selectors
export const selectScore = (state: RootState) => state.game.score;
export const selectFinalScore = (state: RootState) => state.game.finalScore;
export const selectScrollsCollected = (state: RootState) => state.game.scrollsCollected;
export const selectIsGameStarted = (state: RootState) => state.game.isGameStarted;

export default gameSlice.reducer;