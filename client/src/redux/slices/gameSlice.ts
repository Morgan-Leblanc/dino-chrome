import { createSlice } from '@reduxjs/toolkit';

interface GameState {
  score: number;
  isRunning: boolean;
}

const initialState: GameState = {
  score: 0,
  isRunning: false,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    startGame(state) {
      state.isRunning = true;
      state.score = 0;
    },
    endGame(state) {
      state.isRunning = false;
    },
    incrementScore(state) {
      state.score += 1;
    },
  },
});

export const { startGame, endGame, incrementScore } = gameSlice.actions;
export default gameSlice.reducer;
