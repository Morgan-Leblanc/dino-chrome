import { GameState } from "../types";

export const INITIAL_STATE: GameState = {
  isRunning: false,
  isJumping: false,
  obstacles: [],
  collectingScroll: false,
  lastCollectedScrollPosition: null,
};